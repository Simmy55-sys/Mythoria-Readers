import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import OngoingNovelCard from "./card";

const readingData = [
  {
    id: 1,
    title: "Dukedom's Legendary Prodigy",
    author: "Author Name",
    cover: "/novels/anime-character-purple-dark.jpg",
    currentChapter: 301,
    totalChapters: 450,
    progress: 67,
    lastRead: "2 hours ago",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Demonic Frontline Flying Dragon",
    author: "Author Name",
    cover: "/novels/anime-dragon-battle.jpg",
    currentChapter: 359,
    totalChapters: 400,
    progress: 90,
    lastRead: "5 hours ago",
    rating: 4.6,
  },
  {
    id: 3,
    title: "I Became a Motivational Demon Sword",
    author: "Author Name",
    cover: "/novels/anime-sword-martial-arts.jpg",
    currentChapter: 241,
    totalChapters: 350,
    progress: 69,
    lastRead: "1 day ago",
    rating: 4.7,
  },
];

export default function OngoingNovelReads() {
  return (
    <>
      {readingData.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-4">No ongoing novels yet</p>
          <Button className="bg-primary hover:bg-primary/90">
            Start Reading
          </Button>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {readingData.map((novel) => (
            <OngoingNovelCard key={novel.id} novel={novel} />
          ))}
        </div>
      )}
    </>
  );
}
