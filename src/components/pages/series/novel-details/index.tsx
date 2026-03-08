"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useSearchParams, usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { getSeriesDetailsAction } from "@/server-actions/series";
import {
  bookmarkSeriesAction,
  removeBookmarkAction,
  checkBookmarkAction,
} from "@/server-actions/bookmark";
import {
  likeSeriesAction,
  unlikeSeriesAction,
  checkLikeAction,
} from "@/server-actions/like";
import {
  SeriesDetailsResponse,
  SeriesDetailsChapterResponse,
} from "@/api/types";
import { allSeries } from "@/routes/client";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { login } from "@/routes/client";
import CommentSection from "@/components/comment/comment-section";
import { toast } from "sonner";
import { getLastReadChapter } from "@/utils/reading-progress";
import { getLastReadChapterAction } from "@/server-actions/reading-progress";
import ReviewSection from "./review-section";
import { ContentDialogDrawer } from "@/components/ui/content-dialog-drawer";
import { ScrollText } from "lucide-react";
import { NovelDetailsSkeleton } from "./skeleton";
import { SeriesHero } from "./hero";
import { CoverAndActions } from "./cover-and-actions";
import { OverviewSection } from "./overview-section";
import { ChaptersSection } from "./chapters-section";

export default function NovelDetailsComponent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const slug = params?.slug as string;
  const page = parseInt(searchParams.get("page") || "1", 10);

  const [series, setSeries] = useState<SeriesDetailsResponse | null>(null);
  const [chapters, setChapters] = useState<SeriesDetailsChapterResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isBookmarking, setIsBookmarking] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [chapterNumberInput, setChapterNumberInput] = useState<string>("");
  const [pagination, setPagination] = useState({
    totalChapters: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
  });
  const [lastReadChapter, setLastReadChapterState] = useState<number | null>(
    null
  );

  const pathname = usePathname();
  const redirect = encodeURIComponent(pathname);

  const fetchSeriesDetails = async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    try {
      const result = await getSeriesDetailsAction(slug, page, 20);
      if (result.success && result.data) {
        setSeries(result.data.series);
        setChapters(result.data.chapters);
        setPagination({
          totalChapters: result.data.totalChapters,
          page: result.data.page,
          limit: result.data.limit,
          totalPages: result.data.totalPages,
        });
        if (isAuthenticated) {
          const [bookmarkResult, likeResult] = await Promise.all([
            checkBookmarkAction(result.data.series.id),
            checkLikeAction(result.data.series.id),
          ]);
          if (bookmarkResult.success && bookmarkResult.data)
            setIsBookmarked(bookmarkResult.data.isBookmarked);
          if (likeResult.success && likeResult.data)
            setIsLiked(likeResult.data.isLiked);
        }
      } else {
        setError(result.error || "Failed to fetch series details");
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      console.error("Error fetching series details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeriesDetails();
  }, [slug, page, isAuthenticated]);

  useEffect(() => {
    if (!series?.slug || pagination.totalChapters < 1) return;
    const currentSeries = series;
    let cancelled = false;

    async function loadLastRead() {
      if (isAuthenticated && currentSeries.id) {
        const result = await getLastReadChapterAction(currentSeries.id);
        if (cancelled) return;
        const saved =
          result.success && result.data != null ? result.data : null;
        if (saved !== null && saved >= 1 && saved <= pagination.totalChapters) {
          setLastReadChapterState(saved);
        } else {
          setLastReadChapterState(null);
        }
      } else {
        const saved = getLastReadChapter(currentSeries.slug);
        if (saved !== null && saved >= 1 && saved <= pagination.totalChapters) {
          setLastReadChapterState(saved);
        } else {
          setLastReadChapterState(null);
        }
      }
    }
    loadLastRead();
    return () => {
      cancelled = true;
    };
  }, [series?.slug, series?.id, pagination.totalChapters, isAuthenticated]);

  const handleReadChapter = () => {
    if (!chapterNumberInput || !series) return;
    const chapterNum = parseInt(chapterNumberInput, 10);
    if (chapterNum >= 1 && chapterNum <= pagination.totalChapters) {
      router.push(`${allSeries}/${series.slug}/chapter/${chapterNum}`);
    } else {
      toast.error(
        `Please enter a valid chapter number between 1 and ${pagination.totalChapters}`
      );
    }
  };

  const handleBookmarkToggle = async () => {
    if (!isAuthenticated) {
      router.push(login + "?redirect=" + redirect);
      return;
    }
    if (!series) return;
    setIsBookmarking(true);
    try {
      if (isBookmarked) {
        const result = await removeBookmarkAction(series.id);
        if (result.success) {
          setIsBookmarked(false);
          fetchSeriesDetails();
        }
      } else {
        const result = await bookmarkSeriesAction(series.id);
        if (result.success) {
          setIsBookmarked(true);
          fetchSeriesDetails();
        }
      }
    } catch (err) {
      console.error("Error toggling bookmark:", err);
    } finally {
      setIsBookmarking(false);
    }
  };

  const handleLikeToggle = async () => {
    if (!isAuthenticated) {
      router.push(login + "?redirect=" + redirect);
      return;
    }
    if (!series) return;
    setIsLiking(true);
    try {
      if (isLiked) {
        const result = await unlikeSeriesAction(series.id);
        if (result.success) {
          setIsLiked(false);
          fetchSeriesDetails();
        }
      } else {
        const result = await likeSeriesAction(series.id);
        if (result.success) {
          setIsLiked(true);
          fetchSeriesDetails();
        }
      }
    } catch (err) {
      console.error("Error toggling like:", err);
    } finally {
      setIsLiking(false);
    }
  };

  if (loading) return <NovelDetailsSkeleton />;

  if (error || !series) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 flex items-center justify-center min-h-[60vh]">
          <p className="text-muted-foreground">{error || "Series not found"}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <SeriesHero
        title={series.title}
        author={series.author}
        featuredImage={series.featuredImage}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <CoverAndActions
              series={series}
              chaptersLength={chapters.length}
              lastReadChapter={lastReadChapter}
              isBookmarked={isBookmarked}
              isBookmarking={isBookmarking}
              isLiked={isLiked}
              isLiking={isLiking}
              onBookmarkToggle={handleBookmarkToggle}
              onLikeToggle={handleLikeToggle}
            />
          </div>

          <div className="md:col-span-3">
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-6">
                {series.categories.map((genre) => (
                  <Badge
                    key={genre}
                    className="bg-secondary/20 border border-secondary/30 text-white"
                  >
                    {genre}
                  </Badge>
                ))}
                <span className="px-4 py-2 bg-primary/20 border border-primary/30 rounded-full text-sm font-medium text-primary capitalize">
                  {series.status}
                </span>
              </div>
            </div>

            {series.prologue && (
              <ContentDialogDrawer
                triggerLabel="Read prologue"
                title="Prologue"
                contentHtml={series.prologue}
                triggerIcon={
                  <ScrollText className="h-5 w-5 shrink-0 text-primary" />
                }
              />
            )}

            <OverviewSection description={series.description || ""} />

            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">
                    {series.averageRating > 0
                      ? series.averageRating.toFixed(1)
                      : "4"}
                  </span>
                  <span className="text-muted-foreground">/5.0</span>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-6 h-6 ${
                        i < Math.floor(series.averageRating || 0)
                          ? "fill-primary"
                          : "fill-muted"
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                {series.totalRatings > 0 && (
                  <span className="text-sm text-muted-foreground">
                    ({series.totalRatings} ratings)
                  </span>
                )}
              </div>
              {series.id && (
                <ReviewSection
                  seriesId={series.id}
                  onRatingUpdate={fetchSeriesDetails}
                />
              )}
            </div>

            <ChaptersSection
              seriesSlug={series.slug}
              chapters={chapters}
              totalChapters={pagination.totalChapters}
              page={pagination.page}
              totalPages={pagination.totalPages}
              chapterNumberInput={chapterNumberInput}
              onChapterNumberChange={setChapterNumberInput}
              onReadChapter={handleReadChapter}
            />
          </div>
        </div>

        <div className="mt-12">
          <CommentSection seriesId={series.id} />
        </div>
      </div>
    </main>
  );
}
