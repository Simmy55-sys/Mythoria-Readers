import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CompletedNovelsCard from "./card";

const readingData = [
  {
    id: 8,
    title: "I Became An Academy...",
    author: "Author Name",
    cover: "/novels/anime-academy-golden.jpg",
    totalChapters: 500,
    completedAt: "2 months ago",
    rating: 4.9,
  },
  {
    id: 9,
    title: "Omniscient First-Person's Viewpoint",
    author: "Author Name",
    cover: "/novels/anime-perspective-view.jpg",
    totalChapters: 241,
    completedAt: "3 months ago",
    rating: 4.7,
  },
];

export default function CompletedNovels() {
  return (
    <>
      {readingData.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-4">
            You haven't completed any novels yet
          </p>
          <Button className="bg-primary hover:bg-primary/90">
            Browse Novels
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {readingData.map((novel) => (
            <CompletedNovelsCard key={novel.id} novel={novel} />
          ))}
        </div>
      )}
    </>
  );
}
