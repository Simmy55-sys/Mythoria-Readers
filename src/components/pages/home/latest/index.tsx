"use client";

import { LockKeyhole, StarsIcon } from "lucide-react";
import { MdOutlinePushPin } from "react-icons/md";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getLatestSeriesAction } from "@/server-actions/chapter";
import { Spinner } from "@/components/ui/spinner";
import { allSeries } from "@/routes/client";

interface Chapter {
  id: string;
  chapterNumber: number;
  isPremium: boolean;
  publishDate: string;
}

interface Novel {
  id: string;
  title: string;
  slug: string;
  featuredImage: string;
  recentChapters: Chapter[];
}

function formatDaysAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  }
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return months === 1 ? "1 month ago" : `${months} months ago`;
  }
  const years = Math.floor(diffDays / 365);
  return years === 1 ? "1 year ago" : `${years} years ago`;
}

export default function LatestNovels() {
  const [novels, setNovels] = useState<Novel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestSeries = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getLatestSeriesAction(10);
        if (result.success && result.data) {
          setNovels(result.data);
        } else {
          setError(result.error || "Failed to fetch latest novels");
        }
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
        console.error("Error fetching latest series:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestSeries();
  }, []);

  if (loading) {
    return (
      <section>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center justify-center py-12">
            <Spinner />
          </div>
        </div>
      </section>
    );
  }

  if (error || novels.length === 0) {
    return (
      <section>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">
              {error || "No novels available"}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center gap-2 mb-8">
          <StarsIcon size={24} className="text-primary" fill="currentColor" />
          <h2 className="text-2xl font-bold text-foreground">Latest Novels</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {novels.map((novel) => (
            <Link
              key={novel.id}
              href={`${allSeries}/${novel.slug}`}
              className="group cursor-pointer"
            >
              <div className="relative mb-4 overflow-hidden rounded-lg">
                {novel.featuredImage ? (
                  <img
                    src={novel.featuredImage}
                    alt={novel.title}
                    className="w-full aspect-3/4 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full aspect-3/4 bg-muted group-hover:scale-105 transition-transform duration-300" />
                )}
              </div>

              <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-3">
                {novel.title}
              </h3>

              <div className="space-y-2">
                {novel.recentChapters.slice(0, 4).map((chapter) => (
                  <div
                    key={chapter.id}
                    className="flex items-center justify-between text-xs group/chapter"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={
                          chapter.isPremium
                            ? "text-accent font-semibold"
                            : "text-muted-foreground"
                        }
                      >
                        Chapter {chapter.chapterNumber}
                      </span>
                      {chapter.isPremium && (
                        <LockKeyhole className="w-3 h-3 text-accent" />
                      )}
                    </div>
                    <span className="text-muted-foreground">
                      {formatDaysAgo(chapter.publishDate)}
                    </span>
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
        <Link href={allSeries} className="mt-10 flex w-fit ml-auto">
          <small className="underline text-blue-400 ml-auto">
            See More Novels
          </small>
        </Link>
      </div>
    </section>
  );
}
