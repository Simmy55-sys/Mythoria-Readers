"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import OngoingNovelCard from "./card";
import { getOngoingSeriesAction } from "@/server-actions/reading-progress";
import { OngoingSeriesItem } from "@/api/types";
import { Skeleton } from "@/components/ui/skeleton";
import { allSeries } from "@/routes/client";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { login } from "@/routes/client";
import { usePathname, useRouter } from "next/navigation";

export default function OngoingNovelReads() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [ongoing, setOngoing] = useState<OngoingSeriesItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pathname = usePathname();
  const redirect = encodeURIComponent(pathname);

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      router.push(login + "?redirect=" + redirect);
      return;
    }

    const fetchOngoing = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await getOngoingSeriesAction();

        if (result.success && result.data) {
          setOngoing(result.data);
        } else {
          setError(result.error || "Failed to load ongoing series");
        }
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
        console.error("Error fetching ongoing series:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOngoing();
  }, [isAuthenticated, authLoading, router, redirect]);

  if (authLoading || loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border/80 bg-card/50 p-2"
          >
            <div className="flex gap-5 sm:gap-6">
              <Skeleton className="aspect-3/4 w-28 shrink-0 rounded-xl sm:w-32 bg-muted" />
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div>
                  <Skeleton className="h-5 w-full bg-muted" />
                  <Skeleton className="mt-2 h-5 w-3/4 bg-muted" />
                  <Skeleton className="mt-1.5 h-3 w-24 bg-muted" />
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Skeleton className="h-9 w-24 rounded-md bg-muted" />
                  <Skeleton className="h-4 w-20 bg-muted" />
                </div>
              </div>
            </div>
          </div>
        ))}
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

  if (ongoing.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-muted-foreground mb-4">
          No ongoing novels yet. Series you’ve read at least 3 chapters of will
          appear here.
        </p>
        <Link href={allSeries}>
          <Button className="bg-primary hover:bg-primary/90">
            Browse Novels
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {ongoing.map((item) => (
        <OngoingNovelCard key={item.seriesId} item={item} />
      ))}
    </div>
  );
}
