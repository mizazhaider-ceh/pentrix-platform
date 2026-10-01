import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { ResourceCard } from "@/components/ResourceCard";
import { Reveal } from "@/components/Reveal";
import { getResources, getRoadmaps } from "@/lib/data";
import type { Resource, Roadmap } from "@/lib/data";

export const metadata: Metadata = {
  title: "The PenTrix | Learn cybersecurity in the right order",
  description:
    "The PenTrix is one roof for learning cybersecurity: 192 hand-verified resources, roadmaps that put them in the right order, and the real cost of each path written down. Free forever.",
  openGraph: {
    title: "The PenTrix | Learn cybersecurity in the right order",
    description:
      "192 verified resources, sequenced roadmaps, honest 2026 costs. Free forever. Cyber first.",
    type: "website",
  },
};

const DOT_GRID: React.CSSProperties = {
  backgroundImage:
    "radial-gradient(rgba(250,250,250,0.055) 1px, transparent 1.4px)",
  backgroundSize: "26px 26px",
};

const FEATURED_ORDER = [
  {
    id: "portswigger-web-security-academy",
    note: "The web lab standard, free labs from the Burp Suite makers",
  },
  {
    id: "owasp-top-10",
    note: "The risk list the whole industry speaks",
  },
  {
    id: "hacktricks",
    note: "The field manual for pentesting and CTF work",
  },
  {
    id: "tryhackme",
    note: "The gentlest guided start into hands-on labs",
  },
  {
    id: "letsdefend",
    note: "Real Tier-1 SOC triage before your first job",
  },
  {
    id: "pwn-college",
    note: "Exploitation from first principles, free",
  },
] as const;


function pickFeatured(resources: Resource[]): {
  resource: Resource;
  note: string;
}[] {
  return FEATURED_ORDER.flatMap(({ id, note }) => {
    const resource = resources.find((r) => r.id === id);
    return resource ? [{ resource, note }] : [];
  });
}

const VERIFIED_POINTS = [
  {
    code: "01",
    label: "Live link",
    text: "Every URL is opened and checked by hand, not scraped from another list.",
  },
  {
    code: "02",
    label: "Real price",
    text: "The price you would actually pay, confirmed from the source in 2026.",
  },
  {
    code: "03",
    label: "Dated",
    text: "Every entry carries a last-verified date, so you can see how fresh it is.",
  },
  {
    code: "04",
    label: "Re-checked",
    text: "The catalog is re-verified on a regular schedule. Dead or changed entries get fixed or removed.",
  },
] as const;

