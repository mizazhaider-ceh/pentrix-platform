import type { Metadata } from "next";
import { ToolsClient } from "./ToolsClient";
import { getResources } from "@/lib/data";

export const metadata: Metadata = {
  title: "Tools directory | The PenTrix",
  description:
    "Every tool in the verified library, grouped by domain: recon, web, network, AD, DFIR, cloud, and more.",
};

export default function ToolsPage() {
  const tools = getResources().filter((resource) => resource.type === "Tool");
  return <ToolsClient tools={tools} />;
}
