import { Card } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function NovelsToRead() {
  return (
    <Card className="p-12 text-center">
      <Construction className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
      <p className="text-muted-foreground mb-2 font-medium">
        We're still working on this page
      </p>
      <p className="text-muted-foreground text-sm">
        Your to-read list will be available here soon. Thanks for your patience.
      </p>
    </Card>
  );
}
