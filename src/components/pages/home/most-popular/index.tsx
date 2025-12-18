"use client";

import { useEffect, useState } from "react";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import { getMostPopularSeriesAction } from "@/server-actions/chapter";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import { allSeries } from "@/routes/client";

interface PopularSeries {
  id: string;
  title: string;
  slug: string;
  featuredImage: string;
  categories: string[];
}

export default function MostPopular() {
  const [series, setSeries] = useState<PopularSeries[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMostPopular = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getMostPopularSeriesAction(9);
        if (result.success && result.data) {
          setSeries(result.data);
        } else {
          setError(result.error || "Failed to fetch most popular series");
        }
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
        console.error("Error fetching most popular series:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMostPopular();
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
        <div className="flex items-center gap-2 mb-8">
          <StarIcon size={24} className="text-primary" fill="currentColor" />
          <h2 className="text-2xl font-bold text-foreground">Most Popular</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {series.map((novel, index) => (
            <Link
              key={novel.id}
              href={`${allSeries}/${novel.slug}`}
              className="flex gap-4 p-4 rounded-lg hover:bg-accent/20 transition-colors group cursor-pointer"
            >
              <div className="shrink-0">
                {novel.featuredImage ? (
                  <Image
                    src={novel.featuredImage}
                    alt={novel.title}
                    width={80}
                    height={96}
                    className="w-20 h-24 rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-20 h-24 rounded-lg bg-muted group-hover:scale-105 transition-transform duration-300" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl font-bold text-accent shrink-0">
                    {index + 1}
                  </span>
                  <h3 className="text-sm font-semibold text-foreground line-clamp-2">
                    {novel.title}
                  </h3>
                </div>

                {novel.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {novel.categories.slice(0, 3).map((genre, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 rounded-full bg-secondary/20 text-secondary border border-secondary/30"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
