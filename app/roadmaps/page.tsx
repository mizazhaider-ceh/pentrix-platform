import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { getRoadmaps } from "@/lib/data";

export const metadata: Metadata = {
  title: "Roadmaps | The PenTrix",
  description:
    "Sequenced cybersecurity learning paths. Each step sits in order for a reason, and the reason is written on the step.",
};

function difficultyTone(level: string): string {
  if (/advanced/i.test(level)) {
    return "border-rose-400/30 bg-rose-400/10 text-rose-300";
  }
  if (/intermediate/i.test(level)) {
    return "border-gold/30 bg-gold/10 text-gold";
  }
  return "border-signal/30 bg-signal/10 text-signal";
}

function DifficultyBadge({ level }: { level: string }) {
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.14em] ${difficultyTone(level)}`}
    >
      {level}
    </span>
  );
}

function formatWeeks(estWeeks: string | number): string {
  if (typeof estWeeks === "number") {
    return `${estWeeks} ${estWeeks === 1 ? "week" : "weeks"}`;
  }
  return `${estWeeks} weeks`;
}

function formatSteps(count: number): string {
  return `${count} ${count === 1 ? "step" : "steps"}`;
}

const HOW_TO_USE = [
  {
    title: "Pick one path",
    body: "Start from the roadmap that matches your level today, not the role you want in a year. One path finished beats three started.",
  },
  {
    title: "Do one step a week",
    body: "Every step shows its time. Block the hours, finish each resource in the step, then move on. One step a week is the default pace.",
  },
  {
    title: "Check the why-next note before skipping",
    body: "Every step carries a gold note explaining why it comes next. Read it before you jump ahead. It tells you what the next step assumes you already know.",
  },
];

export default function RoadmapsPage() {
  const roadmaps = getRoadmaps();

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-20">
      <SectionHeader
        kicker="Roadmaps"
        title="Sequenced paths, not link dumps."
        lede="A roadmap is a sequence, not a pile of links. Each path below runs in a deliberate order, and every step carries a short note explaining why it comes next. Follow the order, or skip a step on purpose after reading its note."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {roadmaps.map((roadmap, i) => (
          <Reveal key={roadmap.slug} delay={i * 0.06} className="h-full">
            <Link
              href={`/roadmaps/${roadmap.slug}`}
              className="group flex h-full flex-col rounded-lg border border-line bg-surface p-6 transition-colors duration-200 hover:border-gold/50"
            >
              <div className="flex items-center justify-between gap-3">
                <DifficultyBadge level={roadmap.difficulty} />
                <span className="font-mono text-xs text-muted">
                  {formatWeeks(roadmap.estWeeks)}
                </span>
              </div>

              <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-zinc-100">
                {roadmap.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {roadmap.tagline}
              </p>
              <p className="mb-6 mt-4 text-xs leading-relaxed text-zinc-500">
                <span className="font-mono uppercase tracking-[0.14em]">
                  Audience
                </span>
                <span aria-hidden="true"> · </span>
                {roadmap.audience}
              </p>

              <div className="mt-auto border-t border-line pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted">
                    {formatSteps(roadmap.steps.length)}
                  </span>
                  <span className="text-sm font-medium text-gold transition-transform duration-200 group-hover:translate-x-0.5">
                    Open roadmap <span aria-hidden="true">→</span>
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <section
        aria-label="How to use a roadmap"
        className="mt-16 rounded-lg border border-line bg-surface p-6 sm:p-8"
      >
        <h2 className="font-display text-lg font-semibold tracking-tight text-zinc-100">
          How to use a roadmap
        </h2>
        <ol className="mt-6 grid gap-6 sm:grid-cols-3">
          {HOW_TO_USE.map((item, i) => (
            <li key={item.title} className="flex gap-4">
              <span
                aria-hidden="true"
                className="font-mono text-sm text-gold"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-zinc-100">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
