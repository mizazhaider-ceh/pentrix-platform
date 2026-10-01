# My bug bounty recon workflow, start to finish

Everyone wants the exploit. Nobody wants the recon. That is exactly why recon is where the money is: most hunters do twenty minutes of subdomain enumeration, get bored, and go spray the same XSS payloads at the main app that fifty other people already sprayed.

My recon is methodical to the point of being boring. Here it is, the full pipeline, with the actual commands. Steal it.

## Stage 0: Scope first, always

Before a single packet leaves my machine, I read the scope. Twice. In scope, out of scope, the rules about automated scanning, the rules about social engineering. I have seen hunters burn accounts because they scanned a subdomain that looked in scope but was explicitly excluded three lines down.

I keep a `scope.txt` file per target:

```
# target: example.com (anonymized)
# in scope: *.example.com
# out of scope: static.example.com, status.example.com
# notes: no automated vuln scanning on the main app, rate limit respected
```

Boring? Yes. The number of times this file has saved me from testing something excluded? More than zero, which is all it takes.

## Stage 1: Subdomain enumeration

Goal: find every hostname the target owns, especially the ones they forgot about. Forgotten hosts are where the bugs live. The main app gets tested by everyone. The Jenkins instance on `ci-legacy.example.com` gets tested by nobody.

```bash
# passive enumeration, the polite kind
subfinder -d example.com -silent -o subs.txt

# certificate transparency, catches what subfinder misses
curl -s "https://crt.sh/?q=%25.example.com&output=json" \
  | jq -r '.[].name_value' | sort -u >> subs.txt

# clean up: dedupe, strip wildcards and whitespace
sed 's/^\*\.//' subs.txt | tr -d ' ' | grep -v '^$' | sort -u -o subs.txt
wc -l subs.txt
```

What I am looking for at this stage: sheer volume is fine, but I mentally flag anything with `dev`, `staging`, `test`, `legacy`, `old`, `internal`, `api`, `admin`, or a version number in the name. Those are the hosts most likely to be misconfigured. I also flag anything that looks auto-generated (cloud provider hostnames, `ip-10-0-1-23`), because those often belong to infrastructure nobody inventories.

## Stage 2: Find what is alive and fingerprint it

Goal: turn a list of hostnames into a list of actual web services with technology stacks. A dead subdomain is noise. A live one running a 2019 WordPress is a lead.

```bash
cat subs.txt | httpx -silent -title -status-code -tech-detect \
  -json -o alive.json
cat alive.json | jq -r 'select(.status_code != 404) | .url' > alive.txt
```

I keep the JSON because I mine it later. Specifically, I diff the technology stacks across hosts:

```bash
# which tech stacks appear, and where
cat alive.json | jq -r '[.url, (.tech // [] | join(","))] | @tsv' | sort | uniq -c | sort -rn | head -30
```

What I am looking for: outliers. If 80 hosts run the corporate CMS and one runs an old Apache with `X-Powered-By: PHP/7.2`, that one host just became my afternoon. Outliers are misconfigurations wearing a name tag.

I also extract every unique response header name across all hosts. Custom headers are where developers confess things (I once turned a weird one into 500 euros, there is a whole post about it). Anything that is not `server`, `date`, `content-type`, or standard CDN headers gets investigated.

## Stage 3: Ports (nmap goes brrr)

Goal: find the services that are not HTTP. Everyone checks port 443. Almost nobody checks whether the forgotten subdomain also has SSH, FTP, or a database port hanging open to the internet.

```bash
# fast pass over common ports for all live hosts
nmap -sV -sC -T4 --top-ports 1000 -iL alive-hosts.txt -oN nmap-common.txt

# for the interesting hosts: full port sweep, fast
nmap -sS -T4 -p- --min-rate 5000 target.example.com -oN nmap-full.txt
```

Two notes. First, respect the program rules: some programs forbid full port sweeps or aggressive timing. Read stage 0. Second, `-sC` (default scripts) is doing real work here. It grabs banners, and banners are version numbers, and version numbers are CVEs.

What I am looking for: anything that is not 80/443. An open 8080 with a Tomcat manager, a 9200 with Elasticsearch, a 27017 with MongoDB, an 11211 with memcached. These are the findings that make triage analysts sit up, because they are usually trivially verifiable and obviously bad.

## Stage 4: URLs, parameters, and JavaScript

Goal: find the attack surface that does not appear in the navigation menu. Old endpoints, hidden parameters, API routes, and secrets in JavaScript bundles.

```bash
# historical URLs from the Wayback Machine and Common Crawl
cat alive.txt | gau --threads 5 > urls.txt
cat alive.txt | waybackurls >> urls.txt
sort -u urls.txt -o urls.txt
wc -l urls.txt

# pull out just the JS files
grep -E '\.js(\?|$)' urls.txt | sort -u > js.txt
```

