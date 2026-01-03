"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useSearchParams, usePathname } from "next/navigation";
import { PiCoinsThin } from "react-icons/pi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ApplicationPagination from "@/components/utility/pagination";
import {
  Bookmark,
  BookmarkIcon,
  Eye,
  Heart,
  Lock,
  Play,
  Share2Icon,
} from "lucide-react";
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
import { Spinner } from "@/components/ui/spinner";
import { allSeries } from "@/routes/client";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { login } from "@/routes/client";
import CommentSection from "@/components/comment/comment-section";
import { toast } from "sonner";
import ReviewSection from "./review-section";

// Date formatting helper
const formatDate = (date: string | Date) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  return dateObj.toLocaleDateString();
};

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

        // Check bookmark and like status if authenticated
        if (isAuthenticated) {
          const bookmarkResult = await checkBookmarkAction(
            result.data.series.id
          );
          if (bookmarkResult.success && bookmarkResult.data) {
            setIsBookmarked(bookmarkResult.data.isBookmarked);
          }

          const likeResult = await checkLikeAction(result.data.series.id);
          if (likeResult.success && likeResult.data) {
            setIsLiked(likeResult.data.isLiked);
          }
        }
      } else {
        setError(result.error || "Failed to fetch series details");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      console.error("Error fetching series details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeriesDetails();
  }, [slug, page, isAuthenticated]);

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
          // Refresh series data to update bookmark count
          fetchSeriesDetails();
        }
      } else {
        const result = await bookmarkSeriesAction(series.id);
        if (result.success) {
          setIsBookmarked(true);
          // Refresh series data to update bookmark count
          fetchSeriesDetails();
        }
      }
    } catch (err: any) {
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
          // Refresh series data to update like count
          fetchSeriesDetails();
        }
      } else {
        const result = await likeSeriesAction(series.id);
        if (result.success) {
          setIsLiked(true);
          // Refresh series data to update like count
          fetchSeriesDetails();
        }
      }
    } catch (err: any) {
      console.error("Error toggling like:", err);
    } finally {
      setIsLiking(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 flex items-center justify-center min-h-[60vh]">
          <Spinner />
        </div>
      </main>
    );
  }

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
      {/* Hero Section */}
      <div className="relative h-96 bg-linear-to-b from-secondary/20 to-background overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src={series.featuredImage || "/placeholder.svg"}
            alt={series.title}
            fill
            className="object-cover blur-lg"
          />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white">
            <p className="text-sm font-semibold text-primary mb-2">
              FEATURED NOVEL
            </p>
            <h1 className="text-5xl font-bold mb-4 text-balance">
              {series.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              by {series.author}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Cover and Info */}
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <div className="relative mb-6 rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={series.featuredImage || "/placeholder.svg"}
                  alt={series.title}
                  width={300}
                  height={400}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0"></div>
              </div>

              {/* Stats */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Eye className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-muted-foreground">Views</p>
                    <p className="font-semibold">
                      {series.totalViews
                        ? series.totalViews >= 1000000
                          ? `${(series.totalViews / 1000000).toFixed(1)}M`
                          : series.totalViews >= 1000
                          ? `${(series.totalViews / 1000).toFixed(1)}K`
                          : series.totalViews.toLocaleString()
                        : "0"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Heart className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-muted-foreground">Likes</p>
                    <p className="font-semibold">
                      {series.totalLikes
                        ? series.totalLikes >= 1000000
                          ? `${(series.totalLikes / 1000000).toFixed(1)}M`
                          : series.totalLikes >= 1000
                          ? `${(series.totalLikes / 1000).toFixed(1)}K`
                          : series.totalLikes.toLocaleString()
                        : "0"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <BookmarkIcon className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-muted-foreground">Bookmarks</p>
                    <p className="font-semibold">
                      {series.totalBookmarks
                        ? series.totalBookmarks >= 1000000
                          ? `${(series.totalBookmarks / 1000000).toFixed(1)}M`
                          : series.totalBookmarks >= 1000
                          ? `${(series.totalBookmarks / 1000).toFixed(1)}K`
                          : series.totalBookmarks.toLocaleString()
                        : "0"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {chapters.length > 0 && (
                  <Link
                    href={`${allSeries}/${series.slug}/chapter/${
                      chapters[chapters.length - 1].chapterNumber
                    }`}
                    className="block"
                  >
                    <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition">
                      <Play className="w-5 h-5" />
                      Start Reading
                    </button>
                  </Link>
                )}
                <button
                  onClick={handleLikeToggle}
                  disabled={isLiking}
                  className={`w-full bg-card hover:bg-card/80 border ${
                    isLiked
                      ? "border-primary text-primary"
                      : "border-primary/20 text-foreground"
                  } font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <Heart
                    className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`}
                  />
                  {isLiking ? "Loading..." : isLiked ? "Liked" : "Like"}
                </button>
                <button
                  onClick={handleBookmarkToggle}
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
                  onClick={async () => {
                    const url = window.location.href;
                    const title = series?.title || "Check out this series";
                    const text = `Check out "${title}" on Apex Novel`;

                    if (navigator.share) {
                      try {
                        await navigator.share({
                          title,
                          text,
                          url,
                        });
                      } catch (err) {
                        // User cancelled or error occurred
                        if ((err as Error).name !== "AbortError") {
                          // Fallback to clipboard
                          await navigator.clipboard.writeText(url);
                          toast.success("Link copied to clipboard!");
                        }
                      }
                    } else {
                      // Fallback to clipboard
                      await navigator.clipboard.writeText(url);
                      toast.success("Link copied to clipboard!");
                    }
                  }}
                  className="w-full bg-card hover:bg-card/80 border border-primary/20 text-foreground font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
                >
                  <Share2Icon className="w-5 h-5" />
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-3">
            {/* Status and Genres */}
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

            {/* Description */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <div
                className="text-muted-foreground leading-relaxed text-lg [&_p]:mb-4 [&_p]:text-muted-foreground 
                  [&_strong]:text-foreground [&_strong]:font-semibold
                  [&_em]:text-muted-foreground [&_em]:italic
                  [&_ul]:my-4 [&_ul]:pl-6 [&_ul]:list-disc [&_ul]:text-muted-foreground
                  [&_ol]:my-4 [&_ol]:pl-6 [&_ol]:list-decimal [&_ol]:text-muted-foreground
                  [&_li]:my-2 [&_li]:text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: series.description || "" }}
              />
            </div>

            {/* Rating */}
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

              {/* Review Section */}
              {series.id && (
                <ReviewSection
                  seriesId={series.id}
                  onRatingUpdate={() => {
                    // Reload series data to get updated rating
                    fetchSeriesDetails();
                  }}
                />
              )}
            </div>

            {/* Chapters Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Chapters ({pagination.totalChapters})
              </h2>

              {/* Chapter Number Input */}
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
                    min="1"
                    max={pagination.totalChapters}
                    value={chapterNumberInput}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (
                        value === "" ||
                        (parseInt(value, 10) >= 1 &&
                          parseInt(value, 10) <= pagination.totalChapters)
                      ) {
                        setChapterNumberInput(value);
                      }
                    }}
                    placeholder={`1-${pagination.totalChapters}`}
                    className="bg-[#27272A] border-border"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleReadChapter();
                      }
                    }}
                  />
                </div>
                <Button
                  onClick={handleReadChapter}
                  disabled={
                    !chapterNumberInput ||
                    parseInt(chapterNumberInput, 10) < 1 ||
                    parseInt(chapterNumberInput, 10) > pagination.totalChapters
                  }
                  className="rounded bg-accent hover:bg-accent/80 font-bold py-3 text-black disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Read
                </Button>
              </div>

              {/* Chapter List */}
              <div className="space-y-3 max-md:mt-3">
                {chapters.map((chapter) => (
                  <Link
                    key={chapter.id}
                    href={`${allSeries}/${series.slug}/chapter/${chapter.chapterNumber}`}
                    className="block"
                  >
                    <div className="group bg-card/40 hover:bg-card/60 border border-border/20 rounded-lg p-4 transition cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex items-center gap-2">
                            {chapter.isPremium ? (
                              <Lock className="w-5 h-5 text-primary" />
                            ) : (
                              <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/50"></div>
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

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="mt-6">
                  <ApplicationPagination
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    basePath={`${allSeries}/${series.slug}`}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Comments Section */}
        {series && (
          <div className="mt-12">
            <CommentSection seriesId={series.id} />
          </div>
        )}
      </div>
    </main>
  );
}
