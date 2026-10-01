import type { Metadata } from "next";
import { GlossaryClient } from "./GlossaryClient";
import { getGlossary, getGlossaryCategories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Glossary | The PenTrix",
  description:
    "Cybersecurity terms explained in plain language: web, network, Active Directory, DFIR, reverse engineering, cloud, crypto, and careers.",
};

export default function GlossaryPage() {
  const terms = getGlossary();
  const categories = getGlossaryCategories();
  return <GlossaryClient terms={terms} categories={categories} />;
}
