"use client";

import { HtmlProse } from "@/components/ui/html-prose";

export interface OverviewSectionProps {
  description: string;
}

export function OverviewSection({ description }: OverviewSectionProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      <HtmlProse html={description} />
    </div>
  );
}
