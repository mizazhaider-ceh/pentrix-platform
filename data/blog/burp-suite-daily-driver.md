# Burp Suite: the 10 things I actually use every day

Everyone's first Burp tutorial shows you the same thing: turn on intercept, change a parameter, forward the request, wow. Then you close Burp for three months because you have no idea what to do with it next. I know, because that was me.

Burp is not a tool you learn from a tutorial. It is a tool you learn from living in it. After a couple of years of daily use, across CTFs, my home lab, and real bug bounty targets as MIHX01, my actual usage has converged on about ten features. Everything else in Burp I touch maybe once a month. These ten I touch every session.

Here they are, in rough order of how often my fingers reach for them.

## 1. Intercept (mostly turned off)

Controversial first pick, I know. Here is the thing: beginners leave intercept on and then hate Burp, because every click becomes a chore of forwarding requests. Intercept is a scalpel, not a lifestyle.

My default state is **intercept off**, proxying everything passively so history fills up while I browse normally. I turn intercept on only for specific moments: catching a request I want to modify before it sends, or freezing a multi-step flow to tamper with a middle step. The keyboard shortcut (Ctrl+T for the proxy, then flipping the toggle) should be muscle memory.

Learn this rhythm: browse freely, then intercept surgically. Your patience will thank you.

## 2. Target scope (set it before you do anything)

First thing on any engagement: define the scope. Right-click the host in the site map, "Add to scope", then turn on "Show only in-scope items" in the proxy history filter. This does two things: it keeps your history readable instead of a swamp of CDN and analytics requests, and it keeps you legal. Out-of-scope requests in your history are a liability; do not generate them.

I also set scope early because it disciplines my thinking. Every request I send should be to something I am allowed to touch. The scope filter is a constant visual reminder of the boundary.

## 3. Repeater (my second home)

Ctrl+R sends any request to Repeater, and I do this dozens of times per session. Repeater is where hypotheses get tested: change the ID, remove the parameter, swap the method, resend, compare.

Two habits that multiplied my Repeater effectiveness:

- **Name your tabs.** Right-click a Repeater tab and rename it: "IDOR test", "admin as user", "price tamper". After twenty tabs, unnamed tabs are archaeological layers. Named tabs are an investigation.
- **Group related tabs.** Repeater tabs can be grouped. One group per endpoint or per bug hypothesis. Future you, reviewing at midnight, will be grateful.

Repeater is also where I do the per-endpoint checks from my report-study checklist: modify the object reference, diff the response, move on. Fast, methodical, repeatable.

## 4. Intruder, Sniper mode (with honesty about Community)

Intruder's Sniper attack (one payload position, iterate a list) is my workhorse for fuzzing: usernames, IDs, parameter values. Mark the position with §, load a wordlist, start the attack, sort by response length or status.

Honest caveat: Burp Community throttles Intruder to keep you from going fast, which makes large attacks painful. For small, targeted attacks (a few hundred requests), it is fine. For big fuzzing jobs, I drop to the terminal with ffuf:

```bash
ffuf -u https://target/FUZZ -w /usr/share/wordlists/dirb/common.txt -mc 200
```

No shame in that. The right tool for the job beats brand loyalty. But for surgical, small-scale iteration where I want to watch each response, Intruder Sniper stays open all day.

## 5. Proxy history filters (the swamp drainer)

An unfiltered proxy history on a modern web app is thousands of requests: images, fonts, analytics, chunked JS. The filter bar is how you see the signal. My standard filter: hide CSS, images, and general binary content; show only in-scope; then filter by MIME type HTML or by a URL keyword when I am hunting a specific feature.

Learn to love the "filter by search term" box. Hunting an API? Filter for `/api`. Looking at auth flows? Filter for `login`, `token`, `session`. Ten seconds of filtering saves ten minutes of scrolling.

## 6. Comparer (diff everything)

Select two requests or responses, right-click, "Send to Comparer", then "Compare words". This is how I verify IDOR (my data vs. your data, side by side), how I check whether a parameter actually changed the response, and how I spot subtle differences in error messages that reveal backend behavior.

