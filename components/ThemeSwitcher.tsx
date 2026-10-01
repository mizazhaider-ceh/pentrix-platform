"use client";

import { useEffect, useState } from "react";

const THEMES = [
  { id: "ink", label: "Ink" },
  { id: "paper", label: "Paper" },
  { id: "phosphor", label: "Phosphor" },
] as const;

type ThemeId = (typeof THEMES)[number]["id"];

const STORAGE_KEY = "pentrix-theme";

function isThemeId(value: unknown): value is ThemeId {
  return value === "ink" || value === "paper" || value === "phosphor";
}

function readTheme(): ThemeId {
  if (typeof document === "undefined") return "ink";
  const value = document.documentElement.getAttribute("data-theme");
  return isThemeId(value) ? value : "ink";
}

function applyTheme(id: ThemeId) {
  document.documentElement.setAttribute("data-theme", id);
  try {
    window.localStorage.setItem(STORAGE_KEY, id);
  } catch {
    // Storage unavailable (private mode, quota): the theme still
    // applies for this visit, it just will not persist.
  }
}

/**
 * Compact segmented theme control for the navbar. The pre-paint
 * script in the root layout already set data-theme before first
 * paint, so this only mirrors that state and handles changes.
 * State starts at "ink" so server and hydration renders match;
 * the effect syncs to the real value after mount.
 */
export function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeId>("ink");

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  return (
    <div
      role="group"
      aria-label="Color theme"
      className="flex items-center rounded-md border border-line bg-surface p-0.5"
    >
      {THEMES.map((option) => {
        const active = option.id === theme;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => {
              setTheme(option.id);
              applyTheme(option.id);
            }}
            aria-pressed={active}
            title={`${option.label} theme`}
            className={`rounded-[5px] px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-200 ${
              active
                ? "bg-surface-raised text-signal"
                : "text-zinc-500 hover:text-zinc-200"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default ThemeSwitcher;
