"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { rateSeriesAction, getUserRatingAction } from "@/server-actions/series";
import { toast } from "sonner";
import { login } from "@/routes/client";
import { useRouter, usePathname } from "next/navigation";

interface ReviewSectionProps {
  seriesId: string;
  onRatingUpdate?: () => void;
}

export default function ReviewSection({
  seriesId,
  onRatingUpdate,
}: ReviewSectionProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingUserRating, setLoadingUserRating] = useState(true);

  useEffect(() => {
    if (isAuthenticated && seriesId) {
      loadUserRating();
    } else {
      setLoadingUserRating(false);
    }
  }, [isAuthenticated, seriesId]);

  const loadUserRating = async () => {
    try {
      setLoadingUserRating(true);
      const result = await getUserRatingAction(seriesId);
      if (result.success) {
        setUserRating(result.data.rating);
      }
    } catch (error) {
      console.error("Failed to load user rating:", error);
    } finally {
      setLoadingUserRating(false);
    }
  };

  const handleRatingClick = async (rating: number) => {
    if (!isAuthenticated) {
      const redirect = encodeURIComponent(pathname || "");
      router.push(`${login}?redirect=${redirect}`);
      return;
    }

    setLoading(true);
    try {
      const result = await rateSeriesAction(seriesId, rating);
      if (result.success) {
        setUserRating(rating);
        toast.success(result.data.message || "Rating submitted successfully!");
        if (onRatingUpdate) {
          onRatingUpdate();
        }
      } else {
        toast.error(result.error || "Failed to submit rating");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to submit rating");
    } finally {
      setLoading(false);
    }
  };

  const displayRating = hoveredRating ?? userRating ?? 0;

  if (!isAuthenticated) {
    return (
      <div className="mb-8 p-4 bg-card border border-border rounded-lg">
        <p className="text-sm text-muted-foreground mb-3">
          Sign in to rate this series
        </p>
        <Button
          onClick={() => {
            const redirect = encodeURIComponent(pathname || "");
            router.push(`${login}?redirect=${redirect}`);
          }}
          variant="outline"
          size="sm"
        >
          Sign In to Rate
        </Button>
      </div>
    );
  }

  return (
    <div className="mb-8 p-4 bg-card border border-border rounded-lg">
      <h3 className="text-lg font-semibold mb-3 text-foreground">
        {userRating ? "Your Rating" : "Rate this Series"}
      </h3>
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingClick(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(null)}
            disabled={loading || loadingUserRating}
            className="transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          >
            <Star
              className={`w-8 h-8 transition-colors ${
                star <= displayRating
                  ? "fill-primary text-primary"
                  : "fill-muted text-muted-foreground"
              }`}
            />
          </button>
        ))}
        {userRating && (
          <span className="ml-2 text-sm text-muted-foreground">
            ({userRating}/5)
          </span>
        )}
      </div>
      {loading && (
        <p className="text-xs text-muted-foreground mt-2">Submitting...</p>
      )}
    </div>
  );
}

