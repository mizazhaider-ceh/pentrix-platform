# From CTFs to real targets: what transfers and what does not

In 2026 I placed #1 in Web in the Junior division at CSCB, the Belgian national CTF. Later that same year I started hunting real bug bounty targets as MIHX01 on YesWeHack, and landed real accepted findings including an unrestricted file upload and a paid information disclosure.

People assume these are the same skill. They are related, but they are not the same, and misunderstanding the difference will cost you months. Here is what crossed over cleanly, what did not, and what genuinely surprised me.

## What CTFs gave me (the transfers)

**Methodology under time pressure.** CSCB runs on a clock, and so does every timed CTF. You learn to be systematic fast: enumerate first, hypothesize, test, move on when a path is cold. That discipline transferred directly. On a real target, nobody is timing you, but the habit of structured investigation versus random poking is the same, and it is the difference between hunters who find things and tourists who browse.

**Tool fluency.** nmap goes brrr is a joke, but it is also a job requirement. CTFs forced thousands of repetitions: intercepting requests, decoding blobs, fuzzing parameters, reading minified JavaScript. By the time I touched a real target, Burp was an extension of my hands. That fluency is pure CTF dividend, and it compounds: every hour of tool practice in CTFs pays out forever.

**Pattern recognition.** CTF web challenges are concentrated bug patterns: this one is SSTI, that one is SQLi, the other is a JWT trick. Solving dozens of them burns the *shapes* of vulnerabilities into your brain. On a real target, when I see a template rendering user input or a JWT in a cookie, the pattern fires before conscious thought. CTFs are pattern flashcards with extra steps.

**Trying harder (the real one).** The CTF mindset of "the flag exists, keep going" builds persistence as a reflex. Real targets do not guarantee a bug, but the persistence transfers anyway: the willingness to check one more endpoint, read one more JS file, test one more parameter. Most findings live exactly one "one more" past where most people quit.

## What does NOT transfer (the gaps)

**There is no flag.** This sounds obvious and it rewires everything. In a CTF, you know a vulnerability exists, roughly where it is, and what success looks like (a flag string). On a real target, you know none of that. Maybe there is nothing. Maybe the bug is in a feature you have not found yet. Maybe you already *saw* the bug and did not recognize it. Hunting without a guaranteed flag requires a completely different relationship with uncertainty. You have to be comfortable investing hours with no promise of return. CTFs never teach this because the promise is the whole format.

**Scope is law.** In a CTF, everything in the challenge is fair game by definition. In bug bounty, scope is a legal boundary: specific domains, specific features, explicit exclusions. Testing outside scope is not "creative", it is a violation that can get you banned or worse. I had to build a new habit: read the scope first, set Burp's target scope to match, and treat the boundary as sacred. The home lab article on this blog covers the legal side in full; the mindset side is that constraint is part of the challenge, not an obstacle to it.

**Patience over speed.** CTFs reward speed: first blood bonuses, ticking clocks, leaderboard pressure. Real hunting rewards patience: watching a target over days, noticing a new feature deploy, re-testing after an update. My best findings came from slow work, not fast work. I had to deliberately unlearn the sprint reflex and learn to sit with a target. Fast finds the known; slow finds the new.

**Report writing is a skill, not an afterthought.** In a CTF you submit a flag string. In bug bounty you submit a report, and the report *is* the product. A brilliant finding with a sloppy report gets downgraded or misunderstood. I had to learn: clear title, impact stated up front, step-by-step reproduction a stranger could follow, screenshots or video. The report-writing discipline from my university coursework (60/60 ECTS did not happen by accident) turned out to be directly applicable. Write like the triager is tired and busy, because they are.

**Defense exists.** CTF challenges generally do not fight back. Real targets have WAFs, rate limiting, bot detection, and monitoring. Your SQLi payload gets blocked, your fuzzing gets throttled, your IP gets a timeout. Working around defenses without violating scope or policy is a whole skill CTFs barely touch. Start gentle: if you are getting blocked, slow down and get smarter instead of louder.

## What surprised me

**Boring bugs pay.** CTFs glorify the exotic: the chained RCE, the crypto oracle, the impossible bypass. Real targets pay for the boring: information disclosure, IDORs, misconfigurations, verbose errors. My paid finding was an information disclosure, found by noticing something slightly off in a response. The anomaly mindset from CTFs ("that looks weird, poke it") transferred perfectly; the *target* of that mindset just shifted from exotic to mundane. Hunt the boring. The boring is everywhere.

**Recon matters more than exploits.** In CTFs, the challenge hands you the target; the work is exploitation. In real hunting, *finding* the target surface is half the battle: subdomains, acquisitions, forgotten staging environments, old API versions. My recon workflow article covers the pipeline, but the mindset shift is the point: on real targets, enumeration is not the preamble to the hunt, it *is* the hunt. The exploit is often the easy part once you find the right surface.

**Real code is messier than CTF code.** CTF challenges are designed: clean, minimal, with the vulnerability placed deliberately. Real applications are sprawling, legacy, contradictory messes. Reading real JavaScript bundles and real API behavior requires tolerance for chaos that no designed challenge teaches. The skill that helped most was not any specific technique but plain reading stamina: the willingness to read the ugly code anyway.

## The first real target (what it actually felt like)

I remember my first serious session on a real program. I had my checklist, my Burp project, my recon pipeline output, everything the method said to have. And I sat there, paralyzed, for an embarrassing amount of time. Because in a CTF the challenge tells you where to look, and here there was just... a website. A normal, boring, corporate website. Where do you even start when the answer could be anywhere or nowhere?

What broke the paralysis was falling back to the most boring procedure I knew: map the whole thing first. Spider every page, note every feature, list every input. No hunting, just cartography. An hour later I had a map, and a map turns "anywhere" into a list of specific places. Then I ran my per-endpoint checks down the list, one by one, the same loop I had run a hundred times in the lab.

I did not find anything that session. But I left with something better: proof that the procedure works on real targets, not just designed ones. The second session, the map was already there, and I was hunting instead of wandering. The lesson: when a real target overwhelms you, do not hunt. Map. Hunting is what you do to a map.

## How to bridge the gap

If you are a CTF player eyeing real targets, here is the bridge I wish I had:

1. **Keep doing CTFs.** They are the best pattern training in existence. Do not quit them; they keep your tools sharp and your persistence trained.
2. **Add one real-scope activity.** Pick a bug bounty platform, read scopes carefully, and start with the least crowded programs. Or start with responsible disclosure on open-source projects. Get used to the no-flag uncertainty on low-stakes targets.
3. **Write a real report.** Take a CTF solution and rewrite it as a bounty report: impact, reproduction steps, remediation suggestion. This single exercise closes half the gap.
4. **Study disclosed reports.** The reading-reports article on this blog is literally the method. Disclosed reports are the missing textbook between "I can solve CTFs" and "I can hunt real targets".
5. **Build the lab.** Everything experimental happens in your home lab first. CTF skills are proven in competition; hunting skills are proven in the lab, then deployed on targets.

## The bottom line

CTFs made me fast, fluent, and persistent. Real targets taught me patience, scope discipline, and report writing. Neither replaces the other. The CTF player who learns the hunting mindset, and the hunter who keeps the CTF speed, is the dangerous combination.

I am still both. The CSCB trophy sits in my memory next to the bounty notifications, and I would not trade either for the other. Different games, same player, and each one makes me better at the other.
