# Information disclosure playbook: the methodology behind two paid bounties

In March 2026 I got paid twice for the same bug class: information disclosure, CWE-200. One paid 500 euros, one paid $80. Same month, same vulnerability family, wildly different payouts. People always ask about the money. The money is the least interesting part. The methodology is the whole story, and it fits in one playbook you can run on any target.

No target details in this post. Program scopes are not my stories to tell. The techniques are generic and they work everywhere.

## The mental model: the app talks too much

Every application is a conversation between your browser and a server. The server says things. Most of it is necessary. Some of it is gossip.

Information disclosure is simply the server saying things it should not say, to people it should not say them to. Developers think in terms of the UI: "the user only sees this page, so only this data matters." But the UI is a curtain. The actual conversation happens in HTTP responses, JavaScript bundles, API endpoints, headers, error messages, and all the places the UI never shows you.

My entire playbook is one question asked in fifty places: "Did the server just say more than it needed to?"

## Step one: read every response, not just the interesting ones

This is the habit that produced both findings. Most hunters read responses selectively: they look at the response for the endpoint they are testing and ignore the rest. I read everything, especially the boring endpoints.

Here is why: disclosure bugs love boring endpoints. The flashy API with authentication and rate limiting got a security review. The little internal endpoint that returns the user list for an admin dropdown? Nobody reviewed that. The status page? The health check? The debug endpoint someone left in? Those are where servers gossip.

Concretely: I proxy everything through Burp, and when I am doing a first pass on a target, I do not filter. I click through the whole application like a user would and then I go back and read the responses I captured, one by one. Slow? Yes. But both paid findings came from endpoints I would have skipped if I had been "efficient."

## Step two: the API response audit

For every API response, I ask three questions:

1. **What fields are here that the UI does not display?** This is the big one. If the UI shows your username and plan, but the API response includes your internal ID, your signup IP, and a support note, that is a finding. Developers serialize database objects and forget that serialization includes everything. Compare the response to the screen, field by field. Anything on the wire that is not on the screen is suspicious until proven boring.

2. **Is this data meant for my role?** An endpoint might return user data that is fine for an admin but not for a regular user. Test with two accounts if you can. Same endpoint, two roles, diff the responses. The delta is where disclosure lives.

3. **Does the endpoint need authentication at all?** Copy the request, strip the auth, replay it. If it still returns data, you have something. This single test, which takes ten seconds per endpoint, is responsible for a huge percentage of real-world disclosure findings.

## Step three: JavaScript is a treasure map

Front-end bundles are written by developers and reviewed by almost nobody. They contain API endpoints, internal hostnames, debug flags, hardcoded keys, comments with TODO notes that name internal systems, and sometimes entire chunks of commented-out code with credentials in them.

My process: grab the main JS bundles, run them through a beautifier, and search for keywords. Not clever keywords. Boring ones: `api`, `key`, `token`, `secret`, `admin`, `debug`, `internal`, `staging`, `password`. Then I read the interesting hits in context. Most are false positives. You are not looking for most. You are looking for one.

I also run linkfinder-style extraction to pull every URL out of the bundles, because apps reference API endpoints and internal services that no spider would ever find. Each new endpoint goes back into step two.

## Step four: errors that confess

Error messages are the server under stress, and people under stress say things they should not. I deliberately trigger errors everywhere:

- Weird IDs in URLs (`/user/999999999`, `/user/abc`, `/user/-1`)
- Wrong content types, malformed JSON bodies
- Stack traces turned on in staging or dev environments
- Verbose 404 and 500 pages that include paths, versions, framework names, database errors

A 500 page that says "SQL syntax error near..." is a disclosure finding and a roadmap to the next finding. Version numbers in error pages feed directly into vulnerability research. Paths reveal infrastructure. Every error message goes into the notebook.

## Step five: headers, robots, and the forgotten files

The five-minute sweep I run on every new target:

- **Response headers:** look for `X-Powered-By`, server versions, internal IPs in `Via` or `X-Forwarded-For` echoes, debug headers like `X-Debug-Token`.
- **robots.txt and sitemap.xml:** lists of paths the site would rather you not visit, conveniently published for your reading pleasure.
- **Well-known files:** `.git/HEAD`, `.env`, `config.php~`, backup files (`index.php.bak`), `swagger.json`, `api-docs`. Most return 404. You are hunting the one that does not.
- **Directory listing:** try the parent paths. Sometimes a misconfigured directory serves the whole file list.

None of this is advanced. That is the point. Disclosure is a volume game played with basic moves, and most hunters skip it because it feels too simple to pay. It pays.

## Why the two payouts were so different

Same bug class, 500 euros versus $80. The difference was impact, and impact is the whole severity conversation (I wrote a whole post on CVSS for hunters, go read it after this one).

The 500-euro finding exposed data that was clearly sensitive and clearly reachable by the wrong people: the kind of thing where you read the response and your stomach drops a little. The $80 finding was real, valid, accepted, but lower impact: the data was sensitive-adjacent, harder to weaponize, or visible to a narrower set of wrong people. Same class, different damage, different money. The triager is not paying for the bug class. They are paying for what the bug lets an attacker do.

This is worth internalizing early: you cannot control the payout, but you can control the impact write-up. Every disclosure report I write now has one paragraph that starts with "an attacker could..." and walks through the concrete abuse. Not theory. Not "this could potentially lead to." A specific chain: this data plus this access equals this outcome. That paragraph is where money is made.

## The checklist

```
[ ] proxy everything, read every response on first pass (especially boring endpoints)
[ ] diff API responses against the UI: every field on the wire that is not on the screen
[ ] test endpoints with two roles; diff the responses
[ ] strip auth from requests and replay
[ ] extract and read JS bundles: endpoints, keys, comments, internal hostnames
[ ] trigger errors: bad IDs, malformed input, wrong content types; read every error page
[ ] headers sweep: versions, debug headers, internal IPs
[ ] robots.txt, sitemap.xml, well-known files (.git, .env, backups, swagger)
[ ] write the impact as a concrete attacker chain, not a theory
```

Information disclosure will never be the fashionable bug class. Nobody brags about it at conferences. But it is the bug class most likely to be sitting on the target you are looking at right now, waiting for someone patient enough to read the whole response.

Be that person.
