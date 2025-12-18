"use client";

import { useState, useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Share2,
  Menu,
  X,
  Lock,
} from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getChapterBySlugAction } from "@/server-actions/series";
import {
  bookmarkSeriesAction,
  removeBookmarkAction,
  checkBookmarkAction,
} from "@/server-actions/bookmark";
import { purchaseChapterAction } from "@/server-actions/purchase";
import { ChapterReaderResponse } from "@/api/types";
import { Spinner } from "@/components/ui/spinner";
import { allSeries, login, purchase } from "@/routes/client";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { PiCoinsThin } from "react-icons/pi";
import { toast } from "sonner";

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

export default function ChapterReaderPage({
  params,
}: {
  params: { slug: string; chapter: string };
}) {
  const urlParams = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const slug = (urlParams?.slug || params?.slug) as string;
  const chapterNumber = parseInt(
    (urlParams?.chapter || params?.chapter) as string,
    10
  );

  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.8);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isBookmarking, setIsBookmarking] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [chapterData, setChapterData] = useState<ChapterReaderResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pathname = usePathname();
  const redirect = encodeURIComponent(pathname);

  useEffect(() => {
    const fetchChapter = async () => {
      if (!slug || isNaN(chapterNumber)) return;

      setLoading(true);
      setError(null);

      try {
        const result = await getChapterBySlugAction(slug, chapterNumber);

        if (result.success && result.data) {
          setChapterData(result.data);

          // Check bookmark status if authenticated
          if (isAuthenticated && result.data.series) {
            const bookmarkResult = await checkBookmarkAction(
              result.data.series.id
            );
            if (bookmarkResult.success && bookmarkResult.data) {
              setIsBookmarked(bookmarkResult.data.isBookmarked);
            }
          }
        } else {
          const errorMessage = result.error || "Failed to fetch chapter";
          console.error("Failed to fetch chapter:", errorMessage, result);
          setError(errorMessage);
        }
      } catch (err: any) {
        const errorMessage = err.message || "An unexpected error occurred";
        console.error("Error fetching chapter:", err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchChapter();
  }, [slug, chapterNumber, isAuthenticated]);

  const handleBookmarkToggle = async () => {
    if (!isAuthenticated) {
      router.push(login + "?redirect=" + redirect);
      return;
    }

    if (!chapterData?.series) return;

    setIsBookmarking(true);
    try {
      if (isBookmarked) {
        const result = await removeBookmarkAction(chapterData.series.id);
        if (result.success) {
          setIsBookmarked(false);
        }
      } else {
        const result = await bookmarkSeriesAction(chapterData.series.id);
        if (result.success) {
          setIsBookmarked(true);
        }
      }
    } catch (err: any) {
      console.error("Error toggling bookmark:", err);
    } finally {
      setIsBookmarking(false);
    }
  };

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      router.push(`${login}?redirect=${redirect}`);
      return;
    }

    if (!chapterData?.chapter?.id) return;

    setIsPurchasing(true);
    setError(null);
    try {
      const result = await purchaseChapterAction(chapterData.chapter.id);
      if (result.success) {
        toast.success("Chapter purchased successfully!", {
          duration: 3000,
        });

        // Small delay to ensure backend transaction is committed
        await new Promise((resolve) => setTimeout(resolve, 300));

        // Force router refresh to clear any cached data
        router.refresh();

        // Refresh chapter data to show content
        const refreshResult = await getChapterBySlugAction(slug, chapterNumber);
        if (refreshResult.success && refreshResult.data) {
          setChapterData(refreshResult.data);
        }
      } else {
        toast.error(result.error || "An unexpected error occurred", {
          style: {
            "--normal-bg":
              "color-mix(in oklab, var(--destructive) 10%, var(--background))",
            "--normal-text": "var(--destructive)",
            "--normal-border": "var(--destructive)",
          } as React.CSSProperties,
          duration: Infinity,
          closeButton: true,
          action: {
            label: "Purchase coins",
            onClick: () => router.push(purchase),
          },
        });
      }
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred", {
        style: {
          "--normal-bg":
            "color-mix(in oklab, var(--destructive) 10%, var(--background))",
          "--normal-text": "var(--destructive)",
          "--normal-border": "var(--destructive)",
        } as React.CSSProperties,
        duration: Infinity,
        closeButton: true,
        action: {
          label: "Purchase coins",
          onClick: () => router.push(purchase),
        },
      });
      console.error("Error purchasing chapter:", err);
    } finally {
      setIsPurchasing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error || !chapterData) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            {error || "Chapter not found"}
          </p>
          <Link href={`${allSeries}/${slug}`}>
            <Button>Back to Series</Button>
          </Link>
        </div>
      </div>
    );
  }

  const { chapter, prevChapter, nextChapter, series } = chapterData;
  const isPremiumLocked = chapter.isPremium && !chapter.content;

  // Format chapter content
  const chapterContent = chapter.content
    ? chapter.content.split("\n\n").map((paragraph, idx) => (
        <p
          key={idx}
          className="mb-6 leading-relaxed text-justify transition-all"
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: lineHeight,
          }}
        >
          {paragraph
            .split(/(\*\*.*?\*\*|~~~.*?~~~|\*.*?\*|`.*?`)/g)
            .map((segment, i) => {
              if (segment.startsWith("**") && segment.endsWith("**")) {
                return (
                  <strong key={i} className="text-primary font-bold">
                    {segment.slice(2, -2)}
                  </strong>
                );
              }
              if (segment.startsWith("~~~") && segment.endsWith("~~~")) {
                return (
                  <span
                    key={i}
                    className="italic text-center block my-4 text-primary font-semibold"
                  >
                    {segment.slice(3, -3)}
                  </span>
                );
              }
              if (segment.startsWith("*") && segment.endsWith("*")) {
                return (
                  <em key={i} className="italic text-secondary">
                    {segment.slice(1, -1)}
                  </em>
                );
              }
              if (segment.startsWith("`") && segment.endsWith("`")) {
                return (
                  <span
                    key={i}
                    className="px-2 py-1 bg-card rounded text-accent font-mono text-sm"
                  >
                    {segment.slice(1, -1)}
                  </span>
                );
              }
              return segment;
            })}
        </p>
      ))
    : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href={`${allSeries}/${slug}`}
            className="hover:text-primary transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-bold truncate">{series.title}</h1>
            <p className="text-sm text-muted-foreground">
              Chapter {chapter.chapterNumber}: {chapter.title}
            </p>
          </div>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-primary/20 rounded-lg transition"
          >
            {showMenu ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 lg:px-8">
        {/* Reading Controls */}
        {showMenu && (
          <div className="mb-8 p-6 bg-card rounded-lg border border-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Font Size
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                    className="px-3 py-2 bg-primary/20 hover:bg-primary/30 rounded transition text-sm"
                  >
                    A-
                  </button>
                  <button
                    onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                    className="px-3 py-2 bg-primary/20 hover:bg-primary/30 rounded transition text-sm"
                  >
                    A+
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Line Height
                </label>
                <Select
                  value={String(lineHeight)}
                  onValueChange={(value) =>
                    setLineHeight(Number.parseFloat(value))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select line height" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={String(1.4)}>Compact</SelectItem>
                    <SelectItem value={String(1.6)}>Normal</SelectItem>
                    <SelectItem value={String(1.8)}>Relaxed</SelectItem>
                    <SelectItem value={String(2)}>Loose</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end gap-2">
                <button
                  onClick={handleBookmarkToggle}
                  disabled={isBookmarking}
                  className={`flex-1 px-4 py-2 rounded transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isBookmarked
                      ? "bg-primary/30 text-primary"
                      : "bg-card border border-border hover:border-primary"
                  }`}
                >
                  <Bookmark
                    className="w-4 h-4"
                    fill={isBookmarked ? "currentColor" : "none"}
                  />
                  <span className="text-sm">
                    {isBookmarking
                      ? "Loading..."
                      : isBookmarked
                      ? "Bookmarked"
                      : "Bookmark"}
                  </span>
                </button>
              </div>

              <div className="flex items-end">
                <Button
                  variant="ghost"
                  className="flex-1 px-4 py-2 border border-border rounded hover:border-secondary transition flex items-center justify-center gap-2 hover:bg-transparent hover:text-white"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Share</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Chapter Title */}
        <div className="mb-8 text-center border-b border-border pb-8">
          <h2 className="text-3xl font-bold mb-2 text-primary">
            Chapter {chapter.chapterNumber}
          </h2>
          <h3 className="text-xl text-muted-foreground mb-4">
            {chapter.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            Released {formatDate(chapter.publishDate)}
          </p>
        </div>

        {/* Premium Chapter Lock */}
        {isPremiumLocked && (
          <div className="mb-12 p-8 bg-card rounded-lg border-2 border-primary/50 text-center">
            <Lock className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-2">Premium Chapter</h3>
            {!isAuthenticated ? (
              <>
                <p className="text-muted-foreground mb-4">
                  This chapter requires payment to unlock. You need to be logged
                  in to purchase chapters.
                </p>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <PiCoinsThin className="w-6 h-6 text-accent" />
                  <span className="text-2xl font-bold text-accent">
                    {chapter.priceInCoins || 20} Coins
                  </span>
                </div>
                <Link href={`${login}?redirect=${redirect}`}>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Login to Purchase
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <p className="text-muted-foreground mb-6">
                  This chapter requires payment to unlock. Purchase it to
                  continue reading!
                </p>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <PiCoinsThin className="w-6 h-6 text-accent" />
                  <span className="text-2xl font-bold text-accent">
                    {chapter.priceInCoins || 20} Coins
                  </span>
                </div>
                <Button
                  onClick={handlePurchase}
                  disabled={isPurchasing}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPurchasing ? (
                    <>
                      <Spinner className="mr-2 w-4 h-4" />
                      Purchasing...
                    </>
                  ) : (
                    "Purchase Chapter"
                  )}
                </Button>
                {error && (
                  <p className="mt-4 text-sm text-destructive">{error}</p>
                )}
              </>
            )}
          </div>
        )}

        {/* Chapter Content */}
        {!isPremiumLocked && (
          <article className="prose prose-invert max-w-none mb-12">
            {chapterContent || (
              <p className="text-muted-foreground">No content available.</p>
            )}
          </article>
        )}

        {/* Chapter Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 pt-8 border-t border-border">
          {prevChapter ? (
            <Link
              href={`${allSeries}/${slug}/chapter/${prevChapter.chapterNumber}`}
              className="p-4 bg-card border border-border rounded-lg hover:border-primary hover:bg-card/50 transition group"
            >
              <div className="flex items-center gap-2 text-primary mb-2 group-hover:translate-x-[-4px] transition">
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm">Previous Chapter</span>
              </div>
              <p className="font-semibold text-foreground">
                Chapter {prevChapter.chapterNumber}: {prevChapter.title}
              </p>
              {prevChapter.isPremium && (
                <div className="flex items-center gap-1 mt-2 text-sm text-accent">
                  <Lock className="w-4 h-4" />
                  <span>Premium</span>
                </div>
              )}
            </Link>
          ) : (
            <div className="p-4 bg-card/50 border border-border rounded-lg opacity-50">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm">Previous Chapter</span>
              </div>
              <p className="font-semibold text-muted-foreground">
                No previous chapter
              </p>
            </div>
          )}

          {nextChapter ? (
            <Link
              href={`${allSeries}/${slug}/chapter/${nextChapter.chapterNumber}`}
              className="p-4 bg-card border border-border rounded-lg hover:border-primary hover:bg-card/50 transition group text-right"
            >
              <div className="flex items-center justify-end gap-2 text-primary mb-2 group-hover:translate-x-[4px] transition">
                <span className="text-sm">Next Chapter</span>
                <ChevronRight className="w-5 h-5" />
              </div>
              <p className="font-semibold text-foreground">
                Chapter {nextChapter.chapterNumber}: {nextChapter.title}
              </p>
              {nextChapter.isPremium && (
                <div className="flex items-center justify-end gap-1 mt-2 text-sm text-accent">
                  <Lock className="w-4 h-4" />
                  <span>Premium</span>
                </div>
              )}
            </Link>
          ) : (
            <div className="p-4 bg-card/50 border border-border rounded-lg opacity-50 text-right">
              <div className="flex items-center justify-end gap-2 text-muted-foreground mb-2">
                <span className="text-sm">Next Chapter</span>
                <ChevronRight className="w-5 h-5" />
              </div>
              <p className="font-semibold text-muted-foreground">
                No next chapter available
              </p>
            </div>
          )}
        </div>

        {/* Comment Section Teaser */}
        {!isPremiumLocked && (
          <div className="mt-12 p-6 bg-card rounded-lg border border-border text-center">
            <h4 className="font-semibold mb-2">Join the Discussion</h4>
            <p className="text-muted-foreground mb-4">
              What did you think of this chapter? Share your thoughts with other
              readers!
            </p>
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition">
              View Comments
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
