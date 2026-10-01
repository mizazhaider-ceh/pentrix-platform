# Duplicates happen: the mindset that keeps you hunting

Let me tell you about the least glamorous part of bug bounty, the part nobody posts about: the dry spell. Weeks where every submission comes back "duplicate" or "not applicable". Weeks where you stare at a target you have already mapped six ways and feel like the bugs are laughing at you. I have been there more times than I have been anywhere else in this field.

This article is not about technique. It is about the mental game, because the mental game is what determines whether you are still hunting in a year. Technique gets you your first finding. Mindset gets you your fiftieth.

## The math nobody warns you about

Here is the honest arithmetic of bug bounty: most of what you submit will not pay. Duplicates, out-of-scope misunderstandings, "intended behavior", severity downgrades. This is not a sign you are bad at it. It is the base rate of the activity. Every hunter you admire has a graveyard of dupes ten times the size of their accepted findings.

My own record includes an accepted unrestricted file upload (CWE-434) and a paid information disclosure from March 2026. Those are the highlights. The highlights reel does not show the months of nothing between them, the reports I was sure about that came back duplicate, the evenings I closed the laptop thinking maybe I am just not cut out for this.

You need to make peace with the math early, because if your motivation depends on a steady stream of wins, bounty hunting will break it. The wins are lumpy. The work is constant. Anyone who stays is someone who learned to enjoy the work independent of the wins.

## What a duplicate actually means

Reframe time. A duplicate means: **you found a real bug, and someone found it first.** Read that again. The skill worked. Your methodology produced a genuine vulnerability in a real system. The only thing missing was timing.

Beginners treat dupes as failures. They are not failures; they are proof of competence with bad luck attached. Every dupe is evidence that your process finds real bugs. Run the same process on a fresher target, or a less crowded program, and the same finding pays.

I keep a private list of my dupes, and I review it quarterly. Patterns emerge: I was consistently late on a certain program (too crowded, move on), or my IDOR checks were finding things but always second (my checks work; I need faster triage or newer targets). The dupe list is data. Treat it like data, not like a report card.

## The comparison trap

Social media shows you everyone's accepted findings and nobody's rejected ones. You see the payout posts, the "first blood" screenshots, the hall-of-fame mentions. You do not see the six weeks of nothing that preceded them, because nobody posts "day 43 of finding nothing, feeling great".

I am guilty of this too. My public record is the highlights: the accepted CWE-434, the paid info disclosure, the CSCB result. The full record includes long stretches where I questioned whether I was wasting my evenings. If you compare your behind-the-scenes with everyone else's highlight reel, you will always feel behind. The comparison is rigged. Stop playing it.

Unfollow or mute accounts that make you feel worse about your own pace. Follow the ones that post methodology, failed attempts, and honest writeups. Curate your inputs like you curate your target list: deliberately, in service of the work.

## When to quit a target

Persistence is a virtue until it becomes stubbornness. Not every target deserves infinite hours. I timebox: a new target gets a fixed recon-and-first-pass budget (for me, roughly two focused evenings). If the first pass surfaces nothing interesting and the target feels picked clean, I rotate to the next one instead of grinding.

Quitting a target is not quitting hunting. It is portfolio management. Your hours are the capital; allocate them where the expected learning is highest. A target you have fully mapped with zero findings has still paid you in practice reps, but the marginal return on hour ten is lower than hour one on a fresh target. Move the capital.

The exception: targets you are learning on. Early on, I stayed on single targets far past the timebox because the *practice* was the point, not the finding. That is fine, as long as it is a conscious choice. "I am here to practice my IDOR checks" is a valid reason to stay. "I have already spent so long, I cannot leave now" is the sunk-cost fallacy wearing a trench coat.

## The dry spell protocol

When nothing is landing, I run a protocol instead of spiraling. It has four steps:

**1. Shrink the target.** Dry spells often come from hunting too big: a massive program with thousands of hunters where everything obvious is gone. Switch to something smaller, newer, or weirder. New programs, new features on existing programs, acquisitions that just got added to scope. Fresh attack surface beats crowded attack surface.

**2. Change the bug class.** If you have been grinding XSS for a month with nothing, your eyes are stale. Switch to access control, or business logic, or information disclosure. Different bug classes use different mental muscles, and the switch itself often breaks the block. My information disclosure finding came during exactly such a switch.

**3. Go back to the lab.** This sounds like retreat; it is actually sharpening. An evening in DVWA or Juice Shop rebuilding a technique from scratch reminds your hands what competence feels like. Confidence in this field is not a personality trait, it is a trained state, and the lab is the gym.

**4. Take an actual break.** Not a "scroll Twitter while feeling guilty" break. A real one. Walk, sleep (I am told this is something humans do regularly), talk to people about non-security things. Burnout makes you miss bugs you would normally catch, which deepens the dry spell, which deepens the burnout. Break the cycle physically, not mentally.

## Process goals, not outcome goals

The mindset shift that changed everything for me: stop setting goals like "get a bounty this month" and start setting goals like "run my full checklist on three new targets this month" or "learn one new bug class properly".

Outcome goals depend on luck, timing, and other hunters. You cannot control them, so they generate anxiety. Process goals depend only on you showing up. You can control them completely, so they generate momentum. And here is the beautiful part: the process goals are what *produce* the outcomes, on a delay. Every finding I have ever had was the delayed result of process goals I set weeks earlier.

Track the process visibly. I keep a simple log: date, target, hours, what I tested, what I learned. On bad weeks, the log proves I am still moving. On good weeks, it shows me what was working. Either way, it converts vague dread into specific information.

## Why I keep going

Honest answer? Because the work itself is interesting. There is a specific feeling, at 1am, when a response comes back slightly wrong and your brain goes "wait, what was that", and twenty minutes later you are looking at something nobody was supposed to see. That feeling does not get old. The money is nice, the recognition is nice, but the feeling is the actual product, and it is available on every hunt regardless of the outcome.

Also, pragmatically: the skills compound. Every target teaches you something, even the ones that pay nothing. The hunter I am now would dismantle the targets that stumped me a year ago. That growth is real whether or not any single month shows it.

## A note on luck

I want to be honest about something the mindset content usually skips: luck is real. Being early on a new program, testing a feature the day it ships, guessing the right parameter on the first try, that is luck, and it plays a role in every hunter's story including mine.

But luck in this field is not random. It favors the prepared in a very literal way: the more targets you touch, the more new features you test, the more parameters you fuzz, the more lottery tickets you hold. Nobody controls which ticket wins, but you control how many you hold, and that is entirely a function of showing up consistently.

So when someone's success looks like luck, it usually is luck plus a hundred quiet evenings that made the luck possible. You cannot schedule the lucky break. You can schedule the evenings. That is the whole strategy, and it is enough.

## The thing I wish someone told me

You are not behind. The people posting bounties are posting highlights, not averages. Everyone's journey has the same shape: long flat stretches of learning punctuated by sudden jumps. The flat stretches are not wasted time; they are the jumps being built.

Duplicates happen. Dry spells happen. Keep the process goals, run the protocol, and stay in the game. The bugs are patient. Be more patient.
