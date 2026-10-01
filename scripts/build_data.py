#!/usr/bin/env python3
"""Build data/resources.json and data/roadmaps.json for The PenTrix platform.
Seed data: ~/workspace/pentrix-resource-catalog/resources.md (verified 2026-10-01).
Excludes the 2 catalog entries whose URL is 'unverified' (CSCB, NorthSec 2026).
"""
import json, os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(BASE, "data")

R = []  # resources

def r(id_, title, summary, url, domains, typ, level, cost):
    R.append({
        "id": id_, "title": title, "summary": summary, "url": url,
        "domains": domains, "type": typ, "level": level, "cost": cost,
        "language": "English", "lastVerified": "2026-10-01",
    })

FREE = {"model": "free"}
def FREEMIUM(price=None, note=None):
    c = {"model": "freemium"}
    if price: c["price"] = price
    if note: c["priceNote"] = note
    return c
def PAID(price=None, note=None):
    c = {"model": "paid"}
    if price: c["price"] = price
    if note: c["priceNote"] = note
    return c
UNVER = "unverified"

# ---------------- Cloud Security -> Cloud Security ----------------
r("hacktricks-cloud", "HackTricks Cloud",
  "An encyclopedic collection of cloud pentesting techniques for AWS, Azure, GCP, Kubernetes, and CI/CD. Actively maintained by the HackTricks wiki.",
  "https://github.com/hacktricks-wiki/hacktricks-cloud", ["Cloud Security"], "Cheatsheet", "Intermediate", FREE)
r("flaws-cloud", "flaws.cloud",
  "Scott Piper's classic six-level AWS misconfiguration CTF. Still the canonical first introduction to AWS security.",
  "http://flaws.cloud", ["Cloud Security"], "CTF Platform", "Beginner", FREE)
r("flaws2-cloud", "flaws2.cloud",
  "You play the same scenario twice: once as the attacker, once as the defender reading CloudTrail logs. Teaches exploitation and detection side by side.",
  "http://flaws2.cloud", ["Cloud Security"], "CTF Platform", "Intermediate", FREE)
r("hacking-the-cloud", "Hacking the Cloud",
  "Nick Frichette's encyclopedia of offensive cloud techniques with concrete commands you can run. A practical companion to the cloud CTFs.",
  "https://hackingthe.cloud", ["Cloud Security"], "Cheatsheet", "Beginner", FREE)
r("cloudgoat", "CloudGoat",
  "Rhino Security Labs' 'vulnerable by design' AWS deployment with around 20 Terraform scenarios, from IAM privilege escalation to EC2 SSRF through IMDS. Deploys vulnerable infrastructure you can practice on.",
  "https://github.com/RhinoSecurityLabs/cloudgoat", ["Cloud Security"], "Tool", "Intermediate", FREE)
r("prowler", "Prowler",
  "The most popular open-source multi-cloud security scanner, covering AWS, GCP, Azure, Kubernetes, and Microsoft 365 against CIS, NIST, and PCI-DSS benchmarks.",
  "https://github.com/prowler-cloud/prowler", ["Cloud Security"], "Tool", "Intermediate", FREE)
r("scoutsuite", "ScoutSuite",
  "NCC Group's read-only multi-cloud auditor. It enumerates your cloud and produces an interactive HTML report of misconfigurations.",
  "https://github.com/nccgroup/ScoutSuite", ["Cloud Security"], "Tool", "Intermediate", FREE)
r("pacu", "Pacu",
  "Described as the Metasploit of AWS: an open-source AWS exploitation framework for IAM privilege escalation, backdoors, and Lambda attacks.",
  "https://github.com/RhinoSecurityLabs/pacu", ["Cloud Security"], "Tool", "Intermediate", FREE)
r("stratus-red-team", "Stratus Red Team",
  "Datadog's granular cloud adversary emulation, described as Atomic Red Team for the cloud. Attack techniques are mapped to MITRE ATT&CK across AWS, Azure, GCP, Entra, and Kubernetes.",
  "https://github.com/DataDog/stratus-red-team", ["Cloud Security"], "Tool", "Intermediate", FREE)
r("aws-security-specialty", "AWS Certified Security - Specialty (SCS-C03)",
  "The industry-recognized AWS cloud security credential: 65 questions in 170 minutes.",
  "https://aws.amazon.com/certification/certified-security-specialty/", ["Cloud Security"], "Certification", "Advanced", PAID("~$300 USD"))
r("az-500-azure-security-engineer", "AZ-500 Microsoft Certified: Azure Security Engineer Associate",
  "The official Azure security credential. Note: 2026 Microsoft sources report AZ-500 is being retired and replaced by SC-500, so confirm its status on Microsoft Learn before booking.",
  "https://learn.microsoft.com/en-us/credentials/certifications/azure-security-engineer/", ["Cloud Security"], "Certification", "Intermediate", PAID("~$165 USD"))

# ---------------- AI / LLM Security -> AI Security ----------------
r("owasp-llm-top-10", "OWASP Top 10 for LLM Applications (2025)",
  "The canonical risk list for LLM apps, from prompt injection (LLM01) to unbounded consumption (LLM10), using the 2025 reorganization.",
  "https://genai.owasp.org/llm-top-10/", ["AI Security"], "Cheatsheet", "Beginner", FREE)
r("portswigger-llm-attacks", "PortSwigger Web LLM Attacks",
  "Eight free hands-on labs from the Burp makers covering excessive agency, LLM API exploitation, indirect prompt injection, insecure output handling, and AI agent abuse.",
  "https://portswigger.net/web-security/learning-paths/llm-attacks", ["AI Security"], "Interactive Lab", "Intermediate", FREE)
r("gandalf-lakera", "Gandalf by Lakera",
  "A prompt-injection game where you trick an AI defender into revealing secret passwords across increasingly hardened levels. An agentic variant exists too.",
  "https://gandalf.lakera.ai", ["AI Security"], "CTF Platform", "Beginner", FREE)
r("garak", "Garak",
  "NVIDIA's maintained LLM vulnerability scanner, a red-teaming and assessment toolkit for generative AI. Stable release 0.17.0 landed September 2026.",
  "https://github.com/NVIDIA/garak", ["AI Security"], "Tool", "Intermediate", FREE)
r("promptfoo", "Promptfoo",
  "Declarative YAML-based LLM red-teaming and evals with OWASP LLM Top 10 probes you can run in CI. Open-source under the MIT license.",
  "https://www.promptfoo.dev", ["AI Security"], "Tool", "Intermediate", FREE)
r("pyrit", "PyRIT",
  "Microsoft's Python Risk Identification Tool: an automation framework for red-teaming generative AI, used in Microsoft's own AI Red Team training.",
  "https://github.com/Azure/PyRIT", ["AI Security"], "Tool", "Intermediate", FREE)
r("simon-willison-prompt-injection", "Simon Willison's blog (prompt injection)",
  "The September 2022 post that coined the term 'prompt injection', with a helpful SQL-injection analogy. His 'lethal trifecta' piece is a good follow-up read.",
  "https://simonwillison.net/2022/Sep/12/prompt-injection/", ["AI Security"], "Blog", "Beginner", FREE)
r("owasp-ai-security-privacy-guide", "OWASP AI Security and Privacy Guide (AI Exchange)",
  "Over 200 pages of AI threats and controls aligned to international standards. An OWASP flagship project, now called AI Exchange.",
  "https://owasp.org/www-project-ai-security-and-privacy-guide/", ["AI Security"], "Cheatsheet", "Intermediate", FREE)
r("anthropic-many-shot-jailbreaking", "Anthropic Research - Many-Shot Jailbreaking",
  "Frontier-lab research on the classic long-context jailbreak technique, and a natural entry point into Anthropic's alignment and security research.",
  "https://www.anthropic.com/research/many-shot-jailbreaking", ["AI Security"], "Blog", "Intermediate", FREE)
r("deepmind-securing-ai-agents", "Google DeepMind - Securing the future of AI agents",
  "DeepMind's June 2026 AI control roadmap: defending internal systems against misaligned agents through monitoring coverage and red-team exercises.",
  "https://deepmind.google/blog/securing-the-future-of-ai-agents/", ["AI Security"], "Blog", "Intermediate", FREE)
