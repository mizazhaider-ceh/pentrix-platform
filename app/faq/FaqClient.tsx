"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import type { FaqEntry } from "@/lib/content";

function FaqItem({ entry, open, onToggle }: { entry: FaqEntry; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-line">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="font-display text-lg font-semibold tracking-tight text-zinc-50">
          {entry.question}
        </span>
        <span
          aria-hidden="true"
          className={`shrink-0 font-mono text-xl text-signal transition-transform duration-200 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      {open ? (
        <p className="max-w-3xl pb-7 leading-relaxed text-zinc-400">
          {entry.answer}
        </p>
      ) : null}
    </div>
  );
}

export function FaqClient({ entries }: { entries: FaqEntry[] }) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16 sm:py-20">
      <SectionHeader
        kicker="FAQ"
        title="Honest answers to the questions everyone asks"
        lede="No marketing, no “it depends” without the follow-up. What it costs, how long it takes, and what actually matters."
      />
      <div className="mt-12 border-t border-line">
        {entries.map((entry, index) => (
          <FaqItem
            key={entry.question}
            entry={entry}
            open={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
          />
        ))}
      </div>
    </main>
  );
}
