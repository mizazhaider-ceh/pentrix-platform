import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/SectionHeader";
import { DifficultyBadge, formatWeeks, formatSteps } from "@/components/RoadmapCard";
import {
  getRoadmapBySlug,
  getRoadmaps,
  getResourceById,
  type Resource,
} from "@/lib/data";
import { Progress, type StepView } from "./Progress";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getRoadmaps().map((roadmap) => ({ slug: roadmap.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const roadmap = getRoadmapBySlug(params.slug);
  if (!roadmap) {
    return { title: "Roadmap not found | The PenTrix" };
  }
  return {
    title: `${roadmap.title} | The PenTrix`,
    description: roadmap.tagline,
  };
}

function MetaCell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="bg-surface px-5 py-4">
      <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        {label}
      </dt>
      <dd className="mt-1.5 text-sm font-medium text-zinc-100">{children}</dd>
    </div>
  );
}

export default function RoadmapDetailPage({ params }: PageProps) {
  const roadmap = getRoadmapBySlug(params.slug);
  if (!roadmap) notFound();

  const steps: StepView[] = roadmap.steps.map((step, index) => ({
    index,
    title: step.title,
    whyNext: step.whyNext,
    estMinutes: step.estMinutes,
    resources: step.resourceIds
      .map((id) => getResourceById(id))
      .filter((resource): resource is Resource => resource !== undefined),
  }));

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16 sm:py-20">
      <Link
        href="/roadmaps"
        className="font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors duration-200 hover:text-gold"
      >
        <span aria-hidden="true">←</span> All roadmaps
      </Link>

      <div className="mt-6">
        <SectionHeader
          kicker="Roadmap"
          title={roadmap.title}
          lede={roadmap.tagline}
        />
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
        <MetaCell label="Audience">{roadmap.audience}</MetaCell>
        <MetaCell label="Difficulty">
          <DifficultyBadge level={roadmap.difficulty} />
        </MetaCell>
        <MetaCell label="Length">{formatWeeks(roadmap.estWeeks)}</MetaCell>
        <MetaCell label="Steps">{formatSteps(roadmap.steps.length)}</MetaCell>
      </dl>

      <div className="mt-12">
        <Progress slug={roadmap.slug} steps={steps} />
      </div>
    </main>
  );
}
