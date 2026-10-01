# My home lab: how I practice hacking legally

Every beginner asks me the same question, usually within five minutes of hearing I do bug bounty: "so can you just hack any website?" The answer is no, obviously no, absolutely not, and the fact that the question gets asked so often is exactly why I am writing this article first.

You need somewhere to practice. Real skill comes from breaking real software, and you cannot do that on software you do not have permission to touch. So you build your own software to break. That is what a home lab is: a small collection of intentionally vulnerable machines running on your own laptop, where you are allowed to do everything, because it is all yours.

This is my setup, my routine, and the legal line you never cross.

## The legal line (read this before the fun part)

I am putting this first on purpose, because it is the most important section in this article and possibly on this entire site.

Hacking a system without permission is a crime. Not a gray area, not a "it depends", a crime. Belgium has computer crime laws, the EU has them, every country has them. "I was just testing" is not a defense. "I did not damage anything" is not a defense. "I was going to report it" is not a defense either, unless the target explicitly invited reports through a bug bounty program or a published responsible disclosure policy.

The rule I live by is simple: **if it is not mine and not in scope, I do not touch it.** My scope is:

1. My own lab VMs (everything below).
2. Bug bounty programs where I have accepted the scope, on platforms like YesWeHack where I hunt as MIHX01.
3. CTF competitions, which are explicitly built for this.

That is the complete list. There is no item 4. Random websites, the school network, a company's login page "just to see", none of it. Ever.

Beginners sometimes worry this limits their learning. It does the opposite. Constraints breed creativity, and the lab below will keep you busy for a year. Every technique in my recon workflow article, every Burp trick in the Burp article, all of it was first practiced against my own lab. When I moved to real programs, the skills transferred because the software behaves the same. Vulnerable is vulnerable.

One more thing: keep records of your permission. For bounty programs, the program page and your acceptance of the scope is your proof. Screenshots cost nothing and save everything.

## The setup

You do not need a server rack. You need a laptop with some RAM and free disk space.

**The hypervisor.** I use VirtualBox because it is free and it works. VMware Workstation Player is also free and also fine. Pick one and stop researching; the hypervisor is not where the learning happens. Give the host machine at least 8 GB of RAM total, because you will run two or three VMs at once and each wants 1 to 2 GB.

**The attacker VM.** Kali Linux, the standard. Download the prebuilt VirtualBox/VMware image from the Kali site instead of installing from ISO; it saves an hour and comes with the tools ready. First boot, run the updates, take a snapshot called "clean", and never be afraid to break things inside it. That is what the snapshot is for.

**The target VMs.** This is the actual lab. Mine, in the order I recommend:

1. **DVWA (Damn Vulnerable Web Application).** A single PHP app with every classic web bug, each with three difficulty levels. SQL injection, XSS (reflected, stored, DOM), file upload, command injection, CSRF, all of it. This is where I learned web hacking, full stop. Run it as a Docker container or a small Linux VM.
2. **OWASP Juice Shop.** A modern, deliberately broken web shop. It feels like a real app instead of a classroom exercise, which matters: real bugs hide in real-looking features. Great for practicing Burp against something with JavaScript and APIs.
3. **Metasploitable 2.** An old Ubuntu VM full of network-level vulnerabilities: ancient FTP, Telnet, weak Samba, the works. This is where you learn nmap, enumeration, and why unpatched services are terrifying.
4. **VulnHub VMs (Kioptrix series).** Downloadable VMs designed as mini-CTFs: boot it, find its IP, break in, grab the flag. Kioptrix 1 through 4 is a beautiful difficulty curve from "what is nmap" to "I chained three things".

All of these are free. The whole lab costs zero euros and a weekend of downloading.

## The network layout

This part is boring and it matters. In VirtualBox, I put the lab on a **host-only network** (vboxnet0, usually 192.168.56.0/24). Host-only means the VMs can talk to each other and to my laptop, but they cannot reach the internet and the internet cannot reach them.

Why: vulnerable VMs are *vulnerable*. Metasploitable 2 has remotely exploitable services from 2010. You do not want that on your home WiFi where your family's devices live, and you definitely do not want it bridged to the internet where someone else might find it before you do. Host-only keeps the blast radius at exactly your laptop.

Kali gets two adapters: NAT (for internet access, updates, downloading wordlists) and host-only (for attacking the lab). Targets get host-only only. This mirrors how a real engagement is segmented, and it teaches you to think about network boundaries from day one.

## A sample session

Here is what an evening in the lab actually looks like. Target: a fresh VulnHub VM, booted, IP unknown.

First, find it:

```bash
sudo arp-scan --localnet
```

or, if you prefer:

```bash
nmap -sn 192.168.56.0/24
```

One new IP appears. That is the target. Now the ritual, the one I run every single time:

```bash
nmap -sC -sV -oN scan-initial.txt 192.168.56.101
```

Service scan with default scripts, save the output to a file. Always save to a file; your memory is worse than you think and notes are searchable. If it is a web-heavy box, I add a full port sweep in the background while I start on the web ports:

```bash
nmap -p- --min-rate 5000 -oN scan-allports.txt 192.168.56.101
```

Then it is enumeration per service. Port 80 open? Start Burp, browse the site, read every page, check the page source, run gobuster against it:

```bash
gobuster dir -u http://192.168.56.101 -w /usr/share/wordlists/dirb/common.txt
```

Port 21 with anonymous FTP allowed? Log in, list files, download everything, read everything. Every file on a target is a potential clue. This discipline, enumerate *everything* before exploiting *anything*, is the single habit that separates people who root boxes from people who stare at nmap output.

When I find the way in, I exploit it, get the flag or the shell, and then I do the most valuable step: **I revert the VM to snapshot and do it again from memory.** The second run is where the learning locks in. The first run is discovery; the second run is skill.

## Snapshots are your time machine

Take snapshots aggressively. Before you start a box: snapshot. Before you try something destructive: snapshot. After you root it and want to practice the path again: revert.

This habit transfers directly to real work. In bug bounty you cannot revert the target, which is exactly why you practice destructive ideas in the lab first. Every payload I have ever sent to a real program was first sent to DVWA or Juice Shop, where breaking things is the point.

## My weekly routine

I treat the lab like training, not entertainment. Two or three evenings a week, 90 minutes each:

- **One box or one vulnerability class per session.** Not "hack around randomly". Tonight is SQL injection in DVWA at medium difficulty. Tomorrow is a Kioptrix box. Focus beats sprawl.
- **Notes for everything.** I keep a markdown file per box: the IP, the open ports, what I tried, what worked, what failed and why. My notes from lab boxes became the checklists I now use on real targets. The reading-reports article on this blog explains how I built those checklists; the lab is where they get tested.
- **Redo, do not just complete.** Finishing a box once proves you can follow a path. Rooting it three times from a clean snapshot proves you understand it. Understanding is the product. Flags are the receipt.

## What this built

Six months of this routine gave me: fluency with nmap and the core Linux tools, a working knowledge of every OWASP Top 10 bug from actually exploiting it (not reading about it), Burp muscle memory, and a notes library I still reference during hunts.

More importantly, it gave me confidence that is grounded in something real. When I look at a bug bounty target now, I am not guessing. I have broken the same software shapes a hundred times in the lab. The target is new; the patterns are old friends.

Build the lab. Keep it legal. Break everything inside it, twice. That is the whole secret, and it is free.
