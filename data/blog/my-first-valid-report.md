# My first valid report: the road there and what changed after

My first accepted report was not my first report. It was maybe my fifteenth. I want you to sit with that number for a second, because the gap between "I can find bugs" and "a triager believes my bug" is the part nobody talks about, and it is the part that almost made me quit.

I break things for a living, or at least that is the plan. But before anyone pays you for breaking things, you have to learn to document the breaking in a way that strangers take seriously. That is the real story of my first valid report.

## The fifteen reports before the one that counted

When I started on YesWeHack, I did what every beginner does: I treated reporting like the boring part. The fun was the hunting. I would find something weird, get excited, and write the report in five minutes like I was texting a friend. "Hey, found this weird thing on your site, it leaks stuff. Should fix."

Then the rejections came back. Not duplicate, not out of scope. Just... unclear. Need more info. Cannot reproduce.

Here is what stung: I was right. The bugs were real. One of them, I am fairly sure, was a legitimate issue that I could reproduce on my screen every single time. But I could not make a stranger in another country see what I saw. My reports were like showing someone a photo of your dream: compelling to you, meaningless to everyone else.

So I did the unglamorous thing. I read accepted, disclosed reports. Not the payloads. The structure. The boring parts. How long is the summary? Where does the impact go? What does a good proof of concept actually look like? I went through them the way I go through PortSwigger labs, slowly, twice, taking notes like I was studying for an exam.

## What changed

Three things changed in my reports between submission fourteen and submission fifteen. Not my skills. Not my tooling. Three habits.

**One: I started writing the report before I finished testing.** This sounds backwards. What I mean is, the moment I find something weird, I open a blank document and start describing what I expect to happen versus what is happening. Writing forces a theory. "I expected X, I observed Y, the delta means Z." If I cannot write that sentence, I do not have a bug yet. I have a curiosity, and curiosities are not reports.

**Two: I made reproduction a script, not a story.** My early PoCs were paragraphs of "first go to this page, then click this, then you will see..." That is a story. A triager has fifty reports in their queue. They do not want a story. They want a sequence they can execute in two minutes and a screenshot that matches. So I started writing PoCs as numbered steps with the exact requests, curl commands where possible, and one annotated screenshot per key moment. If the triager cannot reproduce it in three minutes, the report is not done. That is my rule now.

**Three: I stopped assuming the triager knows my tooling.** "Intercepted with Burp" means nothing to someone reading fast. "Sent request X with header Y modified, received response Z" means everything. I started writing reports for a tired stranger who has never seen the application before. Because that is exactly who reads them.

## The report that landed

My first accepted report was an information disclosure finding. I am keeping the target generic on purpose, because the interesting part is not the target, it is the process. The application had an endpoint that returned more data than the UI displayed. The UI showed you a summary. The API response quietly included fields the developers clearly did not mean to expose.

I found it because I was doing something boring: reading every response in Burp instead of just the ones that looked vulnerable. The response was big, ugly JSON, and three fields down there was data that had no business being on a client response. My report had the endpoint, the exact request, the response with the sensitive fields highlighted, and one paragraph explaining why those fields were dangerous in the wrong hands. No drama. No exaggeration. Just the facts, in order.

It came back valid. And then, in March 2026, things accelerated: two paid information disclosure bounties (CWE-200), one for 500 euros and one for $80, plus an accepted unrestricted file upload (CWE-434) on my YesWeHack profile. Alhamdulillah.

## What actually changed after the first valid report

Here is the honest part. The first valid report did not change my income much. One accepted finding is not a career. What it changed was my filter.

Before the first valid report, I reported everything that felt weird. My submissions were a scatter plot: a misconfiguration here, a suspicious header there, a maybe-bug everywhere. After it, I started asking one question before I wrote anything: "Can I make a stranger reproduce this in three minutes?" If the answer was no, it went back to the notebook, not the platform. My submission volume dropped. My acceptance rate went up. Quality beats quantity is a cliche because it is true, and in bug bounty it is true in the most literal, measurable way.

The second thing that changed: I stopped fearing the submit button. The first submission feels like walking into an exam you did not study for. The fifteenth feels like homework. You learn that triagers are not judges waiting to reject you; they are overworked people who want your report to be clear so they can do their job. Once you see it from their side, writing reports becomes a service, not a performance.

## The thing I would tell my day-one self

Do not wait until you are good to start reporting. My early garbage reports taught me more than another month of labs would have. But do treat every rejection as a formatting problem first and a skill problem second. Nine times out of ten, the bug was real and the report was unclear. The skill was there. The communication was not.

Your first valid report will not be your best work. It will just be the first one a stranger understood. And that is the whole game: not finding bugs, but making bugs undeniable.

Keep hunting. Write it like they have three minutes. Because they do.
