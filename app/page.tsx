import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { ResourceCard } from "@/components/ResourceCard";
import {
  RoadmapFeature,
  RoadmapIndexRow,
  formatWeeks,
  formatSteps,
} from "@/components/RoadmapCard";
import { getResources, getRoadmaps, getDomains } from "@/lib/data";
import type { Resource, Roadmap } from "@/lib/data";

export const metadata: Metadata = {
  title: "The PenTrix | Learn cybersecurity in the right order",
  description:
    "The PenTrix is one roof for learning cybersecurity: hand-verified resources, roadmaps that put them in the right order, and the real cost of each path written down. Free forever.",
  openGraph: {
    title: "The PenTrix | Learn cybersecurity in the right order",
    description:
      "Verified resources, sequenced roadmaps, honest 2026 costs. Free forever. Cyber first.",
    type: "website",
  },
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

function formatMinutes(minutes: number | undefined): string {
  if (typeof minutes !== "number") return "";
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours} h` : `${hours} h ${rest} min`;
}

const MORE_SECTIONS = [
  {
    href: "/start-here",
    title: "Start here",
    text: "Your first day, first week, and first month, spelled out. Read this before anything else.",
  },
  {
    href: "/blog",
    title: "Blog",
    text: "Field notes from real bounties and competitions: the recon workflow, the 500 euro header, the 60/60 study system.",
  },
  {
    href: "/tools",
    title: "Tools directory",
    text: "Every tool in the library, grouped by domain, with the real price attached.",
  },
  {
    href: "/cheatsheets",
    title: "Cheat sheets",
    text: "Copy-paste command references: Linux, networking, web pentest, Windows and AD, git, bash.",
  },
  {
    href: "/glossary",
    title: "Glossary",
    text: "75 terms explained in plain language, from IDOR to Kerberoasting to chain of custody.",
  },
  {
    href: "/faq",
    title: "FAQ",
    text: "Honest answers: cost, timelines, certs, careers, and how to practice legally.",
  },
] as const;

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

/**
 * The hero is the product's own register: a real plan readout pulled
 * from the first roadmap, not a stock headline with two buttons.
 */
function PlanPanel({ roadmap }: { roadmap: Roadmap }) {
  const query = roadmap.slug.replace(/-/g, " ");
  const preview = roadmap.steps.slice(0, 4);
  return (
    <aside
      aria-label="Example learning plan"
      className="film-grain overflow-hidden rounded-lg border border-line bg-surface"
    >
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
          Pentrix plan
        </p>
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-signal">
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 rounded-full bg-signal"
          />
          Live
        </p>
      </div>
      <div className="px-5 py-4">
        <p className="font-mono text-sm text-zinc-300">
          <span className="mr-2 text-gold">$</span>
          pentrix --plan &quot;{query}&quot;
          <span
            aria-hidden="true"
            className="caret-blink ml-1.5 inline-block h-4 w-[7px] translate-y-[3px] bg-signal"
          />
        </p>
        <ol className="mt-4 space-y-2.5">
          {preview.map((step, i) => (
            <li
              key={step.title}
              className="flex items-baseline gap-3 font-mono text-[13px]"
            >
              <span aria-hidden="true" className="shrink-0 text-zinc-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1 truncate text-zinc-300">
                {step.title}
              </span>
              <span className="shrink-0 text-zinc-500">
                {formatMinutes(step.estMinutes)}
              </span>
            </li>
          ))}
        </ol>
        <div className="mt-4 border-t border-line pt-4">
          <Link
            href={`/roadmaps/${roadmap.slug}`}
            className="group flex items-center justify-between gap-4 font-mono text-[13px]"
          >
            <span className="text-zinc-400">
              {formatSteps(roadmap.steps.length)} ·{" "}
              {formatWeeks(roadmap.estWeeks)} · $0
            </span>
            <span className="shrink-0 text-signal transition-transform duration-200 group-hover:translate-x-0.5">
              Open →
            </span>
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default function Home() {
  const resources = getResources();
  const roadmaps = getRoadmaps();
  const domains = getDomains();
  const featured = pickFeatured(resources);
  const [leadRoadmap, ...otherRoadmaps] = roadmaps;
  const teaserRows = otherRoadmaps.slice(0, 2);

  const stats = [
    { label: "Verified resources", value: String(resources.length) },
    { label: "Domains covered", value: String(domains.length) },
    { label: "Sequenced roadmaps", value: String(roadmaps.length) },
    { label: "Cost, forever", value: "$0", accent: true },
  ];

  return (
    <div className="bg-ink text-zinc-100 antialiased">
      {/* 1. Hero */}
      <section className="dot-grid border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
          <div className="hero-enter lg:col-span-7">
            <p className="font-mono text-xs tracking-[0.25em] text-gold">
              THE PENTRIX · CYBER FIRST
            </p>
            <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.75rem,6vw,4.5rem)] font-semibold leading-[1.03] tracking-[-0.02em] text-zinc-50">
              Learn cybersecurity in the right order.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
              The PenTrix is one roof for learning security:{" "}
              {resources.length} hand-verified resources, roadmaps that
              sequence them week by week, and the real cost of each path
              written down. The core is free, and it stays free.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/library"
                className="inline-flex items-center rounded-md bg-signal px-6 py-3 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-signal-hover"
              >
                Browse the library
              </Link>
              <Link
                href="/roadmaps"
                className="inline-flex items-center rounded-md border border-line-strong px-6 py-3 text-sm font-semibold text-zinc-100 transition-colors duration-200 hover:border-zinc-400"
              >
                See the roadmaps
              </Link>
            </div>
            <p className="mt-6 font-mono text-sm text-zinc-500">
              New here?{" "}
              <Link
                href="/start-here"
                className="text-zinc-100 underline decoration-gold decoration-2 underline-offset-4 transition-colors duration-200 hover:text-white"
              >
                Start here →
              </Link>
            </p>
          </div>
          {leadRoadmap ? (
            <div
              className="hero-enter lg:col-span-5"
              style={{ animationDelay: "120ms" }}
            >
              <PlanPanel roadmap={leadRoadmap} />
              <p className="mt-4 font-mono text-xs leading-relaxed text-zinc-600">
                A real excerpt: the first four steps of the{" "}
                {leadRoadmap.title} path.
              </p>
            </div>
          ) : null}
        </div>
      </section>

      {/* 2. Stats band */}
      <section className="border-b border-line">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-6 py-12 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                {stat.label}
              </dt>
              <dd
                className={`mt-2 font-mono text-4xl font-semibold ${
                  stat.accent ? "text-gold" : "text-zinc-50"
                }`}
              >
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 3. Why this exists */}
      <section className="border-b border-line">
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
                <span className="font-mono text-zinc-50">$1,030–$1,180</span>,
                and spending 12 to 18 months of self-directed research just
                to figure out the order. Nobody publishes the real total before
                you start.
              </p>
              <p>
                The gap is <span className="text-zinc-50">sequencing</span>{" "}
                plus <span className="text-zinc-50">verification</span> under a{" "}
                <span className="text-zinc-50">single roof</span>. The PenTrix
                decides the sequence, checks every link and price, and writes
                the cost down before week one, not during month fourteen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured resources */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <SectionHeader
            kicker="01 / Start here"
            title="Six entries a beginner can trust on day one"
            lede={`The library holds ${resources.length} resources, each checked by hand against the live web. These are the six we hand over first, in the order most learners need them.`}
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
              className="font-mono text-sm text-zinc-50 underline decoration-gold decoration-2 underline-offset-4 transition-colors duration-200 hover:text-white"
            >
              Browse all {resources.length} resources →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Roadmap teaser */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <SectionHeader
            kicker="02 / Roadmaps"
            title="A week-by-week plan, not a pile of links"
            lede="Each roadmap sequences resources, labs, and checkpoints into a plan you can actually follow."
          />
          {leadRoadmap ? (
            <div className="mt-12">
              <RoadmapFeature roadmap={leadRoadmap} index={0} />
            </div>
          ) : null}
          {teaserRows.length > 0 ? (
            <ul className="mt-2 divide-y divide-line border-b border-line">
              {teaserRows.map((roadmap, i) => (
                <RoadmapIndexRow
                  key={roadmap.slug}
                  roadmap={roadmap}
                  index={i + 1}
                />
              ))}
            </ul>
          ) : null}
          <div className="mt-10">
            <Link
              href="/roadmaps"
              className="font-mono text-sm text-zinc-50 underline decoration-gold decoration-2 underline-offset-4 transition-colors duration-200 hover:text-white"
            >
              See all {roadmaps.length} roadmaps →
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Beyond the library */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <SectionHeader
            kicker="03 / More"
            title="Beyond the library"
            lede="The rest of the platform: a guided start, field notes from real hunts, the toolbox, command references, plain-language definitions, and honest answers."
          />
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {MORE_SECTIONS.map((section) => (
              <li key={section.href}>
                <Link
                  href={section.href}
                  className="group block h-full rounded-lg border border-line bg-surface px-6 py-7 transition-colors duration-200 hover:border-line-strong"
                >
                  <h3 className="font-display text-xl font-semibold tracking-tight text-zinc-50 transition-colors group-hover:text-signal">
                    {section.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {section.text}
                  </p>
                  <p className="mt-5 font-mono text-sm text-signal">
                    Open <span aria-hidden="true">→</span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Verification strip */}
      <section className="border-b border-line bg-ink-soft">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div>
            <p className="font-mono text-xs tracking-[0.25em] text-gold">
              04 / VERIFIED
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
              What “verified” means here
            </h2>
            <dl className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
              {VERIFIED_POINTS.map((p) => (
                <div key={p.code} className="border-t border-gold/40 pt-4">
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
        </div>
      </section>

      {/* 8. About teaser + CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="font-mono text-xs tracking-[0.25em] text-gold">
              05 / ABOUT
            </p>
            <p className="mt-6 text-xl leading-relaxed text-zinc-300 md:text-2xl">
              The PenTrix started as one student’s attempt to stop wasting
              money and months on the wrong order. The free core, the library,
              and the cost transparency stay free forever.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/library"
                className="inline-flex items-center rounded-md bg-signal px-6 py-3 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-signal-hover"
              >
                Start learning
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center rounded-md border border-line-strong px-6 py-3 text-sm font-semibold text-zinc-100 transition-colors duration-200 hover:border-zinc-400"
              >
                Read the full story
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