r("lakera-llm-as-judge", "Lakera blog - 'Stop Letting Models Grade Their Own Homework'",
  "Vendor research arguing that LLM-as-judge setups fail at prompt-injection defense, and that guardrails need layering. Treat the vendor angle skeptically and validate the claims yourself.",
  "https://www.lakera.ai/blog/stop-letting-models-grade-their-own-homework-why-llm-as-a-judge-fails-at-prompt-injection-defense", ["AI Security"], "Blog", "Intermediate", FREE)
r("pluralsight-llm-prompt-injection", "Pluralsight - LLM Prompt Injection: Attacks and Defenses",
  "A one-hour, seven-minute course by Gavin Johnson-Lynn on securing LLM applications and testing them for weaknesses.",
  "https://www.pluralsight.com/courses/llm-prompt-injection-attacks-defenses", ["AI Security"], "Course", "Intermediate", PAID(note=UNVER))

# ---------------- Blue Team / SOC / DFIR -> Blue Team / SOC ----------------
r("letsdefend", "LetsDefend",
  "A simulated SOC with a real alert queue: phishing, malware, and network alerts in a Tier-1 triage workflow. Acquired by Hack The Box in September 2025.",
  "https://letsdefend.io", ["Blue Team / SOC"], "Interactive Lab", "Beginner", FREEMIUM())
r("blue-team-labs-online", "Blue Team Labs Online",
  "Over 250 DFIR and SOC investigations covering memory dumps, packet captures, and logs. The free BTJA pathway (about six to seven hours) is the standard starting lane.",
  "https://blueteamlabs.online", ["Blue Team / SOC"], "Interactive Lab", "Beginner", FREEMIUM())
r("cyberdefenders", "CyberDefenders",
  "Dozens of free artifact-based blue-team CTFs in DFIR, threat hunting, and malware analysis. You get real artifacts and investigative questions to work through.",
  "https://cyberdefenders.org", ["Blue Team / SOC"], "CTF Platform", "Intermediate", FREEMIUM())
r("security-blue-team-btl1", "Security Blue Team - BTL1",
  "Often called the OSCP of blue team: a 24-hour hands-on lab exam covering phishing, forensics, threat intelligence, SIEM, and incident response, with one free resit within 12 months.",
  "https://www.securityblue.team/certifications", ["Blue Team / SOC"], "Certification", "Beginner", PAID("~$495 USD / ~\u00a3399", UNVER))
r("security-blue-team-btl2", "Security Blue Team - BTL2",
  "Advanced security operations: malware analysis, threat hunting, vulnerability management, and advanced SIEM. A free demo course is available to preview it.",
  "https://www.securityblue.team/certifications", ["Blue Team / SOC"], "Certification", "Advanced", PAID("~\u00a31,999", UNVER))
r("mitre-attack", "MITRE ATT&CK",
  "The universal language of adversary behavior: 14 Enterprise tactics and their techniques and sub-techniques. Pair it with the ATT&CK Navigator for coverage mapping.",
  "https://attack.mitre.org/", ["Blue Team / SOC"], "Cheatsheet", "All Levels", FREE)
r("splunk-bots", "Splunk BOTS (Boss of the SOC)",
  "Splunk's official blue-team competition and the best free way to practice SPL on real attack data. The version 1 to 3 datasets are public.",
  "https://bots.splunk.com/", ["Blue Team / SOC"], "CTF Platform", "Beginner", FREE)
r("wazuh", "Wazuh",
  "The leading open-source SIEM plus XDR: manager, agents, rules engine, file integrity monitoring, vulnerability detection, and active response. The default homelab SOC stack.",
  "https://github.com/wazuh/wazuh", ["Blue Team / SOC"], "Tool", "Intermediate", FREE)
r("velociraptor", "Velociraptor",
  "Rapid7's open-source endpoint DFIR and hunting framework: fleet-wide VQL hunts and live evidence collection.",
  "https://github.com/Velocidex/velociraptor", ["Blue Team / SOC"], "Tool", "Intermediate", FREE)
r("sigma-rules", "Sigma rules repository",
  "Over 3,000 vendor-agnostic detection rules. Sigma does for logs what Snort does for network traffic and YARA does for files, and it is a core detection-as-code skill.",
  "https://github.com/SigmaHQ/sigma", ["Blue Team / SOC"], "Cheatsheet", "Intermediate", FREE)
r("john-hammond-youtube", "John Hammond (YouTube)",
  "Malware analysis, CTF and DFIR walkthroughs, and tool demos from a Principal Security Researcher at Huntress, with over 500,000 subscribers.",
  "https://youtube.com/@_JohnHammond", ["Blue Team / SOC"], "YouTube Channel", "Beginner", FREE)
r("sans-dfir-posters", "SANS DFIR Posters",
  "Free printable references: Hunt Evil, Windows Forensic Analysis, memory forensics, and intrusion discovery. Pin them above your desk.",
  "https://www.sans.org/posters/", ["Blue Team / SOC"], "Cheatsheet", "All Levels", FREE)
r("sans-internet-storm-center", "SANS Internet Storm Center",
  "Daily practitioner threat diaries from about 40 volunteer handlers, plus the StormCast daily podcast. A habit worth building early.",
  "https://isc.sans.edu/", ["Blue Team / SOC"], "Newsletter", "All Levels", FREE)
r("the-dfir-report", "The DFIR Report",
  "Real incident investigation write-ups with IOCs and ATT&CK mappings. Every report ships with Sigma rules you can use.",
  "https://thedfirreport.com/", ["Blue Team / SOC"], "Newsletter", "Intermediate", FREE)

# ---------------- OSINT -> OSINT ----------------
r("osint-framework", "OSINT Framework",
  "An interactive tree categorizing thousands of free OSINT tools by use case: usernames, email, domains, images, dark web. The recon cheat sheet of the field.",
  "https://osintframework.com", ["OSINT"], "Cheatsheet", "Beginner", FREE)
r("trace-labs-search-party", "Trace Labs Search Party CTF",
  "A nonprofit crowdsourced missing-persons OSINT CTF that works real cases for law enforcement, with up to four-person teams. The June 2026 global CTF was confirmed active.",
  "https://www.tracelabs.org/", ["OSINT"], "CTF Platform", "Beginner", FREE)
r("sherlock", "Sherlock",
  "The standard username hunter across more than 400 platforms, the usual first pass for mapping a handle's digital footprint.",
  "https://github.com/sherlock-project/sherlock", ["OSINT"], "Tool", "Intermediate", FREE)
r("whatsmyname", "WhatsMyName",
  "A web tool powered by a community-curated dataset of 700+ sites. No install needed, and it complements Sherlock well.",
  "https://whatsmyname.app", ["OSINT"], "Tool", "Beginner", FREE)
r("theharvester", "theHarvester",
  "The classic passive email, subdomain, and host harvester for a target domain, drawing on search engines, DNS, certificate transparency, and LinkedIn.",
  "https://github.com/laramies/theHarvester", ["OSINT"], "Tool", "Intermediate", FREE)
r("epieos", "Epieos",
  "Reverse email and phone lookup that reveals linked Google account data, registered services, and Maps reviews. One of the most-used email OSINT tools.",
  "https://epieos.com", ["OSINT"], "Tool", "Beginner", FREEMIUM())
r("osint-techniques-bazzell", "OSINT Techniques (Michael Bazzell)",
  "The definitive OSINT reference by a former FBI cyber-crimes task force investigator, updated almost yearly and used as a training manual by agencies.",
  "https://www.abebooks.com/9798366360401/OSINT-Techniques-Resources-Uncovering-Online/plp", ["OSINT"], "Book", "All Levels", PAID("~$40", UNVER))

# ---------------- Reverse Engineering & Malware Analysis ----------------
r("ghidra", "Ghidra",
  "The NSA's free multi-architecture disassembler and decompiler with a genuinely competitive decompiler. Runs on Windows, macOS, and Linux.",
  "https://github.com/nationalsecurityagency/ghidra/blob/HEAD/README.md", ["Reverse Engineering"], "Tool", "Beginner", FREE)
r("ida-free", "IDA Free",
  "The industry-standard disassembler. The free edition now bundles a cloud decompiler for students.",
  "https://hex-rays.com/ida-pro", ["Reverse Engineering"], "Tool", "Beginner", FREEMIUM("\u20ac365/yr\u2013\u20ac8,599", UNVER))
