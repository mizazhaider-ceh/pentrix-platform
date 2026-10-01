import type { Metadata } from "next";
import { FaqClient } from "./FaqClient";
import { getFaq } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ | The PenTrix",
  description:
    "Honest answers: how to start, what it costs, how long it takes, certs, careers, and practicing legally.",
};

export default function FaqPage() {
  const entries = getFaq();
  return <FaqClient entries={entries} />;
}
