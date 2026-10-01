import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "About | The PenTrix",
  description:
    "Why The PenTrix exists: one roof for learning cybersecurity, with verified resources, sequenced roadmaps, honest costs, and a free core forever.",
};

const pillars = [
  {
    title: "Verified everything",
    body: "Every resource carries a real URL, a real price, and a last-verified date. Dead links get pulled, prices get rechecked. If it is listed here, someone checked it.",
  },
  {
    title: "Sequencing over catalog",
    body: "A roadmap is not a link dump. Each path tells you what to do this week, what it builds on, and what it prepares you for. One trusted order, start to finish.",
  },
  {
    title: "Cost transparency",
    body: "For every goal, we show the cheapest verified path next to the mid-range and premium options, trade-offs included. No surprise subscription stacking.",
  },
  {
    title: "Free core forever",
    body: "The library, the roadmaps, and the cost data are free and stay free. That is not a launch offer. If we ever charge for anything, it will be something new on top, never the core you came for.",
  },
  {
    title: "Crafted, not generated",
    body: "Pages written and designed by people who care about how you learn, not filler to pad a sitemap. If a page does not help you learn, it does not ship.",
  },
];

const personas = [
  {
    name: "The absolute beginner",
    body: "You have a laptop, maybe just a phone, and no idea whether to start with networking, Linux, or a cert. You need one trusted starting point and someone honest about the order.",
  },
  {
    name: "The career switcher",
    body: "You have IT experience and want into a junior SOC or pentest role. You need to know which cert is actually worth your money and how to prove you can do the work in an interview.",
  },
  {
    name: "The grinder",
    body: "You are already deep into TryHackMe and Hack The Box, and you are hitting the gaps: paywalls, hint dependency, no feedback on your reports. You need structure that holds you to a real standard.",
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <SectionHeader
        kicker="About"
        title="One roof for learning cybersecurity."
      />

      {/* The problem */}
      <section className="mt-12 space-y-5 text-lg leading-relaxed text-zinc-400">
        <p>
          Ask five people where to start in cybersecurity and you get five
          different answers. One says get Security+. Another says certs are
          useless and you should just do boxes. You end up with forty
          bookmarked links, accounts on half a dozen platforms, and no idea
          what to open first.
        </p>
        <p>
          Our research put a number on it: stitching your own path across 6
          to 8 disconnected platforms costs roughly $1,030 to $1,180 and 12
          to 18 months of figuring out what to learn in what order. Content is
          not the problem. Nobody is short of content. The problem is the
          integration, and right now the student is the one doing it.
        </p>
      </section>

      {/* What The PenTrix does */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-zinc-50">
          What The PenTrix does
        </h2>
        <div className="mt-8 space-y-8">
          {pillars.map((pillar, i) => (
            <div key={pillar.title} className="flex gap-5">
              <span className="font-mono text-sm font-medium text-gold tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-zinc-100">
                  {pillar.title}
                </h3>
                <p className="mt-1 leading-relaxed text-zinc-400">
                  {pillar.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who it is for */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-zinc-50">
          Who it is for
        </h2>
        <div className="mt-8 space-y-6">
          {personas.map((persona) => (
            <div key={persona.name} className="border-l-2 border-gold/60 pl-5">
              <h3 className="font-semibold text-zinc-100">{persona.name}</h3>
              <p className="mt-1 leading-relaxed text-zinc-400">
                {persona.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Founder note */}
      <section className="mt-16 rounded-lg border border-line bg-surface p-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
          The founder
        </p>
        <h2 className="mt-2 font-display text-xl font-semibold tracking-tight text-zinc-50">
          Built by Izaz
        </h2>
        <p className="mt-3 leading-relaxed text-zinc-400">
          Izaz (The PenTrix) is a cybersecurity student, a bug bounty hunter
          recognized on YesWeHack, and a CTF player. He built The PenTrix
          because he got tired of answering &ldquo;where do I start?&rdquo;
          with a 40-link dump.
        </p>
      </section>

      {/* Free forever pledge */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-zinc-50">
          Free forever, for real
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-zinc-400">
          The library, the roadmaps, and the cost transparency are free
          forever. No trials, no paywalled basics, no &ldquo;free&rdquo; tier
          that quietly hides the good stuff.
        </p>
      </section>

      {/* What's next */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-zinc-50">
          What&rsquo;s next
        </h2>
        <p className="mt-4 leading-relaxed text-zinc-400">
          More paths are coming: deeper blue team tracks and a full digital
          forensics track, progress tracking that measures demonstrated skill
          instead of pages read, and community collections so learners can
          share paths that actually worked for them. These ship when they are
          ready, not on a fixed deadline.
        </p>
      </section>

      {/* CTA */}
      <section className="mt-16">
        <Link
          href="/library"
          className="inline-flex items-center justify-center rounded-md bg-signal px-8 py-3.5 text-base font-semibold text-ink transition-colors duration-200 hover:bg-signal-hover"
        >
          Start with the library
        </Link>
      </section>
    </main>
  );
}
