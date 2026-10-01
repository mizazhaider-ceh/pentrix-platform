# AI x bug bounty: how I hunt with an AI copilot

I use AI in my bug bounty workflow. Not as a gimmick, not as a replacement for thinking, but as a copilot that handles specific jobs badly enough that I still have to verify everything and well enough that it saves me real hours.

This post is the honest version: what I actually use it for, with real examples, and where it fails. Because the discourse around AI in hacking is either "AI will replace hackers" (no) or "AI is useless for hacking" (also no). The truth is boring and useful, like most truths.

## What the copilot is actually good at

AI is good at exactly one thing: processing large amounts of text fast and telling you what stands out. That turns out to cover a surprising amount of bug bounty work, because bug bounty work is, to an embarrassing degree, reading.

It is bad at exactly one thing: knowing whether any of it is true. So the rule for everything below is: **AI suggests, Burp decides.** Nothing the model says becomes a finding until I verify it myself with actual requests. This rule has no exceptions.

## Job 1: triaging JavaScript files

This is my highest-value AI use case. My recon pipeline (see my recon workflow post) produces dozens of JS bundles per target. Reading them all by hand is impossible. Grepping for `api_key` catches the dumb stuff but misses the interesting stuff: the endpoint that is only called in an admin flow, the weird parameter, the commented-out debug code.

My workflow: I feed a JS file (or the interesting chunks of one) to the model with a focused prompt:

```
This is a JavaScript bundle from a bug bounty target I am authorized to test.
List: 1) every API endpoint or URL path referenced, 2) any hardcoded secrets,
keys, or tokens (ignore obvious placeholders and test values), 3) any
parameters that look like they control access, redirects, or file paths,
4) anything that looks like debug or admin functionality. Be terse.
```

What comes back is a structured list I can work through in ten minutes instead of the two hours manual review would take. It regularly surfaces endpoints my grep patterns missed, because it understands context: it can tell that `fetch("/internal/metrics")` inside a function called `adminDashboardInit` is more interesting than the same string in a comment.

The honest caveat: it misses things too, especially in heavily minified or obfuscated code, and it sometimes confidently lists "endpoints" that are actually string fragments. I treat its output as a prioritized reading list, not as results. The final read of the interesting parts is still mine.

## Job 2: generating payload variations

When I have a potential injection point, I know the standard payloads. What AI is good at is the variations I would not think of: filter bypasses for a specific WAF, polyglot payloads, encoding chains.

Example prompt:

```
I am testing a reflected input on an authorized bug bounty target. The
application blocks the strings <script, javascript:, and onerror (case
insensitive). Suggest 10 payload variations that avoid those exact strings,
using event handlers, encoding, or uncommon vectors. Explain briefly why
each might bypass the filter.
```

This is genuinely useful for breaking out of my own habits. I have a set of payloads I reach for automatically, and they are the same payloads every other hunter tries. The model suggests the weird ones: `onfocus` with autofocus, SVG animate tags, template literal tricks, things I know exist but would not have reached for.

The honest caveat: roughly a third of its suggestions do not work as described. It will confidently explain why a payload bypasses a filter and be wrong about the filter behavior. Every single payload gets tested in Burp. The model is a brainstorming partner, not an oracle. But as a brainstorming partner that never gets tired, it is excellent.

## Job 3: explaining weird behavior

This is the underrated one. Sometimes an application does something I do not understand: a strange redirect chain, an error message I have never seen, a response header combination that looks contradictory.

I paste the raw request and response (sanitized: no session tokens, no target-identifying details I do not need) and ask:

```
Explain what is likely happening server-side to produce this response.
I am authorized to test this application. Focus on what the behavior
implies about the backend architecture.
```

The model is good at pattern-matching against its training data: "that header combination suggests Cloudflare in front of an Nginx reverse proxy routing to two different backends, and the inconsistent behavior means your requests are hitting different backends." That kind of architectural read, from one weird response, has pointed me at real bugs more than once. It is not doing anything magical. It is doing what a senior hunter does when you show them a weird response, except it is available at 3am and does not judge my sleep schedule.

