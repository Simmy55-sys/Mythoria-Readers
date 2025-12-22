"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleAlertIcon } from "lucide-react";
import CommentForm from "./comment-form";
import CommentItem, { CommentData } from "./comment-item";
import {
  getSeriesCommentsAction,
  getChapterCommentsAction,
} from "@/server-actions/comment";
import { useAuth } from "@/contexts/auth-context";

interface CommentSectionProps {
  seriesId?: string;
  chapterId?: string;
  currentUserId?: string;
}

export default function CommentSection({
  seriesId,
  chapterId,
  currentUserId: propCurrentUserId,
}: CommentSectionProps) {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const currentUserId = propCurrentUserId || user?.id;

  const loadComments = async () => {
    setIsLoading(true);
    setError(null);

    try {
      let result;
      if (seriesId) {
        result = await getSeriesCommentsAction(seriesId);
      } else if (chapterId) {
        result = await getChapterCommentsAction(chapterId);
      } else {
        setError("Series or chapter ID is required");
        return;
      }

      if (!result.success) {
        setError(result.error);
        return;
      }

      // Transform the data to match CommentData interface
      const transformedComments = (result.data || []).map((comment: any) => ({
        ...comment,
        createdAt: new Date(comment.createdAt),
        updatedAt: new Date(comment.updatedAt),
        replies: comment.replies
          ? comment.replies.map((reply: any) => ({
              ...reply,
              createdAt: new Date(reply.createdAt),
              updatedAt: new Date(reply.updatedAt),
            }))
          : undefined,
      }));

      setComments(transformedComments);
    } catch (err) {
      setError("Failed to load comments");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [seriesId, chapterId]);

  const handleCommentAdded = () => {
    loadComments();
  };

  const handleCommentDeleted = () => {
    loadComments();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <CircleAlertIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Comments ({comments.length})
        </h3>
        <CommentForm
          seriesId={seriesId}
          chapterId={chapterId}
          onCommentAdded={handleCommentAdded}
        />
      </div>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <Card className="p-8 border border-[#27272A]">
            <p className="text-center text-muted-foreground">
              No comments yet. Be the first to comment!
            </p>
          </Card>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onCommentAdded={handleCommentAdded}
              onCommentDeleted={handleCommentDeleted}
              currentUserId={currentUserId}
            />
          ))
        )}
      </div>
    </div>
  );
}
