import type { ReactNode } from "react";

/**
 * Minimal Markdown renderer for authored content pages (blog, start here).
 * Supports: fenced code blocks, ## / ### headings, blockquotes, ordered and
 * unordered lists, paragraphs, **bold**, `inline code`, and [links](url).
 * Authored content is ours, so we escape HTML first and render our own tags.
 */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <span key={key++} dangerouslySetInnerHTML={{ __html: text.slice(lastIndex, match.index) }} />,
      );
    }
    const token = match[0];
    if (token.startsWith("**")) {
      parts.push(
        <strong key={key++} className="font-semibold text-zinc-50">
          {renderInline(token.slice(2, -2))}
        </strong>,
      );
    } else if (token.startsWith("`")) {
      parts.push(
        <code
          key={key++}
          className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-signal"
        >
          {token.slice(1, -1)}
        </code>,
      );
    } else {
      const label = token.slice(1, token.indexOf("]"));
      const url = token.slice(token.indexOf("](") + 2, -1);
      const external = /^https?:\/\//.test(url);
      parts.push(
        <a
          key={key++}
          href={url}
          className="font-medium text-signal underline decoration-signal/40 underline-offset-2 transition-colors hover:decoration-signal"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {label}
        </a>,
      );
    }
    lastIndex = match.index + token.length;
  }
  if (lastIndex < text.length) {
    parts.push(
      <span key={key++} dangerouslySetInnerHTML={{ __html: text.slice(lastIndex) }} />,
    );
  }
  return parts;
}

export function Markdown({ source }: { source: string }) {
  const lines = escapeHtml(source).split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i += 1;
      }
      i += 1; // consume closing fence
      blocks.push(
        <div key={key++} className="my-6 overflow-hidden rounded-lg border border-line bg-ink-soft">
          {lang ? (
            <div className="border-b border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
              {lang}
            </div>
          ) : null}
          <pre className="overflow-x-auto px-4 py-4 font-mono text-[13px] leading-relaxed text-zinc-200">
            <code>{codeLines.join("\n")}</code>
          </pre>
        </div>,
      );
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={key++} className="mt-10 font-display text-xl font-semibold tracking-tight text-zinc-50">
          {renderInline(line.slice(4))}
        </h3>,
      );
      i += 1;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={key++} className="mt-12 font-display text-2xl font-semibold tracking-tight text-zinc-50">
          {renderInline(line.slice(3))}
        </h2>,
      );
      i += 1;
      continue;
    }
    if (line.startsWith("# ")) {
      blocks.push(
        <h2 key={key++} className="mt-2 font-display text-3xl font-semibold tracking-tight text-zinc-50">
          {renderInline(line.slice(2))}
        </h2>,
      );
      i += 1;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      blocks.push(
        <blockquote key={key++} className="my-6 border-l-2 border-gold pl-5 italic leading-relaxed text-zinc-300">
          {renderInline(line.slice(2))}
        </blockquote>,
      );
      i += 1;
      continue;
    }

    // Unordered list
    if (/^[-*] /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*] /.test(lines[i])) {
        items.push(lines[i].slice(2));
        i += 1;
      }
      blocks.push(
        <ul key={key++} className="my-5 space-y-2.5">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-3 leading-relaxed text-zinc-300">
              <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    // Ordered list
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, ""));
        i += 1;
      }
      blocks.push(
        <ol key={key++} className="my-5 space-y-2.5">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-3 leading-relaxed text-zinc-300">
              <span aria-hidden="true" className="shrink-0 font-mono text-sm text-gold">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ol>,
      );
      continue;
    }

    // Blank line
    if (line.trim() === "") {
      i += 1;
      continue;
    }

    // Paragraph
    blocks.push(
      <p key={key++} className="my-5 leading-[1.8] text-zinc-300">
        {renderInline(line)}
      </p>,
    );
    i += 1;
  }

  return <div className="markdown-body">{blocks}</div>;
}
