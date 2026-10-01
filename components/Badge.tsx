const baseBadge =
  "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider";

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 6.5 4.8 9.2 10 2.8" />
    </svg>
  );
}

function LevelIcon({ level }: { level: string }) {
  const normalized = level.trim().toLowerCase();
  const filled =
    normalized === "beginner" ? 1 : normalized === "intermediate" ? 2 : normalized === "advanced" ? 3 : 0;
  return (
    <span aria-hidden="true" className="flex items-end gap-[2px]">
      {[1, 2, 3].map((bar) => (
        <span
          key={bar}
          className={`w-[3px] rounded-[1px] ${
            bar <= filled ? "bg-zinc-300" : "bg-zinc-700"
          }`}
          style={{ height: `${4 + bar * 2}px` }}
        />
      ))}
    </span>
  );
}

export function VerifiedBadge() {
  return (
    <span
      className={`${baseBadge} border-gold/40 text-gold`}
      title="Verified by a human on 2026-10-01"
    >
      <CheckIcon />
      Verified 2026-10-01
    </span>
  );
}

export function CostBadge({
  model,
  price,
}: {
  model: string;
  price?: string;
}) {
  const normalized = model.trim().toLowerCase();
  const label =
    normalized === "free"
      ? "Free"
      : normalized === "freemium"
        ? "Freemium"
        : normalized === "paid"
          ? "Paid"
          : model;
  return (
    <span className={`${baseBadge} border-white/[0.12] text-zinc-300`}>
      {label}
      {price ? <span className="text-zinc-500">, {price}</span> : null}
    </span>
  );
}

export function LevelBadge({ level }: { level: string }) {
  return (
    <span className={`${baseBadge} border-white/[0.12] text-zinc-300`}>
      <LevelIcon level={level} />
      {level}
    </span>
  );
}

export function TagBadge({ label }: { label: string }) {
  return (
    <span className={`${baseBadge} border-white/[0.08] text-zinc-500`}>
      {label}
    </span>
  );
}
