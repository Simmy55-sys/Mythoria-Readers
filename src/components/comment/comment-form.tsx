"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createCommentAction } from "@/server-actions/comment";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { login } from "@/routes/client";

interface CommentFormProps {
  seriesId?: string;
  chapterId?: string;
  onCommentAdded?: () => void;
  placeholder?: string;
}

export default function CommentForm({
  seriesId,
  chapterId,
  onCommentAdded,
  placeholder = "Write a comment...",
}: CommentFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please login to comment");
      router.push(login);
      return;
    }

    if (!content.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    if (!seriesId && !chapterId) {
      toast.error("Series or chapter ID is required");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createCommentAction({
        content: content.trim(),
        seriesId,
        chapterId,
      });

      if (!result.success) {
        toast.error(result.error || "Failed to post comment.");
        return;
      }

      toast.success("Comment posted successfully");
      setContent("");
      onCommentAdded?.();
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-4 border border-[#27272A]">
      <form onSubmit={handleSubmit} className="space-y-3">
        <Textarea
          placeholder={isAuthenticated ? placeholder : "Login to comment..."}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="resize-none border-border bg-[#27272A]"
          disabled={isSubmitting || !isAuthenticated}
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting || !content.trim() || !isAuthenticated}
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