Beginners eyeball responses. Hunters diff them. The difference between "looks the same" and "is the same" has contained real findings. Comparer makes the invisible visible, and it takes five seconds.

## 7. Decoder (the unglamorous essential)

Decoder does encoding and decoding, hashing, and smart decoding of mixed content. I use it constantly for: URL-decoding tokens to read them, Base64-decoding blobs in responses to see what is inside, and encoding my payloads correctly (XSS payloads die from bad encoding more often than from filters).

The killer feature is "Decode as" smart guessing: paste an unknown blob, let Burp guess the encoding stack. Tokens and serialized objects surrender their secrets fast. Whenever a response contains a long opaque string, it goes to Decoder before I do anything else. Curiosity, automated.

## 8. Match and Replace (the autopilot)

Proxy settings, Match and Replace rules: automatic find-and-replace on requests and responses in flight. My permanent rules:

- Strip or normalize headers I do not want sent (some labs and targets behave differently).
- Auto-add a custom header identifying my testing (some programs ask for this; check the program policy).
- Replace a value across every request while testing a hypothesis, instead of editing each one in Repeater.

This is also how I handle annoying anti-CSRF or session quirks during long Repeater sessions. Set the rule once, stop thinking about it. Automation of the boring parts is what keeps your brain free for the interesting parts.

## 9. Collaborator (for everything out-of-band)

Burp Collaborator gives you a unique external domain that logs every DNS lookup and HTTP hit it receives. This is how you detect blind vulnerabilities: SSRF (does the server fetch my Collaborator URL?), blind XSS (does the payload fire from someone's browser later?), XXE with out-of-band exfiltration.

Workflow: generate a Collaborator payload, inject it into every plausible parameter, then poll the Collaborator client. Hits mean the server reached out to you, which means you control a server-side request path. Even on targets where nothing hits, the *discipline* of testing every parameter for out-of-band interaction is what catches the one that does.

In the lab, practice this against Juice Shop or DVWA until the loop is boring. On real targets, it is one of the highest-signal tests you can run.

## 10. Extensions (two that earn their keep)

Burp's extension ecosystem is huge and mostly noise. Two I actually keep installed:

- **Param Miner.** Finds hidden parameters by guessing (it is from the PortSwigger research team, so it is quality). Hidden parameters are a shockingly common source of findings: debug flags, internal toggles, legacy options the developers forgot. Run it against interesting endpoints and review what it surfaces.
- **A JSON Web Token helper** (there are several; pick a maintained one). If the target uses JWTs, you will decode, inspect, and tamper with them constantly, and doing it by hand in Decoder gets old. The extension shows you the header, payload, and signature at a glance and makes "what if I change the algorithm to none" a two-click experiment.

Install extensions from the official BApp Store only. Random JARs from the internet inside your main hacking tool is exactly as bad an idea as it sounds.

## My Burp setup (the boring config that saves hours)

A few settings I configure once and never think about again. Project options, upstream proxy: if you use a VPN or a specific egress for testing, set it here so all Burp traffic goes through the right path. Display: dark theme, obviously, and bump the font size one notch; you will stare at this for hours, make it comfortable.

Hotkeys worth memorizing: Ctrl+R (send to Repeater), Ctrl+I (send to Intruder), Ctrl+U (send to Decoder, from the right-click menu it is a shortcut away), and Ctrl+F for finding inside responses. The difference between a fast hunter and a slow one is often just how rarely their hand leaves the keyboard.

One more: in Repeater's settings, turn on "update Content-Length automatically". Forgetting to fix the content length after editing a POST body is a classic beginner self-own, and the setting deletes the entire failure mode. Let the tool handle the plumbing; you handle the thinking.

## The meta-lesson

Notice what is *not* on this list: the Scanner (I use Community, so no active scanner, and honestly the manual skills matter more anyway), exotic Intruder attack types, engagement tools I run twice a year. Ten features, deep fluency, daily use.

Burp rewards depth over breadth. Pick these ten, use them until the shortcuts are in your fingers, and you will be faster than someone who has clicked every menu once. The tool does not find bugs. You find bugs, with the tool as an extension of your hands. Train the hands.
