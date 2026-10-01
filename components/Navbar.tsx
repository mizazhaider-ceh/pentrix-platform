import Link from "next/link";

const links = [
  { href: "/library", label: "Library" },
  { href: "/roadmaps", label: "Roadmaps" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-app flex-wrap items-center gap-x-8 gap-y-2 px-5 py-4">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="The PenTrix, home"
        >
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 rounded-[2px] bg-signal"
          />
          <span className="font-display text-[17px] font-semibold tracking-tight text-zinc-100">
            The PenTrix
          </span>
        </Link>
        <nav aria-label="Primary" className="ml-auto">
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-zinc-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
