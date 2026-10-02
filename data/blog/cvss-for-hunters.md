# CVSS for hunters: how I think about severity when writing reports

CVSS is the part of the report everyone skips and the part that quietly decides your payout. I used to treat the severity field like a formality: pick something that feels right, move on. Then I got a 500 euro bounty and an $80 bounty for the same bug class in the same month, and I finally understood what the number is actually for.

It is not a grade. It is an argument.

## What CVSS actually is (the thirty-second version)

The Common Vulnerability Scoring System takes a vulnerability and produces a number from 0 to 10 based on a set of metrics: how the attacker gets in (network? adjacent? physical?), how hard the attack is, whether it needs user interaction or privileges, and what happens to confidentiality, integrity, and availability if it works.

The number maps to a label: None (0), Low (0.1 to 3.9), Medium (4.0 to 6.9), High (7.0 to 8.9), Critical (9.0 to 10.0). Triagers read the label. The label shapes the payout conversation. So the number matters, and getting it right is a skill.

## The mistake I made for a year

I scored vulnerabilities the way they felt. Big scary bug? High. Small leak? Low. This is wrong in a specific way: feelings track the bug, but CVSS tracks the attack. The question is never "how bad is this bug." The question is "how bad is this bug for an attacker standing outside the system, and how easily can they reach it?"

My two information disclosure bounties are the perfect example. Same CWE-200, same month, same hunter, same report quality. One paid 500 euros (CVSS 4.4, Medium). One paid $80. The difference was entirely in the attack story: what data, reachable by whom, with what effort, leading to what damage. The bug class was identical. The severity was not, because severity is not about the bug class. It is about the specific exposure.

## How I score now: the attacker walkthrough

Before I touch the calculator, I write three sentences:

1. **Who is the attacker?** Unauthenticated stranger on the internet? Authenticated low-privilege user? Someone who already has an account and a reason to poke around? This sets the Attack Vector and Privileges Required, and it is the single biggest swing factor in most web scores.

2. **What does the attacker do, step by step?** Click a link? Send one request? Run a script for a week? This sets Attack Complexity and User Interaction. A bug that needs the victim to click a crafted link scores lower than the same bug reachable with a direct request, and triagers know it.

3. **What does the attacker get?** Read data (confidentiality), change data (integrity), take something down (availability). Be specific and be honest. Reading a username is not the same as reading a password reset token. "High confidentiality impact" for a leaked username is how you lose a triager's trust.

Only then do I open the calculator. The sentences make the metrics obvious instead of arguable.

## The metrics that actually move web bounty scores

You do not need to memorize all of CVSS. For web hunting, four metrics do most of the work:

**Attack Vector (AV).** Network versus Adjacent versus Local. Almost everything in bug bounty is Network, which is the highest. If your bug needs the attacker on the same WiFi or with local access, say so honestly, because the triager will check.

**Privileges Required (PR).** None versus Low versus High. This is where I see the most inflated scores. If your finding needs an admin account, that is High, and the score drops hard. Do not score a bug as "no privileges required" when your PoC used your own admin test account. Triagers catch this, and every caught inflation makes your next report less trusted.

**User Interaction (UI).** None versus Required. Stored XSS that fires when an admin views a page needs user interaction. Reflected XSS needs the victim to click. Be honest about it. The score reflects reality, and reality is what gets paid.

**Scope (S).** This is the sneaky one. Scope changes when the vulnerability in one component lets you affect another component: your XSS in the support portal that steals an admin session and pivots into the admin panel is a scope change, and it raises the score significantly. Learning to spot scope changes legitimately raised my scores, because I started seeing the full chain instead of the single bug.

## The honesty rule

Here is the rule I wish someone had given me on day one: **score the bug you found, not the bug you wish you found.**

Inflating severity is the fastest way to burn triager trust. The triager will recalculate your score. They do it every day. If your 7.5 becomes their 4.3, you have not just lost the argument, you have told them your future reports need discounting. One honest Medium beats one inflated High, because the honest Medium gets paid at the honest rate and the inflated High gets paid at the corrected rate plus a trust penalty.

I score conservatively now, and I add one line to every report: the attack chain in plain language, so the triager can see exactly what the number is based on. When they agree with the chain, they agree with the number. The number is the argument. The chain is the evidence.

## My actual workflow

1. Write the three sentences (attacker, steps, impact).
2. Run the CVSS calculator with those sentences open.
3. Read the resulting vector string and ask: does each metric match my sentences? If any metric feels generous, it is wrong.
4. Write the vector into the report and add the plain-language attack chain next to it.
5. Never round up. Never.

## The line that changed my payouts

"The triager is not paying for the bug class. They are paying for what the bug lets an attacker do."

CVSS is just the formal version of that sentence. Learn to write the sentence first. The number follows.

And when the number comes back lower than you hoped, do not inflate it. Improve the chain. Find the escalation step you missed. The score is feedback, not an insult. Treat it that way and your severity calls get sharper every month, same as everything else in this game.
