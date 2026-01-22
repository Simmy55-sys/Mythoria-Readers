import { Card } from "@/components/ui/card";
import { BookOpen, Construction } from "lucide-react";

export default function readingNovels() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <Card className="p-12 text-center border-2 border-dashed border-border">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"></div>
              <div className="relative bg-primary/10 p-6 rounded-full">
                <Construction className="w-16 h-16 text-primary" />
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground flex items-center justify-center gap-3">
                <BookOpen className="w-8 h-8 text-primary" />
                Reading Page
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                We're working hard to bring you an amazing reading experience.
                This page is currently under construction.
              </p>
            </div>

            <div className="pt-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground font-medium">
                  Coming Soon
                </span>
              </div>
            </div>

            <div className="pt-6 text-sm text-muted-foreground max-w-lg mx-auto">
              <p>
                In the meantime, you can continue reading your favorite novels
                from the series pages. We'll notify you when this feature is
                ready!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
