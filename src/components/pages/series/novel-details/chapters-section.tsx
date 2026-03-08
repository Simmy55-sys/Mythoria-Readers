"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { PiCoinsThin } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ApplicationPagination from "@/components/utility/pagination";
import { formatDate } from "@/utils/format-date";
import { allSeries } from "@/routes/client";
import { SeriesDetailsChapterResponse } from "@/api/types";

export interface ChaptersSectionProps {
  seriesSlug: string;
  chapters: SeriesDetailsChapterResponse[];
  totalChapters: number;
  page: number;
  totalPages: number;
  chapterNumberInput: string;
  onChapterNumberChange: (value: string) => void;
  onReadChapter: () => void;
}

export function ChaptersSection({
  seriesSlug,
  chapters,
  totalChapters,
  page,
  totalPages,
  chapterNumberInput,
  onChapterNumberChange,
  onReadChapter,
}: ChaptersSectionProps) {
  const canRead =
    chapterNumberInput &&
    parseInt(chapterNumberInput, 10) >= 1 &&
    parseInt(chapterNumberInput, 10) <= totalChapters;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Chapters ({totalChapters})
      </h2>

      <div className="mb-6 flex gap-2 items-end">
        <div className="flex-1 max-w-xs">
          <label
            htmlFor="chapter-number"
            className="block text-sm font-medium mb-2 text-foreground"
          >
            Enter Chapter Number
          </label>
          <Input
            id="chapter-number"
            type="number"
            min={1}
            max={totalChapters}
            value={chapterNumberInput}
            onChange={(e) => {
              const value = e.target.value;
              if (
                value === "" ||
                (parseInt(value, 10) >= 1 &&
                  parseInt(value, 10) <= totalChapters)
              ) {
                onChapterNumberChange(value);
              }
            }}
            placeholder={`1-${totalChapters}`}
            className="bg-[#27272A] border-border"
            onKeyDown={(e) => e.key === "Enter" && onReadChapter()}
          />
        </div>
        <Button
          onClick={onReadChapter}
          disabled={!canRead}
          className="rounded bg-accent hover:bg-accent/80 font-bold py-3 text-black disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Read
        </Button>
      </div>

      <div className="space-y-3 max-md:mt-3">
        {chapters.map((chapter) => (
          <Link
            key={chapter.id}
            href={`${allSeries}/${seriesSlug}/chapter/${chapter.chapterNumber}`}
            className="block"
          >
            <div className="group bg-card/40 hover:bg-card/60 border border-border/20 rounded-lg p-4 transition cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center gap-2">
                    {chapter.isPremium ? (
                      <Lock className="w-5 h-5 text-primary" />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/50" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition">
                      Chapter {chapter.chapterNumber}
                      {chapter.title && `: ${chapter.title}`}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(chapter.publishDate)}
                    </p>
                  </div>
                </div>
                {chapter.isPremium && (
                  <div className="flex items-center gap-1.5 text-sm text-accent">
                    <PiCoinsThin className="size-4 group-hover:text-primary transition transform group-hover:translate-y-1 text-accent" />
                    {chapter.priceInCoins || 20}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-6">
          <ApplicationPagination
            currentPage={page}
            totalPages={totalPages}
            basePath={`${allSeries}/${seriesSlug}`}
          />
        </div>
      )}
    </div>
  );
}
