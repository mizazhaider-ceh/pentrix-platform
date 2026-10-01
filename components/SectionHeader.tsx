interface SectionHeaderProps {
  kicker: string;
  title: string;
  lede?: string;
}

export function SectionHeader({ kicker, title, lede }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-gold">
        {kicker}
      </p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">
        {title}
      </h2>
      {lede ? (
        <p className="mt-4 text-base leading-relaxed text-zinc-400">{lede}</p>
      ) : null}
    </div>
  );
}

export default SectionHeader;
