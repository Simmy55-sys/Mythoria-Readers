"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NovelCard {
  id: number;
  title: string;
  description: string;
  image: string;
  author: string;
  chapter: string;
}

const novels: NovelCard[] = [
  {
    id: 1,
    title: "Dukedom's Legendary Prodigy",
    description:
      "Han Sung, an SSS-class monster hunter from Earth, was summoned to another world where he had to devote his...",
    image: "/novels/anime-character-purple-dark-power.jpg",
    author: "Author Name",
    chapter: "Chapter 301",
  },
  {
    id: 2,
    title: "Demonic Frontline Flying Dragon",
    description:
      "An epic tale of dragons and demons in a war-torn realm. Experience the thrilling adventures and mysterious powers...",
    image: "/novels/anime-dragon-battle-fire.jpg",
    author: "Author Name",
    chapter: "Chapter 359",
  },
  {
    id: 3,
    title: "Smartphone in Murim Academy",
    description:
      "A modern student finds themselves in the mysterious world of Murim with only a smartphone. Uncover secrets and grow stronger...",
    image: "/novels/anime-school-academy-modern.jpg",
    author: "Author Name",
    chapter: "Chapter 163",
  },
  {
    id: 4,
    title: "Omniscient First-Person Viewpoint",
    description:
      "Witness stories through the eyes of an omniscient being. Multiple perspectives, countless tales, infinite possibilities...",
    image: "/novels/anime-mystery-perspective.jpg",
    author: "Author Name",
    chapter: "Chapter 241",
  },
];

export default function NovelCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % novels.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % novels.length);
    setIsAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + novels.length) % novels.length);
    setIsAutoPlay(false);
  };

  const current = novels[currentIndex];

  return (
    <div
      className="relative w-full h-[400px] md:h-[500px]"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      <Card className="relative h-full overflow-hidden rounded-2xl border-2 border-amber-500/40 bg-linear-to-br from-slate-900 to-slate-800">
        <div className="relative h-full flex flex-col md:flex-row">
          <div className="relative w-full md:w-2/3 h-64 md:h-full overflow-hidden">
            <Image
              src={
                current.image ||
                "/placeholder.svg?height=500&width=700&query=anime novel cover"
              }
              alt={current.title}
              fill
              priority
              className="object-cover transition-transform duration-700 hover:scale-110 w-full h-full"
            />
            <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/50 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent" />
          </div>

          <div className="relative w-full md:w-1/3 p-6 md:p-8 flex flex-col justify-end md:justify-center text-white bg-linear-to-t from-slate-950 via-slate-900/80 md:via-transparent to-transparent">
            <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-3 drop-shadow-lg">
              {current.chapter}
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 line-clamp-3 drop-shadow-lg leading-tight">
              {current.title}
            </h3>
            <p className="text-sm md:text-base text-slate-200 line-clamp-3 leading-relaxed drop-shadow-md mb-4">
              {current.description}
            </p>
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-amber-500 rounded-full" />
              <span className="text-xs text-slate-400 font-semibold">
                {current.author}
              </span>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden">
          <div
            className="absolute -top-1 -left-1 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl"
            style={{
              animation: "float 6s ease-in-out infinite",
            }}
          />
          <div
            className="absolute -bottom-1 -right-1 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"
            style={{
              animation: "float 6s ease-in-out infinite 2s",
            }}
          />
        </div>
      </Card>

      {/* Navigation Buttons */}
      {/* <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-amber-500/90 hover:bg-amber-500 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 shadow-lg"
        aria-label="Previous novel"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-amber-500/90 hover:bg-amber-500 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 shadow-lg"
        aria-label="Next novel"
      >
        <ChevronRight size={24} />
      </button> */}

      {/* Pagination Dots */}
      {/* <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {novels.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? "bg-amber-500 w-8 h-2"
                : "bg-slate-500/60 hover:bg-slate-400 w-2 h-2"
            }`}
            aria-label={`Go to novel ${index + 1}`}
          />
        ))}
      </div> */}

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}
