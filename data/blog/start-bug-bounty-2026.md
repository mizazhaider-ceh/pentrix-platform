# So you want to start bug bounty in 2026

Every month someone asks me how to start bug bounty hunting. Usually they have watched a video where someone finds a critical in 20 minutes, and they want to know which tool does that.

There is no such tool. Here is the honest version: what to learn, in what order, how long it actually takes, which platform to pick, and the unsexy truths nobody puts in the thumbnail.

I am Muhammad Izaz Haider, "The PenTrix". I hunt on YesWeHack as MIHX01. My paid bounties so far: 500 euros and $80, both information disclosure, plus an accepted unrestricted file upload. I also placed #1 in Web (Junior) at CSCB 2026, the Belgian national CTF. I am not a million-dollar hacker. I am a student who hunts consistently, and this post is what I wish someone had told me at the start.

## The honest timeline

Let us get this out of the way: if you start today with basic computer knowledge, expect **3 to 6 months of consistent work before your first valid finding**. Consistent means several focused hours a week, not watching videos about hunting.

Some people do it faster. They usually have a programming or sysadmin background already. Some take longer. Both are fine. The people who quit are not the slow ones, they are the ones who expected money in week two and lost motivation in week six.

Bug bounty is a skill that compounds. Month one, everything is confusing. Month three, you start seeing patterns. Month six, you look at a target and your brain automatically flags the weird parts. There is no shortcut through the confusing part. There is only going through it.

## What to learn first (in this order)

Order matters. Learning SSRF before you understand HTTP is like learning surgery before anatomy. Here is the sequence:

**1. How the web actually works.** HTTP methods, status codes, headers, cookies, sessions, same-origin policy, CORS. Not "I have heard of these" but "I can explain what happens when you type a URL and press enter, in detail". This foundation is 80% of web hacking. Most failed hunters skipped it.

**2. One vulnerability class at a time.** Start with the classics, in this order: reflected XSS, stored XSS, SQL injection, IDOR/broken access control, then SSRF and file upload issues. One class. Learn it properly: how it works, what the vulnerable code looks like, how to test for it, how to exploit it safely in a lab. Then move to the next. Hunters who "know" fifteen bug classes shallowly lose to hunters who know four deeply.

**3. Burp Suite.** Learn it properly, not just the repeater. Proxy, intruder, decoder, comparer. The community edition is free and enough to start. Being fluent in Burp is like being fluent in your keyboard: it stops being a tool and becomes an extension of your thinking.

**4. Recon basics.** Subdomain enumeration, port scanning, content discovery. My recon workflow post has the full pipeline with commands. You do not need all of it on day one. Start with subfinder and httpx and grow from there.

**Free labs that are actually good:** PortSwigger Web Security Academy (free, and the single best resource for learning web vulns properly), HackTheBox and TryHackMe for general skills, and intentionally vulnerable apps like OWASP Juice Shop and DVWA for practicing locally. Do the PortSwigger labs for every bug class before you hunt that class on real targets. Reading about XSS is not knowing XSS.

## Picking a platform

The big three: HackerOne, Bugcrowd, YesWeHack. Plus Intigriti, which is strong in Europe.

My honest take: **start where the competition is thinnest and the scope fits your level.** I hunt on YesWeHack partly because it has strong European programs and partly because I like the platform. For a beginner, the platform matters less than the program choice within it.

Program choice matters enormously. As a beginner, look for:

- **VDPs (vulnerability disclosure programs) first.** No money, but no pressure either, and the scopes are often wide. Your first ten reports should be practice, and practice should not be on a program where mistakes cost you reputation.
- **Wide scopes.** `*.company.com` gives you room to do recon and find the forgotten corners. A single-URL scope against a hardened login page is where beginners go to get discouraged.
- **Responsive programs.** Check how fast they triage and whether they communicate. A program that leaves reports unread for six months will kill your motivation regardless of the bounty size.

Avoid the trap of only hunting the famous programs with huge bounties. Those programs have been combed by professionals for years. Your odds as a beginner are better on a mid-size program with a fresh scope that nobody has looked at yet.

## The dupe rate truth