r("x64dbg", "x64dbg",
  "The best free open-source debugger for Windows malware, and an intuitive dynamic-analysis complement to Ghidra.",
  "https://github.com/x64dbg/x64dbg/blob/HEAD/README.md", ["Reverse Engineering"], "Tool", "Beginner", FREE)
r("binary-ninja", "Binary Ninja",
  "Fast IL-based analysis with a modern API. A free in-browser version lets students try the decompiler on small binaries immediately.",
  "https://binary.ninja/2020/05/11/decompiler-stable-release.html", ["Reverse Engineering"], "Tool", "Intermediate",
  PAID("Non-Commercial $299 / Commercial $1,199; 75% student discount ($74/$299); free in-browser version for small binaries"))
r("cutter", "Cutter",
  "A friendly Qt GUI over rizin and radare2 that lowers the CLI learning curve for static analysis.",
  "https://github.com/rizinorg/cutter/blob/HEAD/README.md", ["Reverse Engineering"], "Tool", "Beginner", FREE)
r("detect-it-easy", "Detect It Easy (DIE)",
  "Identifies packers, compilers, and protectors in seconds. The first step before unpacking any sample.",
  "https://github.com/horsicq/detect-it-easy/blob/HEAD/README.md", ["Reverse Engineering"], "Tool", "Beginner", FREE)
r("practical-malware-analysis", "Practical Malware Analysis (Sikorski & Honig, No Starch, 2012, 800 pp)",
  "The field's standard hands-on textbook; its lab exercises map directly to a reverse-engineering course syllabus.",
  "https://nostarch.com/malware", ["Malware Analysis"], "Book", "Beginner", PAID("List $59.95; used from ~$32.80"))
r("practical-binary-analysis", "Practical Binary Analysis (Dennis Andriesse, No Starch, 2018, 456 pp)",
  "Practical modern binary-analysis techniques with an ELF focus: the natural sequel to Practical Malware Analysis.",
  "https://www.ieee-security.org/Cipher/BookReviews/2019/Andriesse_by_dietrich.html", ["Reverse Engineering"], "Book", "Intermediate", PAID("~$52.58 new"))
r("tcm-malware-analysis-triage", "TCM Security: Practical Malware Analysis & Triage",
  "A structured video course by Matt Kiely (HuskyHacks) with labs. The cheapest structured paid malware-analysis training path.",
  "https://tcm-sec.com/academy/practical-malware-analysis-triage/?affcode=770707_rabu644a", ["Malware Analysis"], "Course", "Beginner", PAID("$29.99/month All-Access; PMRP cert $499"))
r("0ffset-training", "0ffset Training (formerly Zero2Automated)",
  "One-time-payment malware-analysis courses with a certification included. Good value compared to subscriptions.",
  "https://www.0ffset.net/training/zero2auto/", ["Malware Analysis"], "Course", "Beginner", PAID("Standard \u00a3149.99 one-time; Ultimate Bundle \u00a3185.99, includes certification"))
r("oalabs", "OALABS",
  "Free practical malware-analysis walkthroughs on unpacking and config extraction, with a companion research wiki.",
  "https://www.youtube.com/@OALabs", ["Malware Analysis"], "YouTube Channel", "Beginner", FREE)
r("malware-analysis-for-hedgehogs", "MalwareAnalysisForHedgehogs",
  "Gentle, practical analysis videos, ideal for a student's very first malware sample.",
  "https://www.youtube.com/@MalwareAnalysisForHedgehogs", ["Malware Analysis"], "YouTube Channel", "Beginner", FREE)
r("crackmes-one", "crackmes.one",
  "A huge free archive of graded reverse-engineering challenges. The perfect practice library for RE.",
  "https://crackmes.one", ["Reverse Engineering"], "CTF Platform", "Beginner", FREE)
r("flare-on", "Flare-On (Mandiant / Google)",
  "The annual flagship RE CTF from Mandiant, with excellent public writeups. A benchmark challenge set for serious students.",
  "https://github.com/alexandrubunea/the-flare-on-challenge-writeups", ["Malware Analysis"], "CTF Platform", "Intermediate", FREE)

# ---------------- Digital Forensics -> Forensics ----------------
r("autopsy", "Autopsy",
  "The standard free forensic suite: a GUI over the Sleuth Kit used by law enforcement, with timelines, keyword search, and carving built in.",
  "https://www.sleuthkit.org/autopsy/", ["Forensics"], "Tool", "Beginner", FREE)
r("sleuth-kit", "The Sleuth Kit (TSK)",
  "The core CLI toolkit: fls, mmls, fsstat, icat. Learning it teaches the actual forensic primitives behind Autopsy.",
  "https://www.sleuthkit.org", ["Forensics"], "Tool", "Intermediate", FREE)
r("eric-zimmerman-ez-tools", "Eric Zimmerman's EZ Tools",
  "The global standard for Windows artifact parsing: MFT, prefetch, registry, shellbags. Single-author tools used worldwide.",
  "https://ericzimmerman.github.io/", ["Forensics"], "Tool", "Intermediate", FREE)
r("kape", "KAPE (Kroll Artifact Parser & Extractor)",
  "The standard for rapid Windows triage: it collects and parses artifacts in minutes.",
  "https://www.kroll.com/en/services/cyber-risk/incident-response-litigation-support/kroll-artifact-parser-extractor-kape",
  ["Forensics"], "Tool", "Beginner", FREEMIUM(note="Free for students, law enforcement, and researchers; commercial engagements require a license"))
r("13cubed", "13Cubed (Richard Davis)",
  "The best free Windows DFIR video courses, including a 12-part Memory Forensics and a 22-part Windows Forensics playlist.",
  "https://www.youtube.com/@13Cubed", ["Forensics"], "YouTube Channel", "Beginner", FREE)
r("dfirscience", "DFIRScience",
  "Clear DFIR workflow walkthroughs, from evidence to timeline.",
  "https://www.youtube.com/@DFIRScience", ["Forensics"], "YouTube Channel", "Beginner", FREE)
r("the-dfir-report-youtube", "The DFIR Report (YouTube)",
  "Real-intrusion case walkthroughs showing how actual incident response teams investigate.",
  "https://www.youtube.com/@TheDFIRReport", ["Forensics"], "YouTube Channel", "Intermediate", FREE)
r("sans-dfir-youtube", "SANS DFIR",
  "Free SANS summit talks and a DFIR resource hub from the industry's top training body.",
  "https://www.youtube.com/@SANSForensics", ["Forensics"], "YouTube Channel", "Intermediate", FREE)
r("memlabs", "MemLabs",
  "A dedicated memory-forensics CTF set that pairs perfectly with Volatility 3.",
  "https://github.com/stuxnet999/MemLabs", ["Forensics"], "CTF Platform", "Intermediate", FREE)
r("file-system-forensic-analysis", "File System Forensic Analysis (Brian Carrier, Addison-Wesley, 2005, 600 pp)",
  "The definitive reference on file-system internals, written by the author of the Sleuth Kit.",
  "https://www.amazon.com/dp/0321268172", ["Forensics"], "Book", "Advanced", PAID("~$30.97\u2013$35.16"))
r("volatility-3", "Volatility 3",
  "The standard memory-forensics framework, rewritten for modern memory formats.",
  "https://github.com/volatilityfoundation/volatility3/blob/HEAD/README.md", ["Forensics"], "Tool", "Intermediate", FREE)

# ---------------- Cryptography -> Cryptography ----------------
r("cryptohack", "CryptoHack",
  "Twelve categories and five structured courses: the best hands-on introduction to attacking real cryptography.",
  "https://cryptohack.org", ["Cryptography"], "CTF Platform", "Beginner", FREE)
r("cryptopals", "Cryptopals (Matasano)",
  "Forty-eight exercises built from real-world crypto failures. The classic crypto programmer's workout.",
  "https://cryptopals.com", ["Cryptography"], "CTF Platform", "Beginner", FREE)
r("cryptopals-guided-tour", "CryptoPals Guided Tour (Eli Sohl)",
  "Challenge-by-challenge video walkthroughs of Cryptopals, for when you get stuck.",
  "https://www.youtube.com/@EliSohl", ["Cryptography"], "YouTube Channel", "Beginner", FREE)
