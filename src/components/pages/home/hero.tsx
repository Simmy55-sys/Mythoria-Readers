"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { getLatestChaptersAction } from "@/server-actions/chapter";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { allSeries } from "@/routes/client";

interface LatestChapter {
  id: string;
  title: string;
  chapterNumber: number;
  publishDate: string;
  seriesId: string;
  series: {
    id: string;
    title: string;
    slug: string;
    featuredImage: string;
    categories: string[];
  };
  contentPreview: string;
}

export default function Hero() {
  const [chapters, setChapters] = useState<LatestChapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchLatestChapters = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getLatestChaptersAction(5); // Get top 5 latest chapters
        if (result.success && result.data) {
          setChapters(result.data);
        } else {
          setError(result.error || "Failed to fetch latest chapters");
        }
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
        console.error("Error fetching latest chapters:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestChapters();
  }, []);

  // Auto-rotate slides
  useEffect(() => {
    if (chapters.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);

      // Small delay to trigger transition
      setTimeout(() => {
        setActiveSlide((prev) => (prev + 1) % chapters.length);
        setIsTransitioning(false);
      }, 50);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [chapters.length]);

  const handleDotClick = useCallback((index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveSlide(index);
      setIsTransitioning(false);
    }, 50);
  }, []);

  if (loading) {
    return (
      <section className="relative h-[500px] overflow-hidden bg-linear-to-r from-background via-background to-background">
        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center justify-center">
          <Spinner />
        </div>
      </section>
    );
  }

  if (error || chapters.length === 0) {
    return (
      <section className="relative h-[500px] overflow-hidden bg-linear-to-r from-background via-background to-background">
        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center justify-center">
          <p className="text-muted-foreground">
            {error || "No chapters available"}
          </p>
        </div>
      </section>
    );
  }

  const currentChapter = chapters[activeSlide];

  return (
    <section className="relative h-[500px] overflow-hidden bg-linear-to-r from-background via-background to-background">
      {/* Background */}
      <div className="absolute inset-0 opacity-20 z-10">
        <div className="absolute inset-0 bg-linear-to-r from-black via-purple-900/30 to-black" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
        {/* Left Content */}
        <div className="w-1/2 pr-8 z-10">
          <div
            className={`space-y-4 transition-opacity duration-500 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
            key={activeSlide}
          >
            <p className="text-muted-foreground text-sm">
              Chapter: {currentChapter.chapterNumber}
            </p>
            <h1 className="text-4xl font-bold text-foreground line-clamp-2">
              {currentChapter.series.title}
            </h1>
            <p className="text-muted-foreground leading-relaxed line-clamp-3">
              {currentChapter.contentPreview}
            </p>

            {/* Tags */}
            {currentChapter.series.categories.length > 0 && (
              <div className="flex gap-2 flex-wrap py-4">
                {currentChapter.series.categories.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-muted text-foreground rounded-full text-sm hover:bg-card transition"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTA Button */}
            <Link
              href={`/series/${currentChapter.series.slug}/chapter/${currentChapter.chapterNumber}`}
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full mt-4 px-4 gap-1"
              >
                Start Reading <ChevronRight size={20} />
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-1/2 h-full relative">
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
            key={`image-${activeSlide}`}
          >
            <img
              src={currentChapter.series.featuredImage || "/placeholder.svg"}
              alt={currentChapter.series.title}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-linear-to-l from-transparent to-background" />
          </div>
        </div>
      </div>

      {/* Navigation dots */}
      {chapters.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {chapters.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeSlide
                  ? "bg-primary w-8"
                  : "bg-muted-foreground/50 w-2 hover:bg-muted-foreground/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
