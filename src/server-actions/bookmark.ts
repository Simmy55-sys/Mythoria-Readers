"use server";

import { cookies } from "next/headers";
import apiClientManager from "@/api/interface";
import { BookmarkResponse, BookmarkCheckResponse } from "@/api/types";

/**
 * Get cookie header string from Next.js cookies
 */
async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies();
  const cookiePairs: string[] = [];

  cookieStore.getAll().forEach((cookie) => {
    cookiePairs.push(`${cookie.name}=${cookie.value}`);
  });

  return cookiePairs.join("; ");
}

export async function bookmarkSeriesAction(seriesId: string) {
  const cookieHeader = await getCookieHeader();
  const response = await apiClientManager.bookmarkSeries(
    seriesId,
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

export async function removeBookmarkAction(seriesId: string) {
  const cookieHeader = await getCookieHeader();
  const response = await apiClientManager.removeBookmark(
    seriesId,
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

export async function checkBookmarkAction(seriesId: string) {
  const cookieHeader = await getCookieHeader();
  const response = await apiClientManager.checkBookmark(seriesId, cookieHeader);

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

export async function getUserBookmarksAction() {
  const cookieHeader = await getCookieHeader();
  const response = await apiClientManager.getUserBookmarks(cookieHeader);

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
