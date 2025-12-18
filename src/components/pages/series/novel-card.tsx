import AnimatedFireIcon from "@/components/utility/animated-fire-icon";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AllSeriesResponse } from "@/api/types";
import { allSeries } from "@/routes/client";

interface NovelCardProps {
  series: AllSeriesResponse;
}

export default function NovelCard({ series }: NovelCardProps) {
  const latestChapter = series.recentChapters[0];
  const secondChapter = series.recentChapters[1];

  return (
    <div>
      <div className="overflow-hidden relative flex flex-col min-w-0 wrap-break-word rounded-[5px] h-[260px] sm:h-[360px] md:h-[260px] lg:h-[220px] xl:h-[280px] 2xl:h-[320px] mb-5 rounded-5">
        <Link
          color="primary"
          className="w-full h-full"
          href={`${allSeries}/${series.slug}`}
        >
          <div className="w-full h-full transition-all duration-200 ease-in-out delay-0 rounded-[5px] hover:scale-110 overflow-hidden relative">
            <Image
              alt={`Cover of ${series.title}`}
              draggable="false"
              loading="lazy"
              width="400"
              height="320"
              decoding="async"
              data-nimg="1"
              className="h-full object-cover object-center absolute w-full z-0 transition-all duration-200 ease-in-out delay-0 rounded-[5px] hover:scale-110"
              src={series.featuredImage || "/placeholder.svg"}
            />
            <div
              aria-hidden="true"
              className="w-full h-full top-0 left-0 absolute z-0"
            ></div>
          </div>
        </Link>
        <span className="absolute z-1 right-[5px] top-[5px]">
          <span className="px-2 py-1 rounded-[4px] text-xs font-medium text-white bg-indigo-500/90">
            {series.novelType}
          </span>
        </span>
      </div>

      <div className="flex justify-between mx-2 my-2">
        <div className="flex-center flex gap-1 font-normal text-xs">
          <div className="numscore">
            {series.averageRating > 0 ? series.averageRating.toFixed(1) : "2"}
          </div>
          <StarIcon className="size-4 fill-yellow-600 text-yellow-600" />
        </div>
        <div className="flex items-center gap-1 font-normal text-xs">
          <span
            className={`h-[10px] w-[10px] rounded-full inline-block relative ${
              series.status === "completed" ? "bg-green-500" : "bg-yellow-500"
            }`}
          ></span>
          <p className="font-normal text-xs capitalize">{series.status}</p>
        </div>
      </div>

      <div className="flex justify-center items-center h-[50px]">
        <Link href={`${allSeries}/${series.slug}`}>
          <h1 className="text-[15px] text-white overflow-hidden font-bold text-center line-clamp-2 capitalize hover:text-accent">
            {series.title}
          </h1>
        </Link>
      </div>

      <div className="mt-1.5">
        {latestChapter && (
          <Link
            color="primary"
            className="w-full center data-[focus-visible=true]:outline-offset-2 shadow-medium transition-transform-background motion-reduce:transition-none border-transparent       bg-[#A1A1AA]/10 flex items-center justify-between mb-[5px] px-2.5 py-2 rounded-[5px] hover:bg-[#A1A1AA]/20 text-white visited:text-gray-500!"
            href={`${allSeries}/${series.slug}/chapter/${latestChapter.chapterNumber}`}
          >
            <div
              className="chapterName flex justify-center items-center overflow-hidden text-ellipsis
             whitespace-nowrap max-w-[120px] text-[12px] font-bold leading-none text-center 
             align-baseline rounded px-[0.4em] py-[0.25em] false text-gray-400"
            >
              <p className="mx-1">Chapter {latestChapter.chapterNumber}</p>
            </div>
            <div className="flex justify-between items-center text-[60%] text-gray-400">
              <span className="flex items-center gap-0.5 fill-[]">
                <AnimatedFireIcon />
                <span>New</span>
              </span>
            </div>
          </Link>
        )}
        {secondChapter && (
          <Link
            color="primary"
            className="w-full center data-[focus-visible=true]:outline-offset-2 shadow-medium transition-transform-background motion-reduce:transition-none border-transparent       bg-[#A1A1AA]/10 flex items-center justify-between mb-[5px] px-2.5 py-2 rounded-[5px] hover:bg-[#A1A1AA]/20 text-white visited:text-gray-500!"
            href={`${allSeries}/${series.slug}/chapter/${secondChapter.chapterNumber}`}
          >
            <div
              className="chapterName flex justify-center items-center overflow-hidden text-ellipsis
             whitespace-nowrap max-w-[120px] text-[12px] font-bold leading-none text-center 
             align-baseline rounded px-[0.4em] py-[0.25em] false text-gray-400"
            >
              <p className="mx-1">Chapter {secondChapter.chapterNumber}</p>
            </div>
            <div className="flex justify-between items-center text-[60%] text-gray-400">
              <span className="flex items-center gap-0.5">
                <AnimatedFireIcon />
                <span>New</span>
              </span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