r("cryptography-i-dan-boneh", "Cryptography I (Dan Boneh, Stanford / Coursera)",
  "The rigorous university crypto course, from number theory to zero knowledge, with a free graduate textbook alongside it.",
  "https://www.coursera.org/learn/crypto", ["Cryptography"], "Course", "Advanced", FREE)
r("serious-cryptography", "Serious Cryptography (Jean-Philippe Aumasson, No Starch, 2nd ed. 2024)",
  "Modern, practical crypto engineering (TLS, post-quantum, zero knowledge) by an applied cryptographer. The 2nd edition is current.",
  "https://www.alibris.com/Serious-Cryptography-2nd-Edition-A-Practical-Introduction-to-Modern-Encryption-Jean-Philippe-Aumasson/book/54866481?svs=1",
  ["Cryptography"], "Book", "Intermediate", PAID("2nd ed. new from $39.52; 1st ed. paperback $49.99"))
r("understanding-cryptography", "Understanding Cryptography (Christof Paar & Jan Pelzl)",
  "The applied crypto textbook that explains the math step by step with minimal prerequisites, plus about 24 free lectures on YouTube.",
  "https://www.crypto-textbook.com", ["Cryptography"], "Book", "Beginner", PAID(note=UNVER))
r("cyberchef", "CyberChef",
  "The 'cyber Swiss Army knife' from GCHQ. Runs fully in the browser and is indispensable for CTF crypto and encoding work.",
  "https://gchq.github.io/CyberChef/", ["Cryptography"], "Tool", "Beginner", FREE)
r("handbook-of-applied-cryptography", "Handbook of Applied Cryptography",
  "The free encyclopedic crypto reference. It deepens any topic the courses touch lightly.",
  "https://cacr.uwaterloo.ca/hac/", ["Cryptography"], "Book", "Advanced", FREE)
r("picoctf-crypto", "PicoCTF (CMU) - Crypto Category",
  "A year-round free CTF with a crypto category. Note: 2026 reports suggest picoCTF is folding into the CyLab Security Academy, so verify before linking.",
  "https://picoctf.org/", ["Cryptography"], "CTF Platform", "Beginner", FREE)

# ---------------- Binary Exploitation / Pwn -> Binary Exploitation ----------------
r("pwn-college", "pwn.college",
  "A fully modular pwn and RE curriculum from first principles, from Arizona State University. The closest thing to a free degree module in exploitation.",
  "https://pwn.college", ["Binary Exploitation"], "Interactive Lab", "Beginner", FREE)
r("nightmare", "Nightmare (guyinatuxedo)",
  "Over 90 binary-exploitation challenges with documented writeups, all solvable with open-source tools.",
  "https://guyinatuxedo.github.io/", ["Binary Exploitation"], "Course", "Beginner", FREE)
r("rop-emporium", "ROP Emporium",
  "A focused ROP practice ladder from 32-bit to 64-bit. The standard ROP drill set.",
  "https://ropemporium.com/", ["Binary Exploitation"], "CTF Platform", "Intermediate", FREE)
r("mbe", "MBE - Modern Binary Exploitation (RPISEC)",
  "University course materials with VM labs covering modern exploitation end to end.",
  "https://github.com/RPISEC/MBE", ["Binary Exploitation"], "Course", "Intermediate", FREE)
r("exploit-education", "exploit.education",
  "The classic exploit-development VMs (Protostar, Phoenix, Nebula) teaching primitives step by step.",
  "https://exploit.education", ["Binary Exploitation"], "Interactive Lab", "Beginner", FREE)
r("liveoverflow", "LiveOverflow",
  "The best binary-exploitation theory series on YouTube. Builds the 'why' behind each technique.",
  "https://www.youtube.com/@LiveOverflow", ["Binary Exploitation"], "YouTube Channel", "Beginner", FREE)
r("pwnable-kr", "pwnable.kr",
  "The classic pwn wargame, graded from a baby's first stack overflow upward.",
  "http://pwnable.kr", ["Binary Exploitation"], "CTF Platform", "Beginner", FREE)
r("hacking-art-of-exploitation", "Hacking: The Art of Exploitation (Jon Erickson, No Starch 2nd ed. 2008, 488 pp)",
  "The beloved hands-on exploit primer with its own liveCD lab environment. Unbeatable value used.",
  "https://www.abebooks.co.uk/9781593270070/Hacking-Art-Exploitation-Jon-Erickson-1593270070/plp", ["Binary Exploitation"], "Book", "Beginner", PAID("used from \u00a33.80"))
r("corelan-tutorials", "Corelan exploit-writing tutorials",
  "The classic Windows exploit-writing tutorial series that every exploit developer has read.",
  "https://www.corelan.be/index.php/articles/", ["Binary Exploitation"], "Course", "Intermediate", FREE)
r("azeria-labs", "Azeria Labs",
  "The standard ARM assembly and ARM exploitation reference. Fills the non-x86 gap.",
  "https://azeria-labs.com/", ["Binary Exploitation"], "Reference", "Beginner", FREE)
r("gef", "GEF (GDB Enhanced Features)",
  "Makes GDB usable for exploit development: ROP search, heap inspection, context display. The pwn.college workflow standard.",
  "https://github.com/hugsy/gef", ["Binary Exploitation"], "Tool", "Beginner", FREE)

# ---------------- Web Security -> Web Security ----------------
r("portswigger-web-security-academy", "PortSwigger Web Security Academy",
  "Free labs built by the Burp Suite makers. The single best hands-on way to learn web security from first principles.",
  "https://portswigger.net/web-security", ["Web Security"], "Interactive Lab", "Beginner", FREE)
r("burp-suite", "Burp Suite",
  "The industry-standard web proxy. The Community edition is free, and it carries most learners through the Academy labs.",
  "https://portswigger.net/burp/releases", ["Web Security"], "Tool", "Beginner", FREEMIUM("Community free; Pro $449/yr"))
r("caido", "Caido",
  "A fast, modern Burp alternative with AI plugins.",
  "https://caido.io", ["Web Security"], "Tool", "Intermediate", FREEMIUM(note=UNVER))
r("owasp-zap", "OWASP ZAP",
  "The free open-source scanner from OWASP. An ideal first DAST tool.",
  "https://www.zaproxy.org", ["Web Security"], "Tool", "Beginner", FREE)
r("nuclei", "Nuclei",
  "A template-based vulnerability scanner with a huge community template library.",
  "https://github.com/projectdiscovery/nuclei", ["Web Security"], "Tool", "Intermediate", FREE)
r("owasp-juice-shop", "OWASP Juice Shop",
  "OWASP's flagship modern vulnerable application (MIT license): a realistic shop to practice real vulnerabilities in.",
  "https://github.com/juice-shop/juice-shop", ["Web Security"], "Interactive Lab", "Beginner", FREE)
r("dvwa", "DVWA",
  "The classic deliberately vulnerable PHP app with difficulty levels. The quickest local XSS and SQLi practice.",
  "https://github.com/digininja/DVWA", ["Web Security"], "Interactive Lab", "Beginner", FREE)
r("owasp-webgoat", "OWASP WebGoat",
  "OWASP's insecure Java app with guided lessons per vulnerability class.",
  "https://github.com/WebGoat/WebGoat", ["Web Security"], "Interactive Lab", "Beginner", FREE)
r("owasp-top-10", "OWASP Top 10",
  "The industry-standard web risk list. The 2025 edition is current.",
  "https://github.com/owasp/top10/blob/HEAD/README.md", ["Web Security"], "Cheatsheet", "Beginner", FREE)
r("hacktricks", "HackTricks",
  "A massive pentest and CTF methodology wiki, actively maintained.",
  "https://github.com/hacktricks-wiki/hacktricks", ["Web Security"], "Cheatsheet", "Intermediate", FREE)
r("payloadsallthethings", "PayloadsAllTheThings",
  "The biggest payload and bypass collection per vulnerability class. You will open this daily.",
  "https://github.com/swisskyrepo/PayloadsAllTheThings", ["Web Security"], "Cheatsheet", "Intermediate", FREE)
