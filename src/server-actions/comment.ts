"use server";

import { cookies } from "next/headers";
import apiClientManager from "@/api/interface";

async function getCookieHeader(): Promise<string | undefined> {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  if (allCookies.length === 0) return undefined;
  return allCookies.map((c) => `${c.name}=${c.value}`).join("; ");
}

export async function createCommentAction(payload: {
  content: string;
  seriesId?: string;
  chapterId?: string;
  parentCommentId?: string;
}) {
  const cookieHeader = await getCookieHeader();
  const response = await apiClientManager.createComment(payload, cookieHeader);

  if (!response.success) {
    return {
      success: false,
      error: response.error.message,
    } as const;
  }

  return {
    success: true,
    data: response.data,
  } as const;
}

export async function getSeriesCommentsAction(seriesId: string) {
  const response = await apiClientManager.getSeriesComments(seriesId);

  if (!response.success) {
    return {
      success: false,
      error: response.error.message,
    } as const;
  }

  return {
    success: true,
    data: response.data,
  } as const;
}

export async function getChapterCommentsAction(chapterId: string) {
  const response = await apiClientManager.getChapterComments(chapterId);

  if (!response.success) {
    return {
      success: false,
      error: response.error.message,
    } as const;
  }

  return {
    success: true,
    data: response.data,
  } as const;
}

export async function deleteCommentAction(commentId: string) {
  const cookieHeader = await getCookieHeader();
  const response = await apiClientManager.deleteComment(
    commentId,
    cookieHeader
  );

  if (!response.success) {
    return {
      success: false,
      error: response.error.message,
    } as const;
  }

  return {
    success: true,
    data: response.data,
  } as const;
}
