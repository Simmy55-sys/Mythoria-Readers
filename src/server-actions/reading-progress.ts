"use server";

import { cookies } from "next/headers";
import apiClientManager from "@/api/interface";
import { OngoingSeriesItem } from "@/api/types";

async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies();
  const cookiePairs: string[] = [];
  cookieStore.getAll().forEach((cookie) => {
    cookiePairs.push(`${cookie.name}=${cookie.value}`);
  });
  return cookiePairs.join("; ");
}

export async function getLastReadChapterAction(seriesId: string) {
  const cookieHeader = await getCookieHeader();
  const response = await apiClientManager.getLastReadChapter(
    seriesId,
    cookieHeader
  );

  if (!response.success) {
    return {
      success: false,
      error: response.error.message,
      data: null,
    } as const;
  }

  return {
    success: true,
    data: response.data?.lastChapterNumber ?? null,
  } as const;
}

export async function setLastReadChapterAction(
  seriesId: string,
  chapterNumber: number
) {
  if (chapterNumber < 1) {
    return {
      success: false,
      error: "Invalid chapter number",
    } as const;
  }

  const cookieHeader = await getCookieHeader();
  const response = await apiClientManager.setLastReadChapter(
    seriesId,
    chapterNumber,
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

export async function getOngoingSeriesAction() {
  const cookieHeader = await getCookieHeader();
  const response = await apiClientManager.getOngoingSeries(cookieHeader);

  if (!response.success) {
    return {
      success: false,
      error: response.error.message,
      data: null,
    } as const;
  }

  return {
    success: true,
    data: (response.data ?? []) as OngoingSeriesItem[],
  } as const;
}
