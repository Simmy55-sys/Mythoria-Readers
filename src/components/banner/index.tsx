"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import apiClientManager from "@/api/interface";
import { AnnouncementBanner } from "./announcement-banner";
import { cn } from "@/lib/utils";

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: "info" | "warning" | "success" | "error";
  startDate: string;
  endDate: string | null;
}

export default function BannerComponent() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await apiClientManager.getActiveAnnouncements();
        if (response.success) {
          setAnnouncements(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  // Filter out dismissed announcements
  const visibleAnnouncements = announcements.filter(
    (announcement) => !dismissedIds.has(announcement.id)
  );

  // If no visible announcements, don't render
  if (visibleAnnouncements.length === 0) {
    return null;
  }

  const currentAnnouncement = visibleAnnouncements[currentIndex];

  const handleDismiss = (id: string) => {
    setDismissedIds((prev) => new Set([...prev, id]));

    // If dismissing current announcement, move to next
    if (id === currentAnnouncement.id) {
      if (visibleAnnouncements.length > 1) {
        const nextIndex = (currentIndex + 1) % visibleAnnouncements.length;
        setCurrentIndex(nextIndex);
      }
    }
  };

  const handleNext = () => {
    if (visibleAnnouncements.length <= 1) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % visibleAnnouncements.length);
      setIsTransitioning(false);
    }, 150);
  };

  const handlePrevious = () => {
    if (visibleAnnouncements.length <= 1) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(
        (prev) =>
          (prev - 1 + visibleAnnouncements.length) % visibleAnnouncements.length
      );
      setIsTransitioning(false);
    }, 150);
  };

  const goToIndex = (index: number) => {
    if (index === currentIndex || visibleAnnouncements.length <= 1) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 150);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Announcement with transition */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          isTransitioning
            ? "opacity-0 transform translate-y-[-10px]"
            : "opacity-100 transform translate-y-0"
        )}
      >
        <AnnouncementBanner
          key={currentAnnouncement.id}
          id={currentAnnouncement.id}
          type={currentAnnouncement.type}
          title={currentAnnouncement.title}
          message={currentAnnouncement.content}
          dismissible={true}
          onDismiss={() => handleDismiss(currentAnnouncement.id)}
        />
      </div>

      {/* Navigation Controls - Only show if multiple announcements */}
      {visibleAnnouncements.length > 1 && (
        <div className="absolute bottom-4 right-6 flex items-center gap-3 z-10">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            className="flex items-center justify-center h-7 w-7 rounded-md bg-black/20 hover:bg-black/30 text-white transition-colors"
            aria-label="Previous announcement"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Indicator Dots */}
          <div className="flex items-center gap-1.5">
            {visibleAnnouncements.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-200",
                  index === currentIndex
                    ? "w-6 bg-white"
                    : "w-2 bg-white/50 hover:bg-white/70"
                )}
                aria-label={`Go to announcement ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="flex items-center justify-center h-7 w-7 rounded-md bg-black/20 hover:bg-black/30 text-white transition-colors"
            aria-label="Next announcement"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Counter */}
          <span className="text-xs text-white/80 font-medium min-w-12 text-right">
            {currentIndex + 1} / {visibleAnnouncements.length}
          </span>
        </div>
      )}
    </div>
  );
}