r("portswigger-xss-cheat-sheet", "PortSwigger XSS Cheat Sheet",
  "The 2026-edition filter-evasion vectors, tested against real browsers. Pairs with the Academy labs.",
  "https://portswigger.net/web-security/cross-site-scripting/cheat-sheet", ["Web Security"], "Cheatsheet", "Intermediate", FREE)
r("pentesterlab", "PentesterLab",
  "Over 700 hands-on labs and 700+ videos with badges. The best structured web-hacking progression.",
  "https://pentesterlab.com/pro", ["Web Security"], "Interactive Lab", "Beginner", PAID("Pro $19.99/mo or $199.99/yr; free bootcamp"))
r("tryhackme", "TryHackMe",
  "Gamified, beginner-friendly rooms. The free tier includes one hour a day of AttackBox.",
  "https://tryhackme.com", ["Web Security"], "Interactive Lab", "Beginner", FREEMIUM("~$17\u201318/mo or ~$126\u2013134/yr", UNVER))
r("hackthebox", "HackTheBox",
  "The flagship hacking lab platform. Retired machines pair perfectly with IppSec walkthroughs.",
  "https://www.hackthebox.com/", ["Web Security"], "CTF Platform", "Intermediate", PAID("VIP+ $25/mo or $223/yr (plans vary)"))
r("ippsec", "IppSec",
  "Over 250 retired HTB machine walkthroughs that teach methodology, not just flags.",
  "https://www.youtube.com/@ippsec", ["Web Security"], "YouTube Channel", "Intermediate", FREE)
r("stok", "ST\u00d6K",
  "Bug bounty methodology and mindset from a multi-award hunter (Uber, Salesforce, US DoD).",
  "https://www.youtube.com/c/STOKfredrik", ["Web Security"], "YouTube Channel", "Intermediate", FREE)
r("web-application-hackers-handbook", "The Web Application Hacker's Handbook",
  "The web application security bible by Burp's creator. From 2011, but its fundamentals still hold.",
  "https://www.thenile.co.nz/books/dafydd-stuttard/the-web-application-hackers-handbook/9781118026472", ["Web Security"], "Book", "Intermediate", PAID("$79.20 NZD paperback"))
r("real-world-bug-hunting", "Real-World Bug Hunting",
  "Real rewarded bug-bounty case studies from Twitter, Facebook, Google, and Uber. Learn from findings that actually got paid.",
  "https://www.bestbookstore.ca/products/real-world-bug-hunting-paperback-by-peter-yaworski", ["Web Security"], "Book", "Intermediate", PAID("$59.39 CAD paperback"))

# ---------------- Network Security -> Network Security ----------------
r("nmap", "Nmap",
  "The network scanner everything else builds on. Essential for discovery and enumeration.",
  "https://nmap.org", ["Network Security"], "Tool", "Beginner", FREE)
r("wireshark", "Wireshark",
  "The protocol analyzer (GPLv2), shipping TShark for CLI capture and analysis.",
  "https://www.wireshark.org", ["Network Security"], "Tool", "Beginner", FREE)
r("metasploit-framework", "Metasploit Framework",
  "Rapid7's open-source exploitation framework, preinstalled on Kali.",
  "https://github.com/rapid7/metasploit-framework", ["Network Security"], "Tool", "Intermediate", FREE)
r("responder", "Responder",
  "An LLMNR, NBT-NS, and mDNS poisoner that captures NTLMv2 hashes. An Active Directory pentest staple.",
  "https://github.com/lgandx/Responder", ["Network Security"], "Tool", "Intermediate", FREE)
r("bloodhound", "BloodHound",
  "Graph-based Active Directory attack-path mapping by SpecterOps. Shows the paths attackers actually take.",
  "https://github.com/SpecterOps/BloodHound", ["Network Security"], "Tool", "Intermediate", FREEMIUM("Community Edition free; Enterprise paid"))
r("impacket", "Impacket",
  "Python classes for network protocols (SMB1-3, MSRPC, NTLM, Kerberos), maintained by Fortra.",
  "https://github.com/fortra/impacket", ["Network Security"], "Tool", "Intermediate", FREE)
r("seclists", "SecLists",
  "The canonical wordlist collection for fuzzing and content discovery.",
  "https://github.com/danielmiessler/SecLists", ["Network Security"], "Cheatsheet", "Beginner", FREE)
r("gtfobins", "GTFOBins",
  "A reference of Unix binaries usable for privilege escalation and bypass.",
  "https://github.com/GTFOBins/GTFOBins.github.io", ["Network Security"], "Cheatsheet", "Intermediate", FREE)
r("lolbas", "LOLBAS",
  "The Windows living-off-the-land binaries reference for post-exploitation.",
  "https://github.com/LOLBAS-Project/LOLBAS", ["Network Security"], "Cheatsheet", "Intermediate", FREE)
r("metasploit-unleashed", "Metasploit Unleashed",
  "OffSec's free Metasploit course with no registration. The official starting point.",
  "https://www.offsec.com/metasploit-unleashed/", ["Network Security"], "Course", "Beginner", FREE)
r("nmap-network-scanning", "Nmap Network Scanning",
  "Written by Nmap's author, Fyodor. The 9th edition (August 2025) is current, and more than half the book is free at nmap.org/book.",
  "https://www.amazon.com/dp/B0FP1SXZV3", ["Network Security"], "Book", "Intermediate", PAID("$49.95 publisher price"))
r("tcm-practical-ethical-hacking", "TCM Security Practical Ethical Hacking",
  "A full beginner-to-pentester video course covering networking, Active Directory, and web basics.",
  "https://tcm-sec.com/academy/practical-ethical-hacking/", ["Network Security"], "Course", "Beginner", PAID("From $29.99/mo (All-Access)"))
r("darknet-diaries", "Darknet Diaries",
  "Narrative real-hack stories by Jack Rhysider. Builds security intuition better than any textbook.",
  "https://darknetdiaries.com", ["Network Security"], "Podcast", "All Levels", FREE)

# ---------------- Networking Fundamentals -> Networking Fundamentals ----------------
r("professor-messer-network-plus", "Professor Messer Network+",
  "A free exam-mapped video course for the current N10-009 Network+ cycle.",
  "https://www.professormesser.com/get-n10-009-network-plus-certified/", ["Networking Fundamentals"], "Course", "Beginner", FREEMIUM(note="Free videos; paid study notes and practice exams"))
r("jeremys-it-lab-ccna", "Jeremy's IT Lab CCNA",
  "A complete free CCNA 200-301 video course with free flashcards and labs.",
  "https://www.youtube.com/playlist?list=PLxbwE86jKRgMpuZuLBivzlM8s2Dk5lXBQ", ["Networking Fundamentals"], "Course", "Beginner", FREE)
r("cisco-networking-academy", "Cisco Networking Academy",
  "Cisco's own free courses (Networking Basics at 22 hours, Ethical Hacker at 70 hours) with digital badges.",
  "https://www.netacad.com/courses/networking-basics", ["Networking Fundamentals"], "Course", "Beginner", FREE)
r("cisco-packet-tracer", "Cisco Packet Tracer",
  "Cisco's network simulator. Sufficient for all CCNA-level practice.",
  "https://www.netacad.com/courses/packet-tracer", ["Networking Fundamentals"], "Tool", "Beginner", FREE)
r("gns3", "GNS3",
  "An open-source emulator running real device images, with an 800K+ community. No hardware needed.",
  "https://gns3.com/", ["Networking Fundamentals"], "Tool", "Intermediate", FREE)
r("subnettingpractice", "SubnettingPractice.com",
  "Free interactive subnetting drills. Subnetting is free marks on exams.",
  "https://subnettingpractice.com/", ["Networking Fundamentals"], "Interactive Lab", "Beginner", FREE)
r("freecodecamp-networking", "freeCodeCamp Computer Networking Full Course",
  "A compact 1.5-hour full networking course: OSI, TCP/IP, HTTP, DNS, TLS.",
  "https://www.youtube.com/watch?v=qiQR5rTSshw", ["Networking Fundamentals"], "Course", "Beginner", FREE)
r("networkchuck", "NetworkChuck",
  "Entertaining, practical networking and IT certification content, with a network fundamentals playlist.",
  "https://youtube.com/@NetworkChuck", ["Networking Fundamentals"], "YouTube Channel", "Beginner", FREE)
