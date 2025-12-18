import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export interface Novel {
  id: number;
  title: string;
  author: string;
  cover: string;
  currentChapter: number;
  totalChapters: number;
  progress: number;
  lastRead: string;
  rating: number;
}

export default function OngoingNovelCard({ novel }: { novel: Novel }) {
  return (
    <Card className="overflow-hidden hover:border-none hover:bg-[#27272A]/60 transition-colors max-w-xl">
      <div className="flex max-sm:flex-col gap-6 p-6">
        {/* Cover Image */}
        <div className="shrink-0">
          <Image
            width={300}
            height={300}
            src={novel.cover || "/placeholder.svg"}
            alt={novel.title}
            className="w-32 h-44 object-cover rounded-lg mx-auto"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-1">
              {novel.title}
            </h3>
            <p className="text-muted-foreground mb-4">{novel.author}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{"★"}</span>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {novel.rating}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-foreground font-medium">
                  {novel.currentChapter}/{novel.totalChapters}
                </span>
              </div>
              <div className="w-full bg-[#27272A] rounded-full h-2 overflow-hidden">
                <div
                  className="bg-linear-to-r from-primary to-secondary h-full rounded-full transition-all duration-300"
                  style={{ width: `${novel.progress}%` }}
                />
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Last read: {novel.lastRead}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-4">
            <Button className="bg-primary hover:bg-primary/90">
              Continue Reading
            </Button>
            <Button variant="outline">View Details</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
