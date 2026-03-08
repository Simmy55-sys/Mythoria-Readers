"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { OngoingSeriesItem } from "@/api/types";
import { allSeries } from "@/routes/client";
import { BookOpen, ChevronRight } from "lucide-react";

const formatDate = (date: string | Date) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return dateObj.toLocaleDateString();
};

const statusColor = (status: string) =>
  status === "completed"
    ? "bg-green-500"
    : status === "on-hold"
      ? "bg-yellow-500"
      : status === "cancelled"
        ? "bg-red-500"
        : "bg-indigo-500";

export default function OngoingNovelCard({
  item,
}: {
  item: OngoingSeriesItem;
}) {
  const nextChapter = item.lastChapterNumber;

  return (
    <Card className="group overflow-hidden border border-border/80 bg-card/50 backdrop-blur-sm transition-all duration-300 cursor-pointer hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5 max-w-xl">
      <div className="flex gap-5 p-1 sm:gap-6 sm:p-2">
        {/* Cover */}
        <Link
          href={`${allSeries}/${item.slug}`}
          className="relative shrink-0 overflow-hidden rounded-xl"
        >
          <div className="relative aspect-3/4 w-28 sm:w-32">
            <Image
              fill
              src={item.featuredImage || "/placeholder.svg"}
              alt={item.title}
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 112px, 128px"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
          <span className="absolute bottom-2 left-2 rounded-md bg-black/70 px-2 py-0.5 text-sm font-medium text-accent backdrop-blur-sm">
            Ch. {item.lastChapterNumber}
          </span>
          {item.status && (
            <span
              className={`absolute right-2 top-2 rounded-md px-2 py-0.5 text-xs font-medium text-white ${statusColor(item.status)}`}
            >
              {item.status}
            </span>
          )}
        </Link>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col justify-between text-left">
          <div>
            <Link href={`${allSeries}/${item.slug}`}>
              <h3 className="line-clamp-2 text-lg font-semibold leading-tight text-foreground transition-colors group-hover:text-primary sm:text-xl">
                {item.title}
              </h3>
            </Link>
            <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
              Last read {formatDate(item.updatedAt)}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link href={`${allSeries}/${item.slug}/chapter/${nextChapter}`}>
              <Button
                size="sm"
                className="gap-1.5 bg-primary font-medium hover:bg-primary/90"
              >
                <BookOpen className="h-4 w-4" />
                Continue
              </Button>
            </Link>
            <Link
              href={`${allSeries}/${item.slug}`}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              View series
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