## Job 4: learning a new vulnerability class fast

When I decide to learn a new bug class, say SSTI in a template engine I have never seen, the traditional path is: find the docs, find writeups, build a lab, spend a day. AI compresses the first half of that:

```
Teach me server-side template injection in Jinja2. Start with the simplest
working payload, then show how to escalate from detection to reading files.
Include what the vulnerable code pattern looks like so I can recognize it
in source review.
```

Twenty minutes later I have the mental model, the payload progression, and the code pattern to grep for. Then I go build the lab and do it for real, because reading about SSTI is not knowing SSTI. The model gets me to the lab faster. The lab is where the learning actually happens. Anyone who skips the lab and goes straight to hunting with model-generated payloads is going to have a bad time and a lot of duplicate, invalid reports.

## Job 5: report drafts

Writing the report is the least fun part of a valid finding, and AI is good at turning my rough notes into a clean structure:

```
Turn these notes into a bug bounty report with: title, summary, steps to
reproduce, impact, and remediation. Keep it factual and concise. Notes: [...]
```

It produces a solid first draft in my report skeleton (the one from my 500-euro post). I then rewrite the impact section myself, because impact is where the model's generic phrasing is weakest and where triage analysts can smell template text. The draft saves me fifteen minutes per report. The rewrite keeps it human.

## Where AI fails (the honest section)

**It hallucinates endpoints and parameters.** Ask it to analyze a JS file and it will occasionally invent API routes that do not exist, presented with total confidence. If I reported what it told me without verifying, I would be submitting fiction. Verify everything.

**It is confidently wrong about framework behavior.** "In Django, X does Y" stated as fact, where X does not do Y in any Django version. Its knowledge has a cutoff and gaps, and it fills gaps with plausible-sounding invention. For anything version-specific, I check the actual docs.

**It cannot run tools.** It cannot send the request. It cannot see the actual response. All of its reasoning is about text I pasted, which means it is always working with a partial picture. The application is the ground truth. Always.

**It is sycophantic.** Tell it your theory and it will agree enthusiastically, then helpfully generate supporting evidence. "You are right, and here is why" is the most dangerous sentence in AI-assisted hacking, because now you have false confidence attached to a wrong theory. I deliberately ask it to argue against my theories: "here is what I think is happening, give me three reasons I am wrong." The pushback is more valuable than the agreement.

**It has no notion of scope or authorization.** It will happily help you attack anything. The ethics, the scope checking, the "should I test this" judgment: that is all you. My scope.txt file from the recon post exists precisely because no model will maintain it for me.

**Context limits are real.** Large codebases do not fit. I work around it by feeding focused chunks: the auth module, the upload handler, the interesting 200 lines, not the whole repo. Chunking is a skill: feed it the wrong chunk and its analysis is useless.

## My rules for the copilot

1. **AI suggests, Burp decides.** Nothing is a finding until verified with real requests.
2. **Sanitize before pasting.** No live session tokens, no credentials, nothing that would be a finding on its own. Treat the chat like a public channel.
3. **Ask for pushback, not agreement.** "Tell me why I am wrong" beats "confirm my theory" every time.
4. **Use it for speed, not for skill.** If you cannot do it without the model, you cannot verify the model's output, and then you are just forwarding hallucinations to triage. Learn the bug class first (in a lab), then let the model accelerate you.
5. **Keep the human parts human.** Impact sections, report tone, the judgment calls. Those are mine.

## The bottom line

AI made me a faster hunter, not a better one. The "better" came from labs, from CTFs, from reading source code until my eyes hurt. The model compresses the boring parts: triaging 40 JS files, brainstorming the 11th payload variation, drafting the report at 2am.

Used that way, as a copilot with a skeptical pilot, it is one of the highest-ROI tools in my workflow. Used as an autopilot, it produces confident nonsense at machine speed. The difference is not the model. It is you.
