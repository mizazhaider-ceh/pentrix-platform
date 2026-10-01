import Link from "next/link";
import type { Roadmap } from "@/lib/data";

export function difficultyTone(level: string): string {
  if (/advanced/i.test(level)) {
    return "border-rose-400/30 bg-rose-400/10 text-rose-300";
  }
  if (/intermediate/i.test(level)) {
    return "border-gold/30 bg-gold/10 text-gold";
  }
  return "border-signal/30 bg-signal/10 text-signal";
}

export function DifficultyBadge({ level }: { level: string }) {
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.14em] ${difficultyTone(level)}`}
    >
      {level}
    </span>
  );
}

export function formatWeeks(estWeeks: string | number): string {
  if (typeof estWeeks === "number") {
    return `${estWeeks} ${estWeeks === 1 ? "week" : "weeks"}`;
  }
  return `${estWeeks} weeks`;
}

export function formatSteps(count: number): string {
  return `${count} ${count === 1 ? "step" : "steps"}`;
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/**
 * Editorial feature panel for one roadmap: full-width, left-aligned,
 * hierarchy carried by type size and spacing rather than decoration.
 */
export function RoadmapFeature({
  roadmap,
  index,
}: {
  roadmap: Roadmap;
  index: number;
}) {
  return (
    <Link
      href={`/roadmaps/${roadmap.slug}`}
      className="group block rounded-lg border border-line bg-surface p-7 transition-[border-color] duration-200 hover:border-line-strong sm:p-9"
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <DifficultyBadge level={roadmap.difficulty} />
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
          Roadmap {pad(index + 1)} · {formatWeeks(roadmap.estWeeks)} ·{" "}
          {formatSteps(roadmap.steps.length)}
        </span>
      </div>
      <h3 className="mt-5 font-display text-3xl font-semibold tracking-tight text-zinc-50 transition-colors duration-200 group-hover:text-signal sm:text-4xl">
        {roadmap.title}
      </h3>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-400">
        {roadmap.tagline}
      </p>
      <p className="mt-5 text-sm text-zinc-500">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-600">
          Audience ·{" "}
        </span>
        {roadmap.audience}
      </p>
      <p className="mt-8 font-mono text-sm text-signal">
        Open roadmap{" "}
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-200 group-hover:translate-x-1"
        >
          →
        </span>
      </p>
    </Link>
  );
}

/**
 * Compact index row for roadmap listings: number, title, meta, arrow.
 * Built to hold all ten roadmaps without turning into a card wall.
 */
export function RoadmapIndexRow({
  roadmap,
  index,
}: {
  roadmap: Roadmap;
  index: number;
}) {
  return (
    <li>
      <Link
        href={`/roadmaps/${roadmap.slug}`}
        className="group flex items-center gap-4 py-5 sm:gap-6"
      >
        <span
          aria-hidden="true"
          className="w-8 shrink-0 font-mono text-sm text-zinc-600"
        >
          {pad(index + 1)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-display text-lg font-semibold tracking-tight text-zinc-100 transition-colors duration-200 group-hover:text-signal">
            {roadmap.title}
          </span>
          <span className="mt-0.5 block truncate text-sm text-zinc-500">
            {roadmap.tagline}
          </span>
        </span>
        <span className="hidden shrink-0 md:block">
          <DifficultyBadge level={roadmap.difficulty} />
        </span>
        <span className="hidden shrink-0 font-mono text-xs text-zinc-500 sm:block">
          {formatWeeks(roadmap.estWeeks)} · {formatSteps(roadmap.steps.length)}
        </span>
        <span
          aria-hidden="true"
          className="shrink-0 text-zinc-500 transition-[transform,color] duration-200 group-hover:translate-x-0.5 group-hover:text-zinc-100"
        >
          →
        </span>
      </Link>
    </li>
  );
}
