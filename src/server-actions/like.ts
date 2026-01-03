"use server";

import { cookies } from "next/headers";
import apiClientManager from "@/api/interface";
import { LikeResponse, LikeCheckResponse } from "@/api/types";

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

export async function likeSeriesAction(seriesId: string) {
  const cookieHeader = await getCookieHeader();
  const response = await apiClientManager.likeSeries(
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

export async function unlikeSeriesAction(seriesId: string) {
  const cookieHeader = await getCookieHeader();
  const response = await apiClientManager.unlikeSeries(
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

export async function checkLikeAction(seriesId: string) {
  const cookieHeader = await getCookieHeader();
  const response = await apiClientManager.checkLike(seriesId, cookieHeader);

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

