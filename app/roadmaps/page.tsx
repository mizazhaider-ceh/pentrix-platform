import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader";
import { RoadmapFeature, RoadmapIndexRow } from "@/components/RoadmapCard";
import { getRoadmaps } from "@/lib/data";

export const metadata: Metadata = {
  title: "Roadmaps | The PenTrix",
  description:
    "Sequenced cybersecurity learning paths. Each step sits in order for a reason, and the reason is written on the step.",
};

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
    body: "Every step carries a short note explaining why it comes next. Read it before you jump ahead. It tells you what the next step assumes you already know.",
  },
];

export default function RoadmapsPage() {
  const roadmaps = getRoadmaps();
  const [lead, ...rest] = roadmaps;

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-20">
      <SectionHeader
        kicker="Roadmaps"
        title="Sequenced paths, not link dumps."
        lede="A roadmap is a sequence, not a pile of links. Each path below runs in a deliberate order, and every step carries a short note explaining why it comes next. Follow the order, or skip a step on purpose after reading its note."
      />

      {lead ? (
        <div className="mt-12">
          <RoadmapFeature roadmap={lead} index={0} />
        </div>
      ) : null}

      {rest.length > 0 ? (
        <ul className="mt-2 divide-y divide-line border-b border-line">
          {rest.map((roadmap, i) => (
            <RoadmapIndexRow
              key={roadmap.slug}
              roadmap={roadmap}
              index={i + 1}
            />
          ))}
        </ul>
      ) : null}

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