Then I download the interesting JS files and go secret hunting:

```bash
mkdir -p js && cd js
cat ../js.txt | head -50 | xargs -I{} sh -c 'curl -s "{}" -o "$(echo {} | md5sum | cut -d" " -f1).js"'

# the classics: keys, tokens, endpoints
grep -rniE 'api[_-]?key|secret|token|password|aws_|BEGIN (RSA )?PRIVATE KEY' . \
  | grep -viE 'test|example|dummy|placeholder' | head -40
```

The `grep -viE 'test|example|dummy'` part matters. JS files are full of fake placeholder secrets in comments and sample configs. Filtering those out is the difference between finding a real Stripe key and crying wolf forty times.

What I am looking for in JS specifically:

- **API endpoints** that are not linked anywhere in the UI. `fetch("/api/v2/admin/export")` in a bundle is a lead even if the button that calls it is hidden.
- **Hardcoded credentials and keys.** Still happens. Constantly.
- **Verbose error handling** that reveals backend structure.
- **Source maps** (`app.js.map`). If the site ships source maps, you just got the original source code. Always check.

I also extract parameters from the URL list, because parameters are where injection bugs live:

```bash
# unique parameter names across all historical URLs
grep -oP '\?\K[^#\s]+' urls.txt | tr '&' '\n' | cut -d= -f1 | sort -u > params.txt
```

A parameter called `redirect`, `url`, `file`, `path`, or `id` appearing on an old endpoint is a to-do list, not a data file.

## Stage 5: Content discovery

Goal: find the paths that exist but are not linked. Admin panels, backups, config files, old uploads.

```bash
ffuf -u https://target.example.com/FUZZ \
  -w /usr/share/wordlists/dirb/common.txt \
  -mc 200,301,302,401,403 -fc 404 \
  -o ffuf.json -of json
```

I tune the wordlist to the tech stack from stage 2. PHP stack? Add PHP-specific lists (backup extensions like `.bak`, `.old`, `.swp`). Java? Different lists. Blindly running the biggest wordlist on every target is how you spend six hours learning that a site returns 200 for everything.

What I am looking for: 401s and 403s are interesting, not just 200s. A 403 on `/admin` means `/admin` exists. A 403 is the application telling you "there is something here, but not for you", which is an invitation to find out how it decides who "you" are.

I also always probe a short list of high-value files directly:

```
/server-status, /.git/HEAD, /.env, /actuator/health,
/api/docs, /swagger.json, /.well-known/security.txt
```

One `/.git/HEAD` returning 200 has ended more than one recon session early, in the best way.

## Stage 6: Light vulnerability scanning

Goal: let automation check the boring known stuff while I think about the interesting unknown stuff.

```bash
nuclei -l alive.txt -severity low,medium,high,critical \
  -exclude-tags dos,fuzz -o nuclei.txt
```

I exclude DoS and heavy fuzzing tags on principle: I do not want to be the reason someone's staging database falls over. Nuclei is a net, not a spear. It catches exposed panels, default credentials, and known CVEs on the versions I fingerprinted in stage 2. Everything it finds still gets manually verified, because scanners lie about as often as they tell the truth.

## What I am actually looking for (the mental model)

If the stages above feel like a lot of commands, here is the one-sentence version: **at every stage, I am looking for the thing that does not belong.**

- A subdomain whose tech stack differs from the other 89.
- A header that only appears on one host.
- A port that has no business being open.
- A JS file with a key in it.
- A parameter name that suggests file access.
- A 403 where everything else is a 404.

Recon is anomaly detection. The methodology is just a machine for producing anomalies efficiently, and then your brain does the part no scanner can: asking "wait, why does THAT exist?"

That question, asked forty times across a wide scope, is how a weird response header becomes 500 euros. The pipeline finds the weirdness. You just have to show up and notice it.

## My actual checklist (copy this)

```
[ ] scope.txt written and re-read
[ ] subfinder + crt.sh, deduped
[ ] httpx alive + tech-detect, JSON saved
[ ] header names diffed across hosts
[ ] nmap common ports, full sweep on interesting hosts
[ ] gau + waybackurls, JS extracted
[ ] JS secrets grepped, placeholders filtered
[ ] params extracted from historical URLs
[ ] ffuf content discovery, tech-appropriate wordlist
[ ] high-value files probed (/.git/HEAD, /.env, ...)
[ ] nuclei light scan, findings manually verified
[ ] anomaly list: the 5 weirdest things found, investigated one by one
```

Run it the same way every time. Boring wins.
