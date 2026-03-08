import ReadingNovelsComponent from "@/components/pages/reading";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";

export default function readingNovels() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center flex items-center gap-2">
            <Spinner />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      }
    >
      <ReadingNovelsComponent />
    </Suspense>
  );
}
