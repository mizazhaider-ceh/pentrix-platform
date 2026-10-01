import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { getBlogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog | The PenTrix",
  description:
    "Field notes from Muhammad Izaz Haider: bug bounty methodology, competition lessons, and the study system behind 60/60 ECTS on the first attempt.",
};

function formatDate(iso: string): string {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogIndexPage() {
  const posts = getBlogPosts();
  const [latest, ...rest] = posts;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeader
        kicker="Blog"
        title="Field notes, not thought leadership"
        lede="Written by Muhammad Izaz Haider, the student behind The PenTrix. Real methodology from real bounties, real competitions, and real exam halls. No generic advice."
      />

      {latest ? (
        <Link
          href={`/blog/${latest.slug}`}
          className="group mt-12 block overflow-hidden rounded-lg border border-line bg-surface transition-colors duration-200 hover:border-line-strong"
        >
          <article className="px-6 py-8 sm:px-10 sm:py-10">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-gold">
              Latest · {formatDate(latest.date)} · {latest.minutes} min read
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold tracking-tight text-zinc-50 transition-colors group-hover:text-signal sm:text-4xl">
              {latest.title}
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">
              {latest.excerpt}
            </p>
            <p className="mt-6 font-mono text-sm text-signal">
              Read the article <span aria-hidden="true">→</span>
            </p>
          </article>
        </Link>
      ) : null}

      <ul className="mt-8 grid gap-5 md:grid-cols-2">
        {rest.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block h-full rounded-lg border border-line bg-surface px-6 py-7 transition-colors duration-200 hover:border-line-strong"
            >
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
                {formatDate(post.date)} · {post.minutes} min read
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-zinc-50 transition-colors group-hover:text-signal">
                {post.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {post.excerpt}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-zinc-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
