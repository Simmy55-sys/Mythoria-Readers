"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Bookmark,
  BookmarkIcon,
  Eye,
  Heart,
  Play,
  Share2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SeriesDetailsResponse } from "@/api/types";
import { allSeries } from "@/routes/client";
import { toast } from "sonner";

export interface CoverAndActionsProps {
  series: SeriesDetailsResponse;
  chaptersLength: number;
  lastReadChapter: number | null;
  isBookmarked: boolean;
  isBookmarking: boolean;
  isLiked: boolean;
  isLiking: boolean;
  onBookmarkToggle: () => void;
  onLikeToggle: () => void;
}

function formatStat(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toLocaleString();
}

export function CoverAndActions({
  series,
  chaptersLength,
  lastReadChapter,
  isBookmarked,
  isBookmarking,
  isLiked,
  isLiking,
  onBookmarkToggle,
  onLikeToggle,
}: CoverAndActionsProps) {
  const handleShare = async () => {
    const url = window.location.href;
    const title = series.title || "Check out this series";
    const text = `Check out "${title}" on Apex Novel`;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          await navigator.clipboard.writeText(url);
          toast.success("Link copied to clipboard!");
        }
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="sticky top-24">
      <div className="relative mb-6 rounded-lg overflow-hidden shadow-2xl">
        <Image
          src={series.featuredImage || "/placeholder.svg"}
          alt={`Cover of ${series.title}`}
          width={300}
          height={400}
          sizes="(max-width: 768px) 100vw, 300px"
          className="w-full h-auto"
        />
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3 text-sm">
          <Eye className="w-5 h-5 text-primary" />
          <div>
            <p className="text-muted-foreground">Views</p>
            <p className="font-semibold">{formatStat(series.totalViews ?? 0)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Heart className="w-5 h-5 text-primary" />
          <div>
            <p className="text-muted-foreground">Likes</p>
            <p className="font-semibold">{formatStat(series.totalLikes ?? 0)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <BookmarkIcon className="w-5 h-5 text-primary" />
          <div>
            <p className="text-muted-foreground">Bookmarks</p>
            <p className="font-semibold">
              {formatStat(series.totalBookmarks ?? 0)}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {chaptersLength > 0 && (
          <>
            {lastReadChapter != null ? (
              <>
                <Link
                  href={`${allSeries}/${series.slug}/chapter/${lastReadChapter}`}
                  className="block"
                >
                  <button className="w-full bg-secondary hover:bg-secondary/90 text-primary-foreground font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition">
                    <Play className="w-5 h-5" />
                    Continue from Chapter {lastReadChapter}
                  </button>
                </Link>
                <Link
                  href={`${allSeries}/${series.slug}/chapter/1`}
                  className="block"
                >
                  <button className="w-full bg-card hover:bg-card/80 border border-primary/20 text-foreground font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition">
                    Start from Chapter 1
                  </button>
                </Link>
              </>
            ) : (
              <Link
                href={`${allSeries}/${series.slug}/chapter/1`}
                className="block"
              >
                <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition">
                  <Play className="w-5 h-5" />
                  Start Reading
                </button>
              </Link>
            )}
          </>
        )}

        <button
          onClick={onLikeToggle}
          disabled={isLiking}
          className={`w-full bg-card hover:bg-card/80 border ${
            isLiked
              ? "border-primary text-primary"
              : "border-primary/20 text-foreground"
          } font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
          {isLiking ? "Loading..." : isLiked ? "Liked" : "Like"}
        </button>
        <button
          onClick={onBookmarkToggle}
          disabled={isBookmarking}
          className={`w-full bg-card hover:bg-card/80 border ${
            isBookmarked
              ? "border-primary text-primary"
              : "border-primary/20 text-foreground"
          } font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <Bookmark
            className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`}
          />
          {isBookmarking
            ? "Loading..."
            : isBookmarked
              ? "Bookmarked"
              : "Bookmark"}
        </button>
        <button
          onClick={handleShare}
          className="w-full bg-card hover:bg-card/80 border border-primary/20 text-foreground font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <Share2Icon className="w-5 h-5" />
          Share
        </button>
      </div>
    </div>
  );
}
