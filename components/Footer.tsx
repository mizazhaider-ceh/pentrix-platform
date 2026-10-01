import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08]">
      <div className="mx-auto max-w-app px-5 py-12">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="inline-block h-2.5 w-2.5 rounded-[2px] bg-signal"
              />
              <span className="font-display text-base font-semibold tracking-tight text-zinc-100">
                The PenTrix
              </span>
            </p>
            <p className="mt-3 text-sm text-zinc-400">
              Learn cybersecurity in the right order.
            </p>
            <p className="mt-2 font-mono text-xs text-zinc-500">
              Free forever. Verified 2026-10-01.
            </p>
          </div>

          <nav aria-label="Footer" className="flex gap-16">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                Learn
              </p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <Link
                    href="/start-here"
                    className="text-sm text-zinc-400 transition-colors duration-200 hover:text-zinc-100"
                  >
                    Start here
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-sm text-zinc-400 transition-colors duration-200 hover:text-zinc-100"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cheatsheets"
                    className="text-sm text-zinc-400 transition-colors duration-200 hover:text-zinc-100"
                  >
                    Cheat sheets
                  </Link>
                </li>
                <li>
                  <Link
                    href="/glossary"
                    className="text-sm text-zinc-400 transition-colors duration-200 hover:text-zinc-100"
                  >
                    Glossary
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-sm text-zinc-400 transition-colors duration-200 hover:text-zinc-100"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                Explore
              </p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <Link
                    href="/library"
                    className="text-sm text-zinc-400 transition-colors duration-200 hover:text-zinc-100"
                  >
                    Library
                  </Link>
                </li>
                <li>
                  <Link
                    href="/roadmaps"
                    className="text-sm text-zinc-400 transition-colors duration-200 hover:text-zinc-100"
                  >
                    Roadmaps
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools"
                    className="text-sm text-zinc-400 transition-colors duration-200 hover:text-zinc-100"
                  >
                    Tools
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-zinc-400 transition-colors duration-200 hover:text-zinc-100"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-zinc-500">Built by a student, for students.</p>
          <a
            href="https://github.com/mizazhaider-ceh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 transition-colors duration-200 hover:text-signal"
          >
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
            github.com/mizazhaider-ceh
          </a>
        </div>
      </div>
    </footer>
  );
}
