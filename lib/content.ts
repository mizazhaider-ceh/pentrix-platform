import fs from "node:fs";
import path from "node:path";

const dataDir = path.join(process.cwd(), "data");

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  minutes: number;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
}

export interface CheatSheetRow {
  command: string;
  description: string;
}

export interface CheatSheetSection {
  heading: string;
  rows: CheatSheetRow[];
}

export interface CheatSheet {
  slug: string;
  title: string;
  description: string;
  sections: CheatSheetSection[];
}

export interface FaqEntry {
  question: string;
  answer: string;
}

function readJson<T>(filename: string): T {
  return JSON.parse(
    fs.readFileSync(path.join(dataDir, filename), "utf-8"),
  ) as T;
}

export function getBlogPosts(): BlogPostMeta[] {
  const posts = readJson<BlogPostMeta[]>("blog.json");
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPost(slug: string): { meta: BlogPostMeta; body: string } | undefined {
  const posts = readJson<BlogPostMeta[]>("blog.json");
  const meta = posts.find((p) => p.slug === slug);
  if (!meta) return undefined;
  const body = fs.readFileSync(path.join(dataDir, "blog", `${slug}.md`), "utf-8");
  return { meta, body };
}

export function getGlossary(): GlossaryTerm[] {
  return readJson<GlossaryTerm[]>("glossary.json");
}

export function getGlossaryCategories(): string[] {
  const categories = new Set<string>();
  for (const term of getGlossary()) {
    categories.add(term.category);
  }
  return Array.from(categories).sort();
}

export function getCheatSheets(): CheatSheet[] {
  return readJson<CheatSheet[]>("cheatsheets.json");
}

export function getCheatSheet(slug: string): CheatSheet | undefined {
  return getCheatSheets().find((sheet) => sheet.slug === slug);
}

export function getFaq(): FaqEntry[] {
  return readJson<FaqEntry[]>("faq.json");
}

export function getStartHere(): string {
  return fs.readFileSync(path.join(dataDir, "start-here.md"), "utf-8");
}
