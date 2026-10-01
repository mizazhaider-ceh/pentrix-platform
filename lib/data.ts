import resourcesJson from "@/data/resources.json";
import roadmapsJson from "@/data/roadmaps.json";

export type CostModel = "free" | "freemium" | "paid";
export type Level = "Beginner" | "Intermediate" | "Advanced";

export interface ResourceCost {
  model: CostModel;
  price?: string;
  priceNote?: string;
}

export interface Resource {
  id: string;
  title: string;
  summary: string;
  url: string;
  domains: string[];
  type: string;
  level: Level;
  cost: ResourceCost;
  language: string;
  lastVerified: string;
}

export interface RoadmapStep {
  title: string;
  whyNext: string;
  resourceIds: string[];
  estMinutes?: number;
}

export interface Roadmap {
  slug: string;
  title: string;
  tagline: string;
  audience: string;
  difficulty: string;
  estWeeks: string | number;
  steps: RoadmapStep[];
}

const resources: Resource[] = resourcesJson as Resource[];
const roadmaps: Roadmap[] = roadmapsJson as Roadmap[];

export function getResources(): Resource[] {
  return resources;
}

export function getResourceById(id: string): Resource | undefined {
  return resources.find((resource) => resource.id === id);
}

export function getRoadmaps(): Roadmap[] {
  return roadmaps;
}

export function getRoadmapBySlug(slug: string): Roadmap | undefined {
  return roadmaps.find((roadmap) => roadmap.slug === slug);
}

export function getDomains(): string[] {
  const domains = new Set<string>();
  for (const resource of resources) {
    for (const domain of resource.domains) {
      domains.add(domain);
    }
  }
  return Array.from(domains).sort();
}

export function getTypes(): string[] {
  const types = new Set<string>();
  for (const resource of resources) {
    types.add(resource.type);
  }
  return Array.from(types).sort();
}
