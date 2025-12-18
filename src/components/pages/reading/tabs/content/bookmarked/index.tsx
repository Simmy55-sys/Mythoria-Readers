"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import BookmarkedChaptersCard from "./card";
import { Button } from "@/components/ui/button";
import { getUserBookmarksAction } from "@/server-actions/bookmark";
import { BookmarkResponse } from "@/api/types";
import { Spinner } from "@/components/ui/spinner";
import { allSeries } from "@/routes/client";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { login } from "@/routes/client";
import { useRouter } from "next/navigation";

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

export default function BookmarkedChapters() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState<BookmarkResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      router.push(login);
      return;
    }

    const fetchBookmarks = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await getUserBookmarksAction();

        if (result.success && result.data) {
          setBookmarks(result.data);
        } else {
          setError(result.error || "Failed to fetch bookmarks");
        }
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
        console.error("Error fetching bookmarks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [isAuthenticated, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-12 text-center">
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button
          onClick={() => window.location.reload()}
          className="bg-primary hover:bg-primary/90"
        >
          Retry
        </Button>
      </Card>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-muted-foreground mb-4">No bookmarked series yet</p>
        <Link href={allSeries}>
          <Button className="bg-primary hover:bg-primary/90">
            Browse Novels
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {bookmarks.map((bookmark) => (
        <BookmarkedChaptersCard
          key={bookmark.id}
          bookmark={bookmark}
          onRemove={() => {
            // Remove from local state
            setBookmarks(bookmarks.filter((b) => b.id !== bookmark.id));
          }}
        />
      ))}
    </div>
  );
}
