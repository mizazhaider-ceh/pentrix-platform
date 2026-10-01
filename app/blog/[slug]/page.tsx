import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/Markdown";
import { getBlogPost, getBlogPosts } from "@/lib/content";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) {
    return { title: "Article not found | The PenTrix" };
  }
  return {
    title: `${post.meta.title} | The PenTrix Blog`,
    description: post.meta.excerpt,
  };
}

function formatDate(iso: string): string {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogArticlePage({ params }: PageProps) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const all = getBlogPosts();
  const index = all.findIndex((p) => p.slug === post.meta.slug);
  const next = index > 0 ? all[index - 1] : undefined;
  const prev = index < all.length - 1 ? all[index + 1] : undefined;

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20">
      <Link
        href="/blog"
        className="font-mono text-xs uppercase tracking-[0.14em] text-zinc-500 transition-colors duration-200 hover:text-gold"
      >
        <span aria-hidden="true">←</span> All articles
      </Link>

      <article className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-gold">
          {formatDate(post.meta.date)} · {post.meta.minutes} min read
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
          {post.meta.title}
        </h1>
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-line py-4">
          <p className="text-sm font-medium text-zinc-200">
            Muhammad Izaz Haider
          </p>
          <p className="font-mono text-xs text-zinc-500">
            Bug bounty hunter · YesWeHack MIHX01
          </p>
          <div className="flex flex-wrap gap-2">
            {post.meta.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-zinc-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <Markdown source={post.body} />
        </div>
      </article>

      <nav
        aria-label="More articles"
        className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2"
      >
        {prev ? (
          <Link
            href={`/blog/${prev.slug}`}
            className="rounded-lg border border-line bg-surface px-5 py-4 transition-colors duration-200 hover:border-line-strong"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
              Older
            </p>
            <p className="mt-2 font-medium text-zinc-100">{prev.title}</p>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/blog/${next.slug}`}
            className="rounded-lg border border-line bg-surface px-5 py-4 text-right transition-colors duration-200 hover:border-line-strong"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
              Newer
            </p>
            <p className="mt-2 font-medium text-zinc-100">{next.title}</p>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}