r("chris-greer", "Chris Greer (Practical Networking)",
  "Wireshark and TCP/IP packet analysis made approachable, with 140K+ subscribers.",
  "https://www.youtube.com/c/@chrisgreer/", ["Networking Fundamentals"], "YouTube Channel", "Beginner", FREE)
r("networklessons", "NetworkLessons.com",
  "820 lessons and 100+ hours of video for CCNA, CCNP, and CCIE, with a $1 seven-day trial.",
  "http://networklessons.com/pricing", ["Networking Fundamentals"], "Course", "Beginner", PAID("$39/mo or $390/yr"))
r("tcp-ip-illustrated-vol-1", "TCP/IP Illustrated, Vol 1",
  "The definitive protocol reference, endorsed by Vint Cerf.",
  "https://www.amazon.ie/TCP-IP-Illustrated-Protocols-1/dp/0321336313", ["Networking Fundamentals"], "Book", "Intermediate", PAID("\u00a351.99 hardback"))
r("computer-networking-top-down", "Computer Networking: A Top-Down Approach",
  "The standard university networking textbook. The 9th edition (2025) covers HTTP/3, QUIC, Wi-Fi 6, and 5G.",
  "https://gaia.cs.umass.edu/kurose_ross/index.php", ["Networking Fundamentals"], "Book", "Beginner", PAID(note=UNVER))

# ---------------- Certifications -> Career ----------------
r("comptia-security-plus", "CompTIA Security+ (SY0-701)",
  "The baseline certification that still opens doors. Every employer recognizes it, and it teaches core security vocabulary.",
  "https://www.comptia.org", ["Career"], "Certification", "Beginner", PAID(note=UNVER))
r("ceh-v13", "EC-Council CEH v13",
  "Heavy on theory and tool names. Useful when a job posting or HR filter asks for it by name.",
  "https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/", ["Career"], "Certification", "Beginner", PAID(note=UNVER))
r("ine-ejpt", "INE eJPT",
  "A 48-hour practical lab exam with one free retake. A friendly first hands-on pentest cert before harder ones, and the 2026 update adds web app testing, recon, and offensive AI.",
  "https://ine.com/security/certifications/ejpt-certification", ["Career"], "Certification", "Beginner", PAID(note=UNVER))
r("ine-ecppt", "INE eCPPT",
  "A 24-hour practical exam that tests real pentest methodology. A solid step up from eJPT.",
  "https://ine.com/security/certifications/ecppt-certification", ["Career"], "Certification", "Intermediate", PAID(note=UNVER))
r("tcm-pjpt", "TCM Security PJPT",
  "The exam spans two days plus two for the report, the certification never expires, and training is included in the price. Confirmed on the official TCM FAQ, October 2026.",
  "https://certifications.tcm-sec.com/PJPT/", ["Career"], "Certification", "Beginner",
  PAID("$249 (includes 12 months of Practical Ethical Hacking course access)"))
r("tcm-pnpt", "TCM Security PNPT",
  "A five-day practical network pentest plus a live debrief. One of the best-value professional certs, and it never expires.",
  "https://certifications.tcm-sec.com/pnpt/", ["Career"], "Certification", "Intermediate", PAID(note=UNVER))
r("oscp-pen-200", "OffSec OSCP (PEN-200)",
  "The gold standard pentest certification. The brutal 24-hour exam teaches real persistence and enumeration.",
  "https://www.offsec.com/courses/pen-200/", ["Career"], "Certification", "Intermediate", PAID(note=UNVER))
r("isc2-cissp", "ISC2 CISSP",
  "The most asked-for security certification on senior job postings. Proves breadth across security domains, not just hacking.",
  "https://www.isc2.org", ["Career"], "Certification", "Advanced", PAID(note=UNVER))
r("comptia-pentest-plus", "CompTIA PenTest+ (PT0-003)",
  "A good structured path between Security+ and OSCP, covering pentest planning, tools, and reporting.",
  "https://www.comptia.org/certifications/pentest", ["Career"], "Certification", "Intermediate", PAID(note=UNVER))
r("zero-point-security-crto", "Zero-Point Security CRTO",
  "A 48-hour red-team ops exam built around Cobalt Strike. The respected certification for real-world operator tradecraft.",
  "https://training.zeropointsecurity.co.uk/courses/red-team-ops", ["Career"], "Certification", "Advanced", PAID(note=UNVER))
r("giac-gsec", "GIAC GSEC",
  "Vendor-neutral security fundamentals with hands-on CyberLive questions, valid four years and widely respected.",
  "https://www.giac.org", ["Career"], "Certification", "Intermediate", PAID(note=UNVER))
r("htb-cpts", "HTB CPTS (Certified Penetration Testing Specialist)",
  "Rapidly gaining industry respect. An exam-based certification from the HTB Academy track.",
  "https://academy.hackthebox.com/preview/certifications/htb-certified-penetration-testing-specialist", ["Career"], "Certification", "Intermediate", PAID(note=UNVER))

# ---------------- Mobile Security -> Mobile Security ----------------
r("owasp-masvs", "OWASP MASVS",
  "The industry standard for mobile app security requirements, organized into clear control groups from storage to privacy.",
  "https://mas.owasp.org/MASVS/", ["Mobile Security"], "Standard", "All Levels", FREE)
r("mobsf", "MobSF",
  "Static plus dynamic analysis for Android, iOS, and Windows apps in one automated, regularly updated framework.",
  "https://github.com/MobSF", ["Mobile Security"], "Tool", "Intermediate", FREE)
r("diva-android", "DIVA Android",
  "Thirteen deliberately vulnerable challenges that teach Android insecurity basics step by step.",
  "https://github.com/payatu/diva-android", ["Mobile Security"], "Interactive Lab", "Beginner", FREE)
r("insecurebankv2", "InsecureBankv2",
  "A realistic vulnerable banking app with about 25 vulnerability classes and a Python backend to attack end to end.",
  "https://github.com/dineshshetty/Android-InsecureBankv2", ["Mobile Security"], "Interactive Lab", "Intermediate", FREE)
r("owasp-mas-crackmes", "OWASP MAS Crackmes",
  "Android and iOS reverse-engineering challenges straight from OWASP's mobile security team.",
  "https://github.com/OWASP/mas-crackmes", ["Mobile Security"], "Interactive Lab", "Intermediate", FREE)
r("frida", "Frida",
  "Dynamic instrumentation for mobile and desktop. Inject JavaScript into running apps for hooking and bypasses.",
  "https://frida.re/", ["Mobile Security"], "Tool", "Intermediate", FREE)
r("objection", "Objection",
  "A Frida-powered runtime exploration toolkit. The fastest way to bypass SSL pinning and poke at app behavior.",
  "https://github.com/sensepost/objection/blob/HEAD/README.md", ["Mobile Security"], "Tool", "Intermediate", FREE)
r("jadx", "jadx",
  "The standard Dex-to-Java decompiler for turning Android APKs back into readable code.",
  "https://github.com/skylot/jadx/blob/HEAD/README.md", ["Mobile Security"], "Tool", "Beginner", FREE)

# ---------------- DevSecOps -> DevSecOps ----------------
r("semgrep", "Semgrep",
  "Fast static analysis across 30+ languages with thousands of rules. Easy to drop into any CI pipeline.",
  "https://semgrep.dev/", ["DevSecOps"], "Tool", "Beginner", FREE)
r("trivy", "Trivy",
  "One scanner for vulnerabilities, misconfigurations, and secrets across containers, infrastructure as code, and SBOMs.",
  "https://aquasecurity.github.io/trivy/", ["DevSecOps"], "Tool", "Beginner", FREE)
r("gitleaks", "Gitleaks",
  "The go-to secrets scanner for git repositories. Note the project is feature-complete and now receives security patches only.",
  "https://github.com/gitleaks/gitleaks", ["DevSecOps"], "Tool", "Beginner", FREE)
r("owasp-dsomm", "OWASP DSOMM",
  "A maturity model that tells teams exactly where their DevSecOps program stands and what to fix next.",
  "https://dsomm.owasp.org/", ["DevSecOps"], "Framework", "Intermediate", FREE)