export default function Home() {
  const resources = getResources();
  const roadmaps = getRoadmaps();
  const featured = pickFeatured(resources);
  const teaserRoadmaps: Roadmap[] = roadmaps.slice(0, 2);
  const firstRoadmap = roadmaps[0];

  return (
    <div className="bg-[#0A0A0F] text-[#F4F4F5] antialiased">
      {/* 1. Hero */}
      <section className="border-b border-white/[0.08]" style={DOT_GRID}>
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <Reveal>
            <div>
              <p className="font-mono text-xs tracking-[0.25em] text-gold">
                THE PENTRIX · CYBER FIRST
              </p>
              <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-balance md:text-7xl">
                Learn cybersecurity in the right order.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
                The PenTrix is one roof for learning security: 192
                hand-verified resources, roadmaps that sequence them week by
                week, and the real cost of each path written down. The core is
                free, and it stays free.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/library"
                  className="inline-flex items-center rounded-md bg-[#F4F4F5] px-6 py-3 text-sm font-semibold text-[#0A0A0F] hover:bg-white"
                >
                  Browse the library
                </Link>
                <Link
                  href="/roadmaps"
                  className="inline-flex items-center rounded-md border border-white/[0.15] px-6 py-3 text-sm font-semibold text-[#F4F4F5] hover:border-white/[0.3]"
                >
                  See the roadmaps
                </Link>
              </div>
              <div className="mt-12 inline-block rounded-md border border-white/[0.08] bg-white/[0.02] px-5 py-4 font-mono text-sm leading-7">
                <p className="text-zinc-400">
                  <span className="text-gold">$</span> pentrix --plan
                  &quot;bug bounty&quot;
                </p>
                <p className="text-zinc-300">
                  <span className="text-gold">→</span>{" "}
                  {firstRoadmap
                    ? `${firstRoadmap.slug} · ${firstRoadmap.estWeeks} weeks · $0`
                    : "resolving plan…"}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Stats band */}
      <section className="border-b border-white/[0.08]">
        <Reveal>
          <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-6 py-12 md:grid-cols-4">
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                Verified resources
              </dt>
              <dd className="mt-2 font-mono text-4xl font-semibold text-[#F4F4F5]">
                192
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                Categories
              </dt>
              <dd className="mt-2 font-mono text-4xl font-semibold text-[#F4F4F5]">
                20
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                Sequenced roadmaps
              </dt>
              <dd className="mt-2 font-mono text-4xl font-semibold text-[#F4F4F5]">
                2
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                Cost, forever
              </dt>
              <dd className="mt-2 font-mono text-4xl font-semibold text-gold">
                $0
              </dd>
            </div>
          </dl>
        </Reveal>
      </section>

      {/* 3. Why this exists */}
      <section className="border-b border-white/[0.08]">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <SectionHeader
              kicker="00 / The problem"
              title="The gap is not content. There is too much content."
            />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-zinc-400">
              <p>
                Stitching a beginner-to-job-ready path yourself means spreading
                progress across 6 to 8 platforms, paying overlapping
                subscriptions and exam fees that total{" "}
                <span className="font-mono text-[#F4F4F5]">
                  $1,030–$1,180
                </span>
                , and spending 12 to 18 months of self-directed research just
                to figure out the order. Nobody publishes the real total before
                you start.
              </p>
              <p>
                The gap is <span className="text-[#F4F4F5]">sequencing</span>{" "}
                plus <span className="text-[#F4F4F5]">verification</span> under a{" "}
                <span className="text-[#F4F4F5]">single roof</span>. The PenTrix
                decides the sequence, checks every link and price, and writes
                the cost down before week one, not during month fourteen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured resources */}
      <section className="border-b border-white/[0.08]">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <SectionHeader
            kicker="01 / Start here"
            title="Six entries a beginner can trust on day one"
            lede="The library holds 192 resources, each checked by hand against the live web. These are the six we hand over first, in the order most learners need them."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured.map(({ resource, note }, i) => (
              <div
                key={resource.id}
                className={i === 0 ? "md:col-span-2 lg:col-span-2" : ""}
              >
                <p className="mb-2 font-mono text-xs tracking-[0.15em] text-gold">
                  {String(i + 1).padStart(2, "0")} · {note}
                </p>
                <ResourceCard resource={resource} />
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/library"
              className="font-mono text-sm text-[#F4F4F5] underline decoration-gold decoration-2 underline-offset-4 hover:text-white"
            >
              Browse all 192 resources →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Roadmap teaser */}
      <section className="border-b border-white/[0.08]">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <SectionHeader
            kicker="02 / Roadmaps"
            title="A week-by-week plan, not a pile of links"
            lede="Each roadmap sequences resources, labs, and checkpoints into a plan you can actually follow."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-5">
            {teaserRoadmaps.map((rm, i) => (
              <Link
                key={rm.slug}
                href={`/roadmaps/${rm.slug}`}
                className={`group rounded-lg border border-white/[0.08] bg-white/[0.02] p-8 hover:border-white/[0.2] ${
                  i === 0 ? "lg:col-span-3" : "lg:col-span-2"
                }`}
              >
                <p className="font-mono text-xs tracking-[0.2em] text-gold">
                  ROADMAP {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
                  {rm.title}
                </h3>
                <p className="mt-3 leading-relaxed text-zinc-400">
                  {rm.tagline}
                </p>
                <div className="mt-8 flex items-center gap-6 font-mono text-sm">
                  <span className="text-[#F4F4F5]">{rm.estWeeks} weeks</span>
                  <span className="text-zinc-500">
                    {rm.steps.length} steps
                  </span>
                  <span className="ml-auto text-zinc-400 group-hover:text-[#F4F4F5]">
                    Open →
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/roadmaps"
              className="font-mono text-sm text-[#F4F4F5] underline decoration-gold decoration-2 underline-offset-4 hover:text-white"
            >
              See all roadmaps →
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Verification strip */}
      <section className="border-b border-white/[0.08] bg-white/[0.015]">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <Reveal>
            <div>
              <p className="font-mono text-xs tracking-[0.25em] text-gold">
                03 / VERIFIED
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                What “verified” means here
              </h2>
              <dl className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
                {VERIFIED_POINTS.map((p) => (
                  <div
                    key={p.code}
                    className="border-t border-gold/40 pt-4"
                  >
                    <dt className="font-mono text-xs tracking-[0.2em] text-gold">
                      {p.code} · {p.label.toUpperCase()}
                    </dt>
                    <dd className="mt-2 leading-relaxed text-zinc-400">
                      {p.text}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7. About teaser + CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="font-mono text-xs tracking-[0.25em] text-gold">
              04 / ABOUT
            </p>
            <p className="mt-6 text-xl leading-relaxed text-zinc-300 md:text-2xl">
              The PenTrix started as one student’s attempt to stop wasting
              money and months on the wrong order. The free core, the library,
              and the cost transparency stay free forever.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center rounded-md border border-white/[0.15] px-6 py-3 text-sm font-semibold text-[#F4F4F5] hover:border-white/[0.3]"
              >
                Read the full story
              </Link>
              <Link
                href="/library"
                className="inline-flex items-center rounded-md bg-[#F4F4F5] px-6 py-3 text-sm font-semibold text-[#0A0A0F] hover:bg-white"
              >
                Start learning
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
