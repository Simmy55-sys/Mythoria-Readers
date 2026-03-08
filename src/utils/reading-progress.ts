const LAST_READ_KEY = "apex-novel-last-read";

export type LastReadMap = Record<string, number>;

export function getLastReadChapter(seriesSlug: string): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LAST_READ_KEY);
    if (!raw) return null;
    const data: LastReadMap = JSON.parse(raw);
    const chapter = data[seriesSlug];
    return typeof chapter === "number" && chapter >= 1 ? chapter : null;
  } catch {
    return null;
  }
}

export function setLastReadChapter(seriesSlug: string, chapterNumber: number): void {
  if (typeof window === "undefined" || !seriesSlug || chapterNumber < 1) return;
  try {
    const raw = localStorage.getItem(LAST_READ_KEY);
    const data: LastReadMap = raw ? JSON.parse(raw) : {};
    data[seriesSlug] = chapterNumber;
    localStorage.setItem(LAST_READ_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}
