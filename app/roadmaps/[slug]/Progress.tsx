"use client";

import { useEffect, useRef, useState } from "react";
import type { Resource } from "@/lib/data";
import { ResourceCard } from "@/components/ResourceCard";
import { Reveal } from "@/components/Reveal";

export type StepView = {
  index: number;
  title: string;
  whyNext: string;
  estMinutes?: number;
  resources: Resource[];
};

function formatMinutes(minutes: number | undefined): string | null {
  if (typeof minutes !== "number") return null;
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours} h` : `${hours} h ${rest} min`;
}

export function Progress({ slug, steps }: { slug: string; steps: StepView[] }) {
  const storageKey = `pentrix-roadmap-progress:${slug}`;
  const loadedRef = useRef(false);
  const [done, setDone] = useState<number[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setDone(
            parsed.filter(
              (n): n is number => typeof n === "number" && Number.isInteger(n)
            )
          );
        }
      }
    } catch {
      // Corrupt or unavailable storage: start with a clean checklist.
    }
    loadedRef.current = true;
  }, [storageKey]);

  useEffect(() => {
    if (!loadedRef.current) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(done));
    } catch {
      // Storage unavailable (private mode, quota): checklist still works in memory.
    }
  }, [done, storageKey]);

  const toggle = (index: number) =>
    setDone((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index].sort((a, b) => a - b)
    );

  const doneCount = done.length;
  const total = steps.length;
  const percent = total === 0 ? 0 : Math.round((doneCount / total) * 100);

  if (total === 0) {
    return (
      <p className="text-sm text-muted">
        Steps for this roadmap are being written. Check back soon.
      </p>
    );
  }

  return (
    <section aria-label="Roadmap steps">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-display text-lg font-semibold tracking-tight text-zinc-100">
          The sequence
        </h2>
        <p className="font-mono text-sm text-muted">
          {doneCount} of {total} steps
        </p>
      </div>

      <div
        className="mt-3 h-px bg-line"
        role="progressbar"
        aria-valuenow={doneCount}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label="Roadmap progress"
      >
        <div
          className="h-px bg-gold transition-[width] duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-4">
        <p className="text-sm text-muted">
          Tick a step when you finish it. Progress is saved in this browser
          only.
        </p>
        {doneCount > 0 && (
          <button
            type="button"
            onClick={() => setDone([])}
            className="shrink-0 font-mono text-xs uppercase tracking-[0.14em] text-muted underline-offset-4 hover:text-zinc-200 hover:underline"
          >
            Reset
          </button>
        )}
      </div>

      <ol className="mt-10">
        {steps.map((step) => {
          const isDone = done.includes(step.index);
          const number = String(step.index + 1).padStart(2, "0");
          const time = formatMinutes(step.estMinutes);
          return (
            <li
              key={step.index}
              className="relative pb-8 pl-12 last:pb-0 sm:pl-14"
            >
              {step.index < total - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-4 top-10 w-px bg-line"
                />
              )}
              <span
                aria-hidden="true"
                className="absolute left-0 top-1 w-8 font-mono text-sm text-gold"
              >
                {number}
              </span>

              <Reveal>
                <div
                  className={`rounded-xl border p-5 transition-colors duration-200 sm:p-6 ${
                    isDone
                      ? "border-line bg-surface/60"
                      : "border-line bg-surface"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={() => toggle(step.index)}
                        aria-label={`Mark step ${step.index + 1} complete: ${step.title}`}
                        className="mt-1.5 h-4 w-4 shrink-0 accent-gold"
                      />
                      <span
                        className={`text-base font-semibold tracking-tight sm:text-lg ${
                          isDone ? "text-zinc-500" : "text-zinc-100"
                        }`}
                      >
                        {step.title}
                      </span>
                    </label>
                    {time && (
                      <span className="shrink-0 pt-1 font-mono text-xs text-muted">
                        {time}
                      </span>
                    )}
                  </div>

                  {step.whyNext && (
                    <p className="mt-3 font-mono text-[13px] italic leading-relaxed text-muted">
                      <span
                        aria-hidden="true"
                        className="mr-2 inline-block h-1.5 w-1.5 rotate-45 bg-gold align-baseline"
                      />
                      Why this comes next: {step.whyNext}
                    </p>
                  )}

                  {step.resources.length > 0 && (
                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {step.resources.map((resource) => (
                        <li key={resource.id}>
                          <ResourceCard resource={resource} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
