import type { Metadata } from "next";
import { Markdown } from "@/components/Markdown";
import { getStartHere } from "@/lib/content";

export const metadata: Metadata = {
  title: "Start here | The PenTrix",
  description:
    "New to cybersecurity? Your first day, first week, and first month on The PenTrix, spelled out step by step.",
};

/** Wire the path names in the authored copy to the real roadmap pages. */
function linkRoadmaps(source: string): string {
  return source
    .replaceAll(
      "**Web Pentesting to Bug Bounty.**",
      "**[Web Pentesting to Bug Bounty](/roadmaps/web-pentest-bug-bounty).**",
    )
    .replaceAll(
      "**Network Pentesting and Infrastructure.**",
      "**[Network Pentesting & Infrastructure](/roadmaps/network-pentesting-infrastructure).**",
    )
    .replaceAll(
      "**SOC Analyst Foundations.**",
      "**[SOC Analyst Foundations](/roadmaps/soc-analyst-foundations).**",
    )
    .replaceAll(
      "**DFIR (Digital Forensics and Incident Response).**",
      "**[DFIR: Digital Forensics & Incident Response](/roadmaps/dfir-foundations).**",
    )
    .replaceAll(
      "**CTF Player Path.**",
      "**[CTF Player Path](/roadmaps/ctf-player-path).**",
    )
    .replaceAll(
      "Default to Web Pentesting to Bug Bounty.",
      "Default to [Web Pentesting to Bug Bounty](/roadmaps/web-pentest-bug-bounty).",
    );
}

export default function StartHerePage() {
  const source = linkRoadmaps(getStartHere());

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-gold">
        Start here
      </p>
      <div className="mt-4">
        <Markdown source={source} />
      </div>
    </main>
  );
}
