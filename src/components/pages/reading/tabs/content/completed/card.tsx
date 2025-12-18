import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Novel {
  id: number;
  title: string;
  author: string;
  cover: string;
  totalChapters: number;
  completedAt: string;
  rating: number;
}

export default function CompletedNovelsCard({ novel }: { novel: Novel }) {
  return (
    <Card className="overflow-hidden transition-colors group">
      <div className="relative overflow-hidden h-64">
        <img
          src={novel.cover || "/placeholder.svg"}
          alt={novel.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
        <div className="absolute top-4 right-4">
          <Badge className="bg-green-600 text-white">Completed</Badge>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-foreground line-clamp-2 mb-2">
          {novel.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">{novel.author}</p>
        <p className="text-xs text-muted-foreground mb-3">
          Finished {novel.completedAt}
        </p>

        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary">{novel.totalChapters} Chapters</Badge>
          <div className="flex text-primary text-sm">★ {novel.rating}</div>
        </div>

        <Button className="w-full">View Again</Button>
      </div>
    </Card>
  );
}