Here is the thing nobody tells beginners: **most of your early reports will be duplicates.** Someone found it first. This is normal. This happens to everyone, including experienced hunters on fresh scopes.

Dupes feel personal. They are not. A dupe means your methodology works: you found a real bug using a real process. The only difference between you and the person who reported it first is timing. Keep running the process and the timing will eventually favor you.

What reduces your dupe rate, in order of effectiveness:

1. **Hunt fresh scopes.** New programs, new acquisitions, recently expanded scopes. Bugs have a half-life; the first hunter through gets the easy ones.
2. **Go deep instead of wide.** Everyone runs nuclei. Fewer people spend three hours understanding one complex feature's business logic. Logic flaws and chained bugs have far lower dupe rates than scanner findings.
3. **Hunt the forgotten parts.** Subdomains, old API versions, mobile API endpoints, staging environments. My 500-euro finding was on an API subdomain, not the main app. The main app is where the dupes live.
4. **Chain low findings.** One low-severity issue is a dupe magnet. Two low-severity issues combined into something with real impact is often novel, because chaining requires understanding the application, and most hunters do not bother.

## The unsexy 80 percent

Here is what bug bounty actually looks like, day to day: recon, reading JavaScript, triggering error pages, documenting behavior, writing reports. The exciting part, the moment of finding, is maybe 5% of the hours. The other 95% is methodical, repetitive work.

This is why most people quit. They signed up for the 5% and got the 95%. But the 95% is the job. The hunters who last are the ones who find the methodical part satisfying: the clean recon pipeline, the well-organized notes, the anomaly that turns out to be something.

My recon post exists because I automated the boring parts until the work felt like operating a machine that produces leads. Build that machine. Maintain it. The findings come out of it on a schedule, as long as you keep feeding it targets.

## Reports get you paid twice

A valid finding earns a bounty. A well-written report earns reputation, faster triage, and sometimes a higher severity than you suggested, because you made the impact obvious.

My report structure, every time: clear title, two-sentence summary, copy-pasteable reproduction steps, honest impact section, concrete remediation. Short. Triage analysts process dozens of reports a day. Yours should be the one they can verify in two minutes.

And when a report comes back as informative or duplicate, read the response carefully instead of arguing. Triage feedback is free education about where the bar is. I have learned more from my rejected reports than from most tutorials.

## A 90-day plan

Enough theory. Here is what I would do if I were starting over today:

**Days 1-30: foundations.** HTTP deep dive. Burp Suite basics. PortSwigger labs for XSS (reflected and stored). Set up your lab environment and your notes system. No real targets yet. You are building the foundation, and foundations are invisible and load-bearing.

**Days 31-60: expand the arsenal.** SQL injection and IDOR labs on PortSwigger. Juice Shop for practice combining bug classes. Learn subfinder and httpx. Start reading writeups, not for the payloads but for the methodology: how did the hunter choose the target, what did they notice, what was the chain of reasoning.

**Days 61-90: first real targets.** Pick two or three VDPs with wide scopes on YesWeHack or your platform of choice. Run your recon pipeline. Investigate anomalies. Submit your first reports. Expect dupes. Expect some invalids. Each report, valid or not, is a rep toward the hunter you are becoming.

After 90 days you will not be rich. You will be something better: a beginner with a working methodology, real target experience, and a brain that has started pattern-matching. That is the actual starting line. Everything before it was the warmup.

## The last honest thing

Bug bounty in 2026 is competitive. AI tools mean more people can run basic recon, which means the easy scanner-grade findings get duped faster. But AI cannot do the parts that actually pay: understanding a weird business workflow, chaining two lows into a high, noticing the header that looks wrong.

The bar for "run tools and report output" keeps rising. The bar for "think like an attacker" has not moved, because thinking is still the scarce resource.

So learn the fundamentals deeply, build a methodology you run consistently, hunt the places others ignore, and write reports that respect the triage analyst's time. Do that for a year and you will have findings, reputation, and skills that transfer to any security career.

I break things for a living, or at least I am working on it. The defence arc is loading too. Come join us. The water is fine, the dupes are normal, and the first valid finding feels better than you think.
