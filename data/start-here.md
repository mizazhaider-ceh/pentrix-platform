# Start Here

Read this first. It tells you exactly where to begin on The PenTrix if you have never touched cybersecurity before, what to do on day one, and how your first month should look. No guessing, no wandering through menus.

## Who this is for

You if: you are a student (or about to be one), you are curious about hacking and security, and you have little or no technical background. You do not need to know how to code. You do not need a powerful computer. You need consistency and about an hour a day.

Not you if: you want to hack someone's Instagram account, you want a certificate in two weeks, or you want someone to hand you tools without explaining what they do. This platform will not help with any of that.

## Your first day

Concrete steps. Do all of these today.

1. **Set up your notes.** A simple notebook, a markdown file, anything you will actually open. Your notes become your personal playbook later. Your progress on the roadmaps is saved in this browser.
2. **Read this entire page.** It is short and it will save you weeks of confusion later.
3. **Install a virtual machine.** Download VirtualBox (free), then install Kali Linux or Parrot OS as a VM from the official ISO. Kali is the standard; Parrot is lighter if your laptop is old. The [Linux basics cheat sheet](/cheatsheets/linux-basics) covers your first commands once it is running. Your VM is your lab: you will break things in it, and that is the point. Never experiment on your main operating system.
4. **Learn five Linux commands:** `pwd`, `ls`, `cd`, `cat`, and `man`. Open a terminal in your new VM and actually run them. If this feels boring, good. Boring fundamentals are what everything else is built on.
5. **Set a daily habit:** one hour a day, same time, in your VM. Write down the time you picked. Consistency beats intensity.

Done for day one. Do not download more tools. Do not watch a 10 hour hacking course. Tomorrow you start the actual path.

## Your first week

One topic per day, roughly one hour each. Labs come first; reading comes after, to explain what you just did.

- **Day 1:** How the internet works. IP addresses, DNS, HTTP requests and responses. Lab: open your browser's developer tools and inspect a real request.
- **Day 2:** Basic networking. What a port is, what TCP and UDP are. Lab: run `nmap` against your own VM and see what is listening.
- **Day 3:** Linux essentials. Files, permissions, users, the package manager. Lab: navigate the filesystem, change permissions with `chmod`, read man pages.
- **Day 4:** Python basics, part 1. Variables, strings, loops. Write a script that reads a file and prints every line.
- **Day 5:** Python basics, part 2. Functions and requests. Write a script that fetches a web page and prints its title.
- **Day 6:** Your first intentionally vulnerable target. Install DVWA or OWASP Juice Shop locally and just click around it. Do not try to hack it yet. Get familiar.
- **Day 7:** Rest or review. Re-read your notes from the week. If anything is still unclear, redo that day's lab instead of moving on.

End of week one, you should be able to: use a terminal without fear, explain what happens when you type a URL into a browser, and write a small Python script. That is real progress. Most beginners skip all of this and pay for it later.

## Your first month

Weeks two through four build directly on week one. Roughly:

- **Week 2:** Web fundamentals in depth. HTML, how forms submit data, cookies and sessions, what the server trusts and should not trust. Lab: intercept your own traffic with Burp Suite Community (free) and read the requests.
- **Week 3:** Your first vulnerabilities, taught properly. SQL injection and cross site scripting on your local DVWA or Juice Shop, with the underlying cause explained for each one. One vulnerability fully understood beats five copied from a cheat sheet.
- **Week 4:** Your first mini project. Pick one: a Python port scanner, a writeup of three DVWA vulnerabilities you solved yourself, or a Burp Suite walkthrough of a Juice Shop challenge. Publish the writeup on your PenTrix profile. This is the start of your portfolio.

After month one you will know whether you love this field or not, based on evidence instead of hype. If you do, pick your path below.

## Pick your path

Each path is a sequenced roadmap on The PenTrix with labs at every step. Pick one and commit to it for at least three months before switching.

- **Web Pentesting to Bug Bounty.** For you if you want to find vulnerabilities in real websites and get paid for them. Web apps are the largest attack surface and the most accessible entry point for beginners.
- **Network Pentesting and Infrastructure.** For you if you like systems, servers, and networks. Heavier on Linux, networking protocols, and later Active Directory.
- **SOC Analyst Foundations.** For you if you want a salaried job fast. Blue team work: monitoring, log analysis, incident triage. The most hireable junior role right now.
- **DFIR (Digital Forensics and Incident Response).** For you if you are curious about what happened after an attack: disk forensics, memory analysis, malware triage. Methodical, detail heavy, fascinating.
- **CTF Player Path.** For you if you learn best by competing. Jeopardy style challenges across web, crypto, forensics, and reversing. Builds the sharpest problem solving skills and a public track record.
- **Mobile Security.** For you if phones interest you more than websites. Android internals, app reversing, mobile pentesting. A smaller field with less competition.

Not sure? Default to Web Pentesting to Bug Bounty. It has the most free resources, the clearest feedback loop (you either found the bug or you did not), and skills that transfer into every other path.

## Rules that will save you

1. **Labs before theory.** If a module has a lab, do the lab first and read the explanation after. Your hands learn faster than your eyes.
2. **Never test systems you do not own.** Your VMs, lab platforms, and bounty scopes only. No exceptions, no "just a quick look." One unauthorized test can end your career before it starts.
3. **One path at a time.** Switching paths every two weeks means you start over every two weeks. Commit for three months.
4. **Write everything down.** Notes, commands that worked, errors you hit, how you fixed them. Your notes become your personal playbook and later your interview material.
5. **Finish things.** A completed easy lab beats an abandoned hard one. Momentum is a resource; protect it.
6. **Ask when stuck for more than two hours.** Struggling builds skill, but spinning for a whole day builds nothing. Ask in the community, show what you tried, and learn from the answer.
7. **Fundamentals are not optional.** Skipping networking and Linux to get to "the hacking part" is why most beginners quit. The people who last are the ones who did the boring work.

That is everything you need to begin. Set up your notes, install the VM, and do day one today.
