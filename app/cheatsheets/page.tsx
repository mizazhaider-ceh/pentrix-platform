import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { getCheatSheets } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cheat sheets | The PenTrix",
  description:
    "Copy-paste command references for Linux, networking, web pentesting, Windows and AD, git, and bash scripting.",
};

export default function CheatSheetsPage() {
  const sheets = getCheatSheets();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeader
        kicker="Cheat sheets"
        title="Commands you will actually type"
        lede="Six reference sheets with the commands and flags that matter, each with a one-line explanation. Copy, paste, learn."
      />

      <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {sheets.map((sheet) => {
          const commandCount = sheet.sections.reduce(
            (total, section) => total + section.rows.length,
            0,
          );
          return (
            <li key={sheet.slug}>
              <Link
                href={`/cheatsheets/${sheet.slug}`}
                className="group block h-full rounded-lg border border-line bg-surface px-6 py-7 transition-colors duration-200 hover:border-line-strong"
              >
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-gold">
                  {commandCount} commands
                </p>
                <h2 className="mt-3 font-display text-xl font-semibold tracking-tight text-zinc-50 transition-colors group-hover:text-signal">
                  {sheet.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {sheet.description}
                </p>
                <p className="mt-5 font-mono text-sm text-signal">
                  Open the sheet <span aria-hidden="true">→</span>
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
