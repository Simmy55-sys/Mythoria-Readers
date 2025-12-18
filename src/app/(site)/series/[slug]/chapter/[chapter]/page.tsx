import ReadChapter from "@/components/pages/series/novel-details/chapter";

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string; chapter: string }>;
}) {
  const { slug, chapter } = await params;
  return <ReadChapter params={{ slug, chapter }} />;
}
