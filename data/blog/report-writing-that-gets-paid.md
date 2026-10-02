# Report writing that gets paid: what makes a triager accept and reward

I have a post about my first valid report and what changed. This is the tactical companion: the actual anatomy of a report that gets accepted, understood, and paid, based on everything I learned getting there. Triagers are not your enemy. They are your customer. Write for them.

## Know your reader

Your report lands in a queue with fifty others. The person reading it is tired, has never seen this application before, and has about three minutes to decide whether your bug is real. They are not a hacker. They are not your friend. They are a professional skeptic whose job is to say no.

Every decision in your report should serve that reader. Not impress them. Serve them. The report that gets paid is the report that makes the triager's job easy.

## The anatomy of a paid report

### Title: the bug in one line

Bad: "Security issue found"
Good: "Unauthenticated API endpoint exposes internal user records (CWE-200)"

The title should let the triager route and prioritize your report before reading a word. Bug class plus the core fact. If you had to pick one line that survives being skimmed, this is it.

### Summary: three sentences

What the bug is, where it is, why it matters. Three sentences, no more. This is the part the triager actually reads first, and sometimes the only part they read before deciding to reproduce.

Bad: "I was testing your application and I noticed something interesting that could potentially be a security concern under certain circumstances."

Good: "The /api/v2/users endpoint returns internal fields (signup IP, support notes, internal flags) to any authenticated user. The UI displays none of these fields. An authenticated low-privilege user can enumerate them for any user ID."

Notice the good version names the endpoint, names the data, names the attacker, and names the gap between UI and API. Facts, not feelings.

### Steps to reproduce: a script, not a story

Numbered steps. Exact requests. No "go to the page and click around."

```
1. Log in as a standard user (no admin role).
2. Send: GET /api/v2/users/12345 (include the Authorization header from your session)
3. Observe the response: fields "signup_ip", "support_notes", and "internal_flag" are present.
4. Repeat with IDs 12346, 12347 to confirm it is not limited to your own record.
```

If you can, include the curl command. A triager who can copy-paste your PoC into a terminal and see the bug in thirty seconds is a triager who accepts your report.

### Impact: the attacker chain

This is where money is made. Not "this could potentially lead to unauthorized access." A concrete chain:

"An authenticated attacker enumerates user IDs and collects signup IPs and support notes. Support notes contain account recovery details. Combined with the password reset flow at /reset, which asks for the data visible in these notes, the attacker can take over accounts."

See the difference? The first version is a weather forecast. The second is a burglary plan. Triagers pay for burglary plans, because burglary plans are what their security team has to defend against.

I always write this paragraph as "an attacker could..." and I make it specific enough that the triager can picture it happening. If I cannot write a specific chain, the impact section says so honestly, and the severity reflects it. (There is a whole post on my CVSS thinking. Same principle.)

### Evidence: screenshots with annotations

One annotated screenshot per key moment. Annotate means: arrows, boxes, highlights on the exact fields that matter. A raw screenshot of a JSON blob is the triager doing your work. A screenshot with the sensitive fields circled and labeled is you doing theirs.

I also include the raw request and response in a collapsible block or code fence, so the triager has both the visual proof and the copy-pasteable evidence.

### Severity: the number with its reasoning

Include your CVSS vector and score, plus one line of reasoning. "CVSS 4.4 (Medium): network attack vector, low privileges required, no user interaction, high confidentiality impact limited to non-credential PII." When the triager can see your reasoning, disagreements become discussions instead of silent downgrades.

### Remediation: one paragraph

Suggest the fix briefly. Not a lecture, not a code rewrite. "Do not serialize internal fields in API responses; use a dedicated DTO/output model for the public endpoint." This does two things: it shows you understand the root cause (which builds trust), and it saves the triager from writing the recommendation themselves.

## The five report sins

These are the patterns I see in rejected reports, including my own early ones:

1. **The mystery novel.** Burying the bug in backstory. "I started by checking the login page, then I looked at..." Nobody cares about your journey. Lead with the bug.

2. **The exaggeration.** "CRITICAL: complete system compromise possible!!!" for a username enumeration. Triagers recalibrate inflated reports downward and remember who wrote them. Score the bug you found.

3. **The missing precondition.** Your PoC works because of a cookie, a header, a session state, or an account role you forgot to mention. The triager tries it clean, it fails, and your report dies as "cannot reproduce." List every precondition.

4. **The wall of text.** No headings, no steps, no structure. A tired triager will not excavate your bug from a paragraph. Format is respect.

5. **The copy-paste scanner output.** Pasting a tool's finding with no manual verification and no context. If you did not reproduce it by hand, do not report it. Scanners find candidates. Hunters find bugs.

## The AI question

I hunt with an AI copilot. I am open about that. But here is my rule, and I hold it hard: AI drafts, I verify. I use AI to structure a messy set of notes into a clean report, to tighten the impact paragraph, to check my CVSS reasoning. I never let it write claims I have not personally verified, and I never submit a PoC I have not run myself.

The human makes the calls. That is not a slogan. It is the difference between a report I can defend in one reply and a report that falls apart the moment a triager asks a follow-up question. Every sentence in my reports is one I could explain on a call. If I cannot explain it, it does not ship.

## The template I actually use

```
Title: [bug class] in [location]: [core fact]

Summary: (3 sentences: what, where, why it matters)

Steps to reproduce:
1. ...
2. ...
3. ...

Impact:
An attacker could... (concrete chain)

Evidence:
[annotated screenshots]
[raw request/response]

CVSS: [vector] ([score], [label]) - one line of reasoning

Remediation: (one paragraph)
```

Boring? Yes. That is the point. Boring is reproducible. Boring is clear. Boring gets paid.

Write it like they have three minutes. Because they do. And then go find the next one.
