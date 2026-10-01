import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCheatSheet, getCheatSheets } from "@/lib/content";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getCheatSheets().map((sheet) => ({ slug: sheet.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const sheet = getCheatSheet(params.slug);
  if (!sheet) {
    return { title: "Cheat sheet not found | The PenTrix" };
  }
  return {
    title: `${sheet.title} cheat sheet | The PenTrix`,
    description: sheet.description,
  };
}

export default function CheatSheetPage({ params }: PageProps) {
  const sheet = getCheatSheet(params.slug);
  if (!sheet) notFound();

  const sheets = getCheatSheets();
  const index = sheets.findIndex((s) => s.slug === sheet.slug);
  const nextSheet = sheets[(index + 1) % sheets.length];

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-20">
      <Link
        href="/cheatsheets"
        className="font-mono text-xs uppercase tracking-[0.14em] text-zinc-500 transition-colors duration-200 hover:text-gold"
      >
        <span aria-hidden="true">←</span> All cheat sheets
      </Link>

      <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-gold">
        Cheat sheet
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
        {sheet.title}
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">
        {sheet.description}
      </p>

      {sheet.sections.map((section) => (
        <section key={section.heading} className="mt-12">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-[0.14em] text-zinc-200">
            {section.heading}
          </h2>
          <div className="mt-4 overflow-hidden rounded-lg border border-line">
            <table className="w-full text-left">
              <tbody className="divide-y divide-line">
                {section.rows.map((row) => (
                  <tr key={row.command} className="bg-surface">
                    <td className="w-1/2 px-4 py-3 align-top sm:w-2/5">
                      <code className="font-mono text-[13px] leading-relaxed text-signal">
                        {row.command}
                      </code>
                    </td>
                    <td className="px-4 py-3 align-top text-sm leading-relaxed text-zinc-400">
                      {row.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <div className="mt-14 border-t border-line pt-8">
        <Link
          href={`/cheatsheets/${nextSheet.slug}`}
          className="font-mono text-sm text-zinc-50 underline decoration-gold decoration-2 underline-offset-4 transition-colors duration-200 hover:text-white"
        >
          Next sheet: {nextSheet.title} →
        </Link>
      </div>
    </main>
  );
}