r("practical-devsecops-cdp", "Practical DevSecOps CDP",
  "Over 100 guided labs and a six-hour practical exam, with lifetime certification and CPE points.",
  "https://www.practical-devsecops.com/certified-devsecops-professional/", ["DevSecOps"], "Certification", "Intermediate", PAID(note=UNVER))
r("defectdojo", "DefectDojo",
  "A vulnerability management hub that imports results from more than 150 scanners into one trackable dashboard.",
  "https://github.com/owasp/devguide/blob/HEAD/docs/en/06-verification/04-vulnerability-management/01-defectdojo.md", ["DevSecOps"], "Tool", "Intermediate", FREE)
r("checkov", "Checkov",
  "Static analysis for Terraform, CloudFormation, and other IaC. Catches misconfigurations before they deploy.",
  "https://github.com/bridgecrewio/checkov/blob/HEAD/README.md", ["DevSecOps"], "Tool", "Beginner", FREE)
r("snyk", "Snyk",
  "Developer-friendly scanning for code, containers, and IaC, with direct GitHub, GitLab, and IDE integrations.",
  "https://snyk.io/", ["DevSecOps"], "Tool", "Beginner", FREEMIUM())

# ---------------- Linux Fundamentals -> Linux Fundamentals ----------------
r("overthewire-bandit", "OverTheWire Bandit",
  "Thirty-four SSH levels that teach real Linux commands by playing. The classic first stop for hackers learning Linux.",
  "https://overthewire.org/wargames/bandit/", ["Linux Fundamentals"], "CTF Platform", "Beginner", FREE)
r("linux-journey", "Linux Journey",
  "Clean guided lessons with an in-browser terminal, from basics to users and permissions.",
  "https://labex.io/linuxjourney", ["Linux Fundamentals"], "Course", "Beginner", FREE)
r("linux-basics-for-hackers", "Linux Basics for Hackers, 2nd ed.",
  "Written specifically for the security mindset: networking, scripting, and wireless from a hacker's angle.",
  "https://openlibrary.org/books/OL50722062M/Linux_Basics_for_Hackers", ["Linux Fundamentals"], "Book", "Beginner", PAID(note=UNVER))
r("the-linux-command-line", "The Linux Command Line",
  "596 pages of proper command-line depth by William Shotts. The free book that keeps paying off.",
  "http://linuxcommand.org/tlcl.php", ["Linux Fundamentals"], "Book", "Beginner", FREE)
r("explainshell", "explainshell",
  "Paste any scary command and it explains every flag. The fastest way to stop fearing the terminal.",
  "http://explainshell.com/", ["Linux Fundamentals"], "Tool", "Beginner", FREE)
r("kodekloud-linux", "KodeKloud Linux",
  "A hands-on learning path that also prepares for LFCS, RHCSA, and LPIC-1 style Linux exams.",
  "https://kodekloud.com/learning-path/linux/", ["Linux Fundamentals"], "Course", "Beginner", FREEMIUM())

# ---------------- Programming for Hackers -> Programming ----------------
r("black-hat-python", "Black Hat Python, 2nd ed.",
  "The definitive book on Python for hacking: network tools, trojans, and Windows tradecraft, project by project.",
  "https://nostarch.com/catalog/rum", ["Programming"], "Book", "Intermediate", PAID(note=UNVER))
r("freecodecamp-python-v9", "freeCodeCamp Python v9",
  "The 2026 curriculum with 531 steps, five projects, and an exam. A solid zero-to-coding foundation.",
  "https://www.freecodecamp.org/learn/python-v9/", ["Programming"], "Course", "Beginner", FREE)
r("tcm-python-101-for-hackers", "TCM Security Python 101 for Hackers",
  "Five and a half hours of Python taught purely through a hacker's lens, with a completion certificate.",
  "https://academy.tcm-sec.com/p/python-101-for-hackers", ["Programming"], "Course", "Beginner", PAID("All-Access from $29.99/month"))
r("htb-academy", "HackTheBox Academy",
  "Over 355 guided modules and 20+ career paths with in-browser Pwnbox machines. The structured route into HTB.",
  "https://academy.hackthebox.com/", ["Programming"], "Interactive Lab", "Beginner", FREEMIUM())
r("codeabbey", "CodeAbbey",
  "Over 400 short programming tasks with certificates. Great for drilling problem-solving speed.",
  "http://codeabbey.com", ["Programming"], "Interactive Lab", "Beginner", FREE)
r("go-by-example", "Go by Example",
  "Clean annotated Go examples across about 90 topics. The quickest way to pick up Go for tooling.",
  "https://gobyexample.com/", ["Programming"], "Reference", "Beginner", FREE)

# ---------------- CTF Platforms & Competitions -> CTF (CSCB excluded: unverified URL) ----------------
r("picoctf", "picoCTF",
  "CMU's free competition plus year-round practice through picoGym. The friendliest first CTF. Note: 2026 reports suggest it is folding into the CyLab Security Academy, so verify before linking.",
  "https://picoctf.org/", ["CTF"], "CTF Platform", "Beginner", FREE)
r("ctftime", "CTFtime",
  "The calendar of every upcoming CTF plus team rankings. Plan your competition season here.",
  "https://ctftime.org/", ["CTF"], "CTF Platform", "All Levels", FREE)
r("root-me", "Root-Me",
  "400 to 500+ challenges across web, crypto, forensics, and more. Endless free practice.",
  "https://www.root-me.org/", ["CTF"], "CTF Platform", "Beginner", FREE)
r("vulnhub", "VulnHub",
  "Downloadable vulnerable VMs for fully offline practice on your own machine.",
  "https://www.vulnhub.com/", ["CTF"], "CTF Platform", "All Levels", FREE)

# ---------------- Bug Bounty Platforms -> Bug Bounty ----------------
r("hackerone", "HackerOne",
  "The largest bounty platform, with over $230 million paid out and customers like the US DoD, GitHub, and Google.",
  "https://www.hackerone.com", ["Bug Bounty"], "Bug Bounty Platform", "Intermediate", FREE)
r("bugcrowd", "Bugcrowd",
  "A major alternative with VRT severity ratings and both private and public programs.",
  "https://www.bugcrowd.com", ["Bug Bounty"], "Bug Bounty Platform", "Intermediate", FREE)
r("yeswehack", "YesWeHack",
  "Europe's leading platform (Paris HQ, EU-hosted, GDPR). Trusted by the European Commission.",
  "https://www.yeswehack.com", ["Bug Bounty"], "Bug Bounty Platform", "Intermediate", FREE)
r("intigriti", "Intigriti",
  "Belgian-founded (Antwerp HQ) with more than 125,000 researchers and a pay-for-impact model.",
  "https://www.intigriti.com", ["Bug Bounty"], "Bug Bounty Platform", "Intermediate", FREE)

# ---------------- Conferences -> Community (NorthSec 2026 excluded: unverified URL) ----------------
r("black-hat-usa-2026", "Black Hat USA 2026",
  "August 1 to 6, 2026, Las Vegas. Over 100 briefings and trainings: the industry's flagship research event.",
  "https://www.blackhat.com/", ["Community"], "Conference", "All Levels", PAID())
r("def-con-34", "DEF CON 34",
  "August 6 to 9, 2026, Las Vegas. 20,000 to 30,000 hackers, villages, and contests: the world's biggest hacker gathering.",
  "https://www.defcon.org/", ["Community"], "Conference", "All Levels", PAID("~$560 early / $580 regular / $600 late via Black Hat add-on in 2026"))
r("rsa-conference-2026", "RSA Conference 2026",
  "March 23 to 26, 2026, San Francisco. About 45,000 attendees: the enterprise security event of the year.",
  "https://www.rsaconference.com", ["Community"], "Conference", "All Levels", PAID())
r("brucon", "BruCON",
  "September 24 to 25, 2026, Mechelen, Belgium, with trainings September 21 to 23. Belgium's own top-tier security conference.",
  "https://www.brucon.org", ["Community"], "Conference", "All Levels", PAID())
r("bsides-las-vegas-2026", "BSides Las Vegas 2026",
  "August 3 to 5, 2026, Las Vegas. The community con during hacker summer camp: friendly and accessible.",
  "https://bsideslv.org", ["Community"], "Conference", "All Levels", FREE)

