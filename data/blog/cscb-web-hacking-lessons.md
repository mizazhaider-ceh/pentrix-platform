# What CSCB taught me about web hacking

CSCB 2026 is the Belgian national cybersecurity competition. 806 players. I finished #1 in Web in the Junior division with 1669 points, #3 overall in the Junior division with 6576 points and 26 solves, and #26 nationally.

Those numbers look nice on a profile. What they do not show is the part where I stared at a challenge for two hours, going in circles, because I skipped the step I am about to tell you never to skip. Here is what a national CTF actually taught me about hacking under pressure.

## The format punishes your bad habits

A CTF is not real life, and anyone who tells you otherwise is selling something. In real bug bounty work, you have days. In CSCB, you have hours, a ticking scoreboard, and the creeping awareness that someone in Ghent just solved the challenge you are stuck on.

That pressure does something useful: it exposes every inefficiency in your methodology. In a relaxed lab, you can afford to poke randomly for an hour. In a competition, random poking is how you finish #200. The scoreboard is a mirror, and it is not flattering the first time you look into it.

My solve mix tells its own story: Pwn 23%, Reverse Engineering 19%, Web 19%, Forensics 19%, Cryptography 15%. I am not a web-only player. But web was my highest-scoring category, and it is the category where methodology matters most, because web challenges are the ones where "just look at it properly" beats "know a clever trick" almost every time.

## Lesson 1: read the source before you touch anything

Every web challenge in CSCB that I solved quickly, I solved because I read the provided source code first. Every web challenge that ate two hours of my life, I failed to do that.

The pattern was embarrassing in its consistency. Challenge opens. I see a login form. I immediately start spraying payloads like it is a bug bounty target with no source. Thirty minutes later, frustrated, I finally open the source code. The vulnerability is sitting there on line 40, practically waving at me.

The challenges I solved fast went like this instead: open source, read it end to end (most challenge apps are under 300 lines), map every route, note every input, and only then start testing. Reading 300 lines takes fifteen minutes. Blind payload spraying takes two hours and finds nothing.

This transfers directly to real work. When a bug bounty program gives you an open-source component or a JS bundle, read it first. The habit I built in CSCB, source before payloads, is now the first line of my methodology and it has paid for itself many times over.

## Lesson 2: timebox everything or the challenge eats you

My rule during CSCB: 45 minutes per challenge without meaningful progress means I switch challenges. No exceptions, no "just five more minutes".

This felt wrong every single time. The challenge I was stuck on felt like it was one insight away from cracking. Sometimes it was. But the math is brutal: two hours on one 200-point challenge is worse than one hour each on two 150-point challenges, and the scoreboard does not care about your sunk costs.

What counts as "meaningful progress": I understand a new piece of the application's behavior, I found a new endpoint, I got an error message that tells me something. "I tried 40 more payloads" is not progress. It is a treadmill.

In bug bounty, the equivalent is knowing when to leave a target. Some programs, some endpoints, are just dry. The hunters who make money are not the ones who never give up. They are the ones who give up fast and redirect the effort somewhere with better odds.

## Lesson 3: the web challenges that taught me the most

Three challenges from CSCB 2026 rewired how I think. I will describe them generically (challenge specifics stay with the competition), because the lessons are what matter.

**The shop with the logic flaw.** A small e-commerce challenge. No injection anywhere, I checked thoroughly and wasted an hour doing it. The flag was behind broken business logic: the application trusted the client about the state of a multi-step process. I finally found it by doing something I should have done at minute one: using the application like a normal user, slowly, and watching every request in Burp. The lesson: not every web bug is an injection. Logic flaws do not show up in payload lists. They show up when you actually understand what the application is supposed to do, and then do something it did not expect. In bug bounty, this is the IDOR/price-tampering/workflow-bypass family, and it is criminally under-hunted because scanners cannot find it.

**The feedback form with the template injection.** A classic server-side template injection, but hidden behind a feature I initially dismissed as cosmetic. I found it because of lesson 1: the source showed user input flowing into a template render, and the function name was just unfamiliar enough that I almost skimmed past it. The lesson: read every function, especially the ones with names you do not recognize. Unfamiliar code is where the bugs hide, because the challenge author (or the real-world developer) put the weird logic there for a reason.

