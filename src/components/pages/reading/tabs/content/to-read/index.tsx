import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import NovelsToReadCard from "./card";

const readingData = [
  {
    id: 6,
    title: "Smartphone in Murim Academy",
    author: "Author Name",
    cover: "/novels/anime-academy-modern.jpg",
    chapters: 163,
    rating: 4.5,
  },
  {
    id: 7,
    title: "30 Years Have Passed Since the...",
    author: "Author Name",
    cover: "/novels/anime-time-travel.jpg",
    chapters: 120,
    rating: 4.4,
  },
];

export default function NovelsToRead() {
  return (
    <>
      {readingData.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-4">
            Your to-read list is empty
          </p>
          <Button className="bg-primary hover:bg-primary/90">
            Discover Novels
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {readingData.map((novel) => (
            <NovelsToReadCard key={novel.id} novel={novel} />
          ))}
        </div>
      )}
    </>
  );
}
