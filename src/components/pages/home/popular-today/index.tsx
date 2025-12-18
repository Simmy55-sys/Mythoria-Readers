"use client";
import { useEffect, useState } from "react";
import Carousel from "@/components/utility/carousel";
import { FlameIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getPopularTodaySeriesAction } from "@/server-actions/chapter";
import { Spinner } from "@/components/ui/spinner";
import { allSeries } from "@/routes/client";

interface PopularSeries {
  id: string;
  title: string;
  slug: string;
  featuredImage: string;
  categories: string[];
}

export default function PopularToday() {
  const [series, setSeries] = useState<PopularSeries[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularToday = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getPopularTodaySeriesAction(6);
        if (result.success && result.data) {
          setSeries(result.data);
        } else {
          setError(result.error || "Failed to fetch popular series");
        }
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
        console.error("Error fetching popular today series:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularToday();
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

  if (error || series.length === 0) {
    return (
      <section>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">
              {error || "No popular series available"}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <FlameIcon size={24} className="text-primary" fill="currentColor" />
          <h2 className="text-2xl font-bold text-foreground">Popular Today</h2>
        </div>

        {/* Novels Grid */}
        <div className="">
          <Carousel>
            {series.map((novel) => (
              <Link
                key={novel.id}
                href={`${allSeries}/${novel.slug}`}
                className="group cursor-pointer flex justify-center flex-none md:w-1/4 sm:w-1/3 w-1/2 lg:w-1/5"
              >
                <div>
                  <div className="w-[190px] h-[254px] max-lg:w-[140px] max-lg:h-[190px] flex relative overflow-hidden rounded-2xl px-5 pt-16 pb-3 cursor-pointer">
                    {novel.featuredImage ? (
                      <Image
                        src={novel.featuredImage}
                        height={250}
                        width={200}
                        alt={novel.title}
                        className="object-cover absolute inset-0 w-full h-full -z-1"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-muted -z-1" />
                    )}
                    <div className="absolute bg-black/35 inset-0 z-1" />
                    <div className="absolute bg-accent/90 bottom-0 z-1 h-10 left-0 right-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h4 className="font-semibold text-sm">Read More</h4>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 font-semibold text-foreground text-sm line-clamp-2 group-hover:text-primary transition">
                    {novel.title}
                  </h3>

                  {/* Category */}
                  {novel.categories.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {novel.categories[0]}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
