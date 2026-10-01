# How I read disclosed HackerOne reports (and actually learn from them)

HackerOne's Hacktivity page is the greatest free hacking textbook ever published, and most people use it wrong. They scroll the titles, think "cool", and close the tab. Nothing learned. I did that for months before I figured out there is a method to it, and once I had the method, disclosed reports became one of my highest-value learning sources. Several patterns I now check on every target came straight from reports I studied.

Here is the method, step by step.

## Start with the right reports

Not all disclosed reports are equally useful to you right now. A beginner reading a complex cryptographic oracle attack will learn nothing except humility. Filter for your level:

1. **Go to Hacktivity and filter by weakness type.** Pick the category you are currently studying. Learning XSS? Filter for cross-site scripting. Learning IDOR? Filter for those. Match the reports to your current lab work and they reinforce each other.
2. **Prefer reports with full timelines and clear writeups.** The best reports read like a story: what the hunter looked at, what seemed off, what they tried, what worked. Skip one-line disclosures with no detail; there is nothing to extract.
3. **Read recent reports, but do not ignore old ones.** A 2019 IDOR report teaches the same pattern as a 2026 one, because the underlying mistake (trusting client-supplied object references) never changes. Old reports are often better written, because the reporters were proving the new platform's value.

I keep a simple rule: two reports per week, in the category I am practicing in the lab that week. Report study and lab practice are a pair. The report shows you the pattern in the wild; the lab lets you touch it.

## Read it in this order

Reports are long. Do not read top to bottom like a novel. Read in this order:

**First: the impact section.** What did the hunter actually achieve? Read a private file, escalate to admin, execute JavaScript in another user's session? Impact tells you what the vulnerability class *means* in real terms, which is what makes the rest of the report stick. Abstract bug classes are forgettable. "They read anyone's invoices" is not.

**Second: the reproduction steps.** This is the meat. Read slowly. For each step, ask: what did the hunter *notice* that made them try this? The steps tell you what happened; the noticing tells you how to find it yourself. The difference between a technician and a hunter is entirely in the noticing.

**Third: the timeline.** The timestamps show you the rhythm of real hunting. Notice how long the gap is between "started looking" and "found something". It is usually days, not minutes. Internalize that. Your own dry spells are normal; the timelines prove it.

**Last: the comments and the bounty meta.** Sometimes the back-and-forth reveals edge cases or bypasses. Ignore the bounty amount debates; they teach nothing.

## Extract the pattern, not the payload

This is the core skill, and it is where most people fail. A report gives you a specific payload against a specific endpoint. If you memorize the payload, you have learned one bug on one site. If you extract the *pattern*, you have learned a check you can run on every target forever.

Here is how I extract. Take a hypothetical IDOR report: hunter changes `user_id=123` to `user_id=124` in an API call and gets another user's data. The payload is `124`. Useless to memorize. The pattern is:

- The application exposes object references in requests.
- Authorization is not verified server-side on those references.
- Detection method: intercept a request touching your own data, modify the reference, compare responses.

I write the pattern in my notes as a **check**, phrased as an action: "On every request that references an object (ID in URL, body, or header), replay it with a neighboring ID and diff the response." That check now runs on every target I touch, in Burp Repeater, in under a minute per endpoint. One report, permanent upgrade.

Do this for every report. The payload rots; the check compounds.

## Build the checklist

My per-vulnerability checklists live in a markdown file, one section per bug class, and a large fraction of the entries have a source note like "pattern from disclosed report, verified in lab". The file is organized by where I run the check:

- **Recon phase checks:** things like "spider the JS files for API endpoints" or "check for exposed .git on every new subdomain".
- **Per-endpoint checks:** the IDOR check above, plus "remove parameters and observe", "change the method", "send the admin-only request as a normal user".
- **Logic checks:** "repeat a one-time action twice", "skip a step in a multi-step flow", "use two sessions to race a state change".

Every time a report teaches me a new check, it goes in the file, and then it gets tested in the lab (DVWA, Juice Shop, or a VulnHub box) before it ever touches a real target. Untested checks are superstitions. Tested checks are methodology.

## Reproduce it yourself

Reading about a bug is worth maybe 10% of reproducing it. If the report is about a common bug class, rebuild the scenario in your lab:

- IDOR report? Stand up a tiny test: Juice Shop has API endpoints with object references. Practice the intercept-modify-diff loop there until it is boring.
- XSS report? DVWA has all three reflected, stored, and DOM variants at three difficulties. Reproduce the *class* of payload, not the exact string.
- SSRF report? Harder to lab, but you can practice the detection loop (Burp Collaborator, parameter fuzzing) against Juice Shop's endpoints.

The goal is to convert "I read about this" into "my hands know this". Your hands are what operate Burp at 1am when you are tired. Train the hands.

## What not to do

Three failure modes I see constantly:

**Do not copy-paste payloads at real targets.** A payload from a 2021 report will probably not work, and blindly firing payloads teaches you nothing when they fail. Understand the *why* behind the payload, then craft your own for the target in front of you.

**Do not treat reports as a shopping list of bugs to "find".** Reports describe what *was* found, which makes every bug class feel equally likely. In reality, on any given target, misconfiguration and access control issues dwarf exotic crypto bugs. Weight your effort accordingly: run the boring checks first, every time.

**Do not skip the boring reports.** The flashy RCE chain gets the retweets, but the information disclosure report with a two-step repro is the one that will actually make you money and teach you the anomaly mindset. My own first paid finding was an information disclosure, found by noticing something slightly off in a response. Boring pays. Literally.

## A worked example: from report to check

Let me make this concrete with a composite example (a blend of several real reports, not one specific disclosure). The report: a hunter found that a password-reset flow accepted an email parameter, and by changing the email to someone else's, the reset token was sent for the victim's account instead.

The payload is forgettable. Here is my extraction:

- **The pattern:** a state-changing flow takes an identity parameter from the client and trusts it.
- **The detection method:** run the flow for your own account while proxying, find every place your identity appears (email, user ID, username), change it to a second test account you control, and watch where the output goes.
- **The check, in my file:** "On every identity-touching flow (reset, invite, share, transfer), replay with a second account's identifier and verify the effect lands on the right account."

Then I test it in the lab: Juice Shop's password reset and product review flows give me places to practice the intercept-and-swap loop. Ten minutes later the check is in my fingers. Next real target, it runs automatically.

That is the whole method in one loop: report, pattern, check, lab, fingers.

## The compound effect

Two reports a week, one pattern extracted per report, one check added per pattern, every check tested in the lab. After six months, that is roughly fifty checks you run semi-automatically on every target. That is what "experience" actually is: not talent, not genius, just a large library of patterns and the discipline to run them.

Start tonight. Pick the bug class you are studying, find two disclosed reports, and extract one check from each. Then go run it in your lab. That loop, repeated, is the whole game.
