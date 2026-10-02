# Rejection handling: wont fix, duplicate, N/A, and the day after

I wrote a post about the duplicates mindset, the math of it, why process goals beat outcome goals. This one is different. This one is about the feeling. The 2 AM feeling when the email arrives and the triager has decided your bug, the one you spent six hours on, is "not applicable." What happens in your head next is the entire game, and nobody teaches it.

So let me teach it. From the inside.

## The anatomy of a rejection

Rejections come in flavors, and they hit differently:

**Duplicate.** Someone found it first. This one hurts the least logically and the most emotionally, because you were right. The bug was real. You did the work. You were just slow. It feels like running a race you won and being told someone ran it yesterday.

**Wont fix / N/A.** The triager acknowledges the behavior and declines to care. This is the one that stings, because it is a judgment call on your bug's worth. You thought it mattered. They disagree. It feels personal even though it is not.

**Informative / accepted but no bounty.** Your bug is real, they fixed it or logged it, and the reward is zero. This one is confusing: you won and lost at the same time.

**Needs more info.** Not a rejection exactly, but it feels like one. They could not reproduce it, which means your report failed, which means the bug might as well not exist.

I have tasted all four. Here is what I learned from each.

## Duplicate: you were slow, not wrong

The first duplicate I ever got ruined my evening. I sat there staring at the screen thinking about the hours. The recon, the testing, the report writing. All of it, for nothing.

Then a hunter I respect told me something that rewired me: a duplicate means your methodology works. You found a real bug on a real target using your own process. The only variable that failed was timing. Speed is a skill you can train. Methodology is the hard part, and yours just validated itself.

Now I keep a duplicate log. Every duplicate gets one line: what the bug was, what I could have done faster, and whether the target was fresh enough that I should have been quicker. Duplicates stopped being failures and became timing data. Some of my best methodology improvements came from asking "how would I have found this two weeks earlier?"

The practical fix: hunt fresher targets and newer features. Duplicates cluster on old, popular programs and well-known endpoints. New features, new endpoints, fresh programs, that is where you are first instead of second.

## Wont fix: it is a disagreement, not a verdict

Wont fix used to make me angry. I would read the triager's reasoning and think "you are wrong, this is clearly a security issue." Sometimes I was right. Mostly, I was missing context.

Here is what I learned: the triager is not scoring your bug in a vacuum. They are scoring it against their risk model, their roadmap, their threat landscape. A behavior that looks like a vulnerability to you might be a documented, accepted risk to them. That does not make you stupid. It makes you an outsider to their context, which is what you are.

The process I run now for every wont fix:

1. Read their reasoning twice. Not to argue, to understand.
2. Ask: is there a variant with higher impact? Half of my wont fixes died because I reported the weak version. The strong version was one escalation step away.
3. If the reasoning is genuinely wrong, reply once, politely, with new evidence. Not a complaint. Evidence. One reply. Then move on.
4. Log it and hunt the next thing the same day. Same day. The gap between a rejection and your next session is where motivation dies.

Step 4 is the whole post, honestly. The day after a rejection is the most dangerous day in bug bounty. You are allowed to feel bad for an evening. You are not allowed to let it eat a week.

## N/A: the report failed, not the bug

"Cannot reproduce" is a report problem until proven otherwise. When I get this, I go back to my PoC and I follow it myself, slowly, like I have never seen the target before. About half the time I find the gap: a step I skipped because it was obvious to me, a precondition I forgot to mention, a session state the triager would not have.

I wrote a whole post on report writing. The short version: the triager has three minutes and no context. If your bug needs context to reproduce, the context goes in the report.

The other half of the time, the bug really is flaky or environment-dependent. That happens. Log it, note the conditions, move on. Flaky bugs on a target you understand become solid bugs later.

## The emotional system

Here is my actual system for the feeling, because the feeling is real and pretending it is not is how people burn out:

**Feel it on a timer.** Rejection email arrives. I am allowed to be annoyed until dinner. After dinner, it is data. This sounds silly. It works. The timer externalizes the emotion instead of letting it bleed into the week.

**Never submit and refresh.** Do not submit a report and then check the platform every hour. Submit it, close the tab, go hunt the next thing. The report is out of your hands. Refreshing is just anxiety with a UI.

**Keep a wins file.** Every acceptance, every nice triager comment, every payout screenshot goes in one folder. On bad days, open it. Past you is evidence that present you knows what they are doing. My wins file has the $80 bounty screenshot in it, and I look at it more than the 500 euro one. There is a post about that too.

**Talk to hunters, not to the void.** The bounty community is full of people who have eaten the same rejections. One conversation with a hunter who has been dupe-streaking for a month will normalize your bad week faster than any pep talk you give yourself.

## What rejection actually built

My methodology, my report writing, my target selection, my emotional discipline: all of it was built by rejections, not by acceptances. Acceptances feel good and teach little. Rejections are specific. Each one names the exact gap: too slow, unclear report, weak impact, wrong target.

I break things for a living. That includes my own ego, regularly, on schedule, by email.

The hunters who last are not the ones who never get rejected. They are the ones who built a system for the day after. Build yours.