# ---------------- Newsletters & Podcasts -> News & Media ----------------
r("risky-biz", "Risky Biz",
  "Patrick Gray's sharp weekly security news. The show professionals actually listen to.",
  "https://risky.biz/", ["News & Media"], "Podcast", "Intermediate", FREE)
r("krebs-on-security", "Krebs on Security",
  "Brian Krebs' investigative reporting on cybercrime. Essential reading for understanding the threat landscape.",
  "https://krebsonsecurity.com/", ["News & Media"], "Newsletter", "All Levels", FREE)
r("tldr-sec", "TL;DR Sec",
  "A curated security newsletter that saves you hours by surfacing only what matters.",
  "https://tldrsec.com/", ["News & Media"], "Newsletter", "All Levels", FREE)
r("crypto-gram", "Crypto-Gram",
  "Bruce Schneier's monthly on cryptography and security policy. Unmatched depth and perspective.",
  "https://www.schneier.com/crypto-gram/", ["News & Media"], "Newsletter", "Intermediate", FREE)
r("unsupervised-learning", "Unsupervised Learning",
  "Daniel Miessler's thoughtful essays on security, AI, and the future. Great for big-picture thinking.",
  "https://danielmiessler.com/", ["News & Media"], "Newsletter", "Intermediate", FREE)
r("smashing-security", "Smashing Security",
  "Graham Cluley and Carole Theriault's weekly security news with humor. Verified active with episode 486 in September 2026.",
  "https://smashingsecurity.com", ["News & Media"], "Podcast", "All Levels", FREE)

# ---------------- Roadmaps ----------------
ROADMAPS = [
    {
        "slug": "web-pentest-bug-bounty",
        "title": "Web Pentesting to Bug Bounty",
        "tagline": "From your first terminal commands to your first paid bug bounty, in one sequenced path.",
        "audience": "Beginners who want to find real vulnerabilities and get paid for them",
        "difficulty": "Beginner to Intermediate",
        "estWeeks": "16-24",
        "steps": [
            {
                "title": "Get comfortable in the terminal",
                "whyNext": "Every web pentest starts in a Linux terminal: Burp, scanners, and payloads all assume you can move around the command line.",
                "resourceIds": ["overthewire-bandit", "linux-journey", "explainshell"],
                "estMinutes": 480,
            },
            {
                "title": "Learn how networks and the web actually work",
                "whyNext": "You cannot break what you do not understand: HTTP, DNS, and TCP/IP are the substrate every web attack abuses.",
                "resourceIds": ["freecodecamp-networking", "professor-messer-network-plus", "chris-greer"],
                "estMinutes": 600,
            },
            {
                "title": "Meet the OWASP Top 10",
                "whyNext": "The Top 10 names the vulnerability classes you will hunt for the rest of your career; learn the vocabulary before picking up the tools.",
                "resourceIds": ["owasp-top-10", "portswigger-web-security-academy", "owasp-juice-shop"],
                "estMinutes": 600,
            },
            {
                "title": "Master Burp Suite and your first labs",
                "whyNext": "Burp is the web hunter's main weapon; the Academy's free labs teach it through real vulnerability classes.",
                "resourceIds": ["burp-suite", "portswigger-web-security-academy", "dvwa"],
                "estMinutes": 1200,
            },
            {
                "title": "Drill payloads and methodology",
                "whyNext": "Real targets need bypasses, not textbook payloads; these references turn Academy knowledge into working exploits.",
                "resourceIds": ["payloadsallthethings", "hacktricks", "portswigger-xss-cheat-sheet", "pentesterlab"],
                "estMinutes": 900,
            },
            {
                "title": "Study how real hunters think",
                "whyNext": "Methodology and mindset separate people who run scanners from people who get paid; learn from hunters who report real bugs.",
                "resourceIds": ["stok", "ippsec", "real-world-bug-hunting"],
                "estMinutes": 600,
            },
            {
                "title": "Practice on realistic targets",
                "whyNext": "Juice Shop and HTB machines behave like production apps, so your skills transfer when you touch a real scope.",
                "resourceIds": ["owasp-juice-shop", "hackthebox", "tryhackme", "owasp-webgoat"],
                "estMinutes": 1500,
            },
            {
                "title": "Start hunting on bounty platforms",
                "whyNext": "Now you own the full chain: recon, exploitation, reporting. Pick a program, read its scope carefully, and submit your first finding.",
                "resourceIds": ["hackerone", "bugcrowd", "yeswehack", "intigriti", "web-application-hackers-handbook"],
                "estMinutes": 1200,
            },
        ],
    },
    {
        "slug": "soc-analyst-foundations",
        "title": "SOC Analyst Foundations",
        "tagline": "Everything a Tier-1 SOC analyst needs: networking, Linux, ATT&CK, triage, DFIR, and detection.",
        "audience": "Career switchers aiming at a Tier-1 SOC role",
        "difficulty": "Beginner to Intermediate",
        "estWeeks": "12-20",
        "steps": [
            {
                "title": "Networking basics for defenders",
                "whyNext": "SOC work is reading packets and logs; you need to recognize normal before you can spot abnormal.",
                "resourceIds": ["freecodecamp-networking", "professor-messer-network-plus", "subnettingpractice"],
                "estMinutes": 600,
            },
            {
                "title": "Linux for the SOC",
                "whyNext": "Endpoints are Linux and alerts come with command lines; Bandit makes the terminal second nature.",
                "resourceIds": ["overthewire-bandit", "linux-journey", "the-linux-command-line"],
                "estMinutes": 480,
            },
            {
                "title": "Learn the attacker's playbook: MITRE ATT&CK",
                "whyNext": "ATT&CK is the shared language every SOC uses to describe attacks; learn it before you triage your first alert.",
                "resourceIds": ["mitre-attack", "sans-dfir-posters", "darknet-diaries"],
                "estMinutes": 480,
            },
            {
                "title": "Triage real alerts in a simulated SOC",
                "whyNext": "Alert triage is the Tier-1 job; LetsDefend's alert queue and the BOTS datasets teach the workflow on realistic data.",
                "resourceIds": ["letsdefend", "splunk-bots", "sans-internet-storm-center"],
                "estMinutes": 900,
            },
            {
                "title": "Hands-on DFIR investigations",
                "whyNext": "Alerts become investigations; BTLO and CyberDefenders hand you real artifacts and ask the questions a real analyst answers.",
                "resourceIds": ["blue-team-labs-online", "cyberdefenders", "memlabs"],
                "estMinutes": 1200,
            },
            {
                "title": "Detection engineering basics",
                "whyNext": "Once you have triaged attacks, learn to write the detections yourself: Sigma rules are the core detection-as-code skill.",
                "resourceIds": ["sigma-rules", "splunk-bots", "velociraptor"],
                "estMinutes": 720,
            },
            {
                "title": "Build your homelab SIEM",
                "whyNext": "A Wazuh homelab gives you a SIEM to practice in daily and a story to tell in interviews.",
                "resourceIds": ["wazuh", "sans-dfir-posters", "john-hammond-youtube"],
                "estMinutes": 720,
            },
            {
                "title": "Prove it: certify with BTL1",
                "whyNext": "BTL1 is the hands-on blue-team credential hiring managers recognize; the DFIR Report write-ups show you what exam-level analysis looks like.",
                "resourceIds": ["security-blue-team-btl1", "the-dfir-report"],
                "estMinutes": 2400,
            },
        ],
    },
]

# ---------------- Write outputs ----------------
os.makedirs(OUT, exist_ok=True)

ids = [x["id"] for x in R]
assert len(ids) == len(set(ids)), "duplicate resource ids: " + str([i for i in ids if ids.count(i) > 1])
for rm in ROADMAPS:
    for step in rm["steps"]:
        for rid in step["resourceIds"]:
            assert rid in ids, f"roadmap {rm['slug']} step '{step['title']}' references unknown id '{rid}'"

with open(os.path.join(OUT, "resources.json"), "w", encoding="utf-8") as f:
    json.dump(R, f, ensure_ascii=False, indent=2)
    f.write("\n")
with open(os.path.join(OUT, "roadmaps.json"), "w", encoding="utf-8") as f:
    json.dump(ROADMAPS, f, ensure_ascii=False, indent=2)
    f.write("\n")

print(f"resources: {len(R)}")
print(f"roadmaps: {len(ROADMAPS)}")