**The one I failed.** An authentication challenge I never solved. I spent my full 45 minutes, timeboxed out, came back later for another 30, and never got it. After the competition, the writeup showed the intended path used a subtle JWT weakness I had actually considered in the first ten minutes and then talked myself out of. The lesson hurt: my first instinct was right and I overthought it away. Now, when my gut says "check the token handling" in the first ten minutes, I check the token handling in the first ten minutes. First instincts in web hacking are often pattern recognition from all the labs you have done. Trust the pattern.

## Lesson 4: automate the boring parts or drown

CSCB web challenges love repetition: try the payload list against every parameter, check every endpoint for every method, test every input for SSTI markers. Doing this by hand is how you lose.

I had a small toolkit ready: Burp Intruder payload lists for common injection markers (`{{7*7}}`, `${7*7}`, `<%= 7*7 %>`), a script that fuzzes HTTP methods on every discovered endpoint, and ffuf wordlists tuned for the challenge tech stacks. Nothing fancy. The point was not sophistication, it was speed: the mechanical checks ran in the background while my brain worked on the logic.

The same applies to bounty hunting. Your brain is the scarce resource. Anything a script can do, a script should do. Recon automation, payload lists, header diffing: automate it all, and spend your human attention on the one thing automation cannot do, which is noticing that something looks wrong.

## Lesson 5: notes are a weapon

I kept a markdown file per challenge: what the app does, every endpoint found, every test tried, every interesting response. When I timeboxed out of a challenge and came back an hour later, I did not have to re-derive everything. The notes were a save file.

This sounds trivial. It is not. Half the competitors I talked to afterwards lost time re-testing things they had already tested because they kept it all in their heads. In a six-hour competition, re-deriving your own earlier work is an unaffordable luxury.

My bug bounty notes work the same way now. Per target, per subdomain, what I tested and what I found. Boring. Effective.

## What the other categories taught me

Quick hits, because this is a web post but the lessons cross over:

- **Pwn (23% of my solves):** binary exploitation teaches you how software actually works under the hood, and that understanding makes you better at web too. Knowing what a buffer overflow is makes you think differently about every input field you have ever seen.
- **Reverse engineering (19%):** patience. RE challenges are slow by nature, and they trained me to sit with confusion instead of flailing. That patience is directly useful when a web app behaves weirdly and you need to figure out why instead of just spraying harder.
- **Forensics (19%):** attention to artifacts. Forensics is the art of finding the thing everyone overlooked in a pile of data. That is literally the recon mindset.
- **Crypto (15%):** my weakest category, and the one I have studied most since. Knowing your weak categories and patching them deliberately beats pretending you are well-rounded.

## What I would do differently

Honestly? Three things.

First, **sleep before the competition.** I will not pretend my sleep schedule is healthy (it is not, and my friends can confirm). But I felt the difference in hour five: slower reading, dumber mistakes, re-testing things I had already ruled out. A CTF is a cognitive endurance event and I treated it like a sprint.

Second, **solve in category order, not point order.** I chased high-point challenges early and bled time. The efficient play is to clear your strongest category first for momentum and points on the board, then expand. I knew web was my strength and still got distracted by a shiny 400-point pwn. Momentum is a real resource. Bank it early.

Third, **trust the first instinct.** The JWT challenge still bothers me. Ten minutes in, I had it. Then I decided it was "too obvious" and spent an hour on exotic theories. In web hacking, the obvious answer is right more often than your ego wants to admit.

## The takeaway

CSCB did not teach me new vulnerabilities. I already knew what SSTI and IDOR and JWT attacks were. What it taught me was **methodology under pressure**: read the source first, timebox ruthlessly, automate the mechanical parts, take notes like your score depends on it (it does), and trust your pattern recognition.

#1 in Web Junior was not the result of knowing secret techniques. It was the result of doing the boring fundamentals faster and more consistently than the people around me, for six hours straight.

That is the least glamorous lesson in this post and the most valuable one. The fundamentals, done fast, beat cleverness. Every time.
