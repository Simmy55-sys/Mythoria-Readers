"use client";

import Image from "next/image";

export interface SeriesHeroProps {
  title: string;
  author: string;
  featuredImage: string | null;
}

export function SeriesHero({ title, author, featuredImage }: SeriesHeroProps) {
  return (
    <div className="relative h-96 bg-linear-to-b from-secondary/20 to-background overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <Image
          src={featuredImage || "/placeholder.svg"}
          alt=""
          fill
          sizes="100vw"
          className="object-cover blur-lg"
          role="presentation"
        />
      </div>
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-sm font-semibold text-primary mb-2">
            FEATURED NOVEL
          </p>
          <h1 className="text-5xl font-bold mb-4 text-balance">{title}</h1>
          <p className="text-lg text-muted-foreground mb-6">by {author}</p>
        </div>
      </div>
    </div>
  );
}
