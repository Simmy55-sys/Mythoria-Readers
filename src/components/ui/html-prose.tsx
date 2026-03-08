"use client";

const HTML_PROSE_CLASS =
  "text-white leading-relaxed text-lg [&_p]:mb-4 [&_p]:text-white [&_strong]:text-white [&_strong]:font-semibold [&_em]:text-white [&_em]:italic [&_ul]:my-4 [&_ul]:pl-6 [&_ul]:list-disc [&_ul]:text-white [&_ol]:my-4 [&_ol]:pl-6 [&_ol]:list-decimal [&_ol]:text-white [&_li]:my-2 [&_li]:text-white";

export interface HtmlProseProps {
  html: string;
  className?: string;
}

/**
 * Renders sanitized HTML with consistent prose styling (paragraphs, lists, emphasis).
 * Use for description, prologue, or other rich text from the backend.
 */
export function HtmlProse({ html, className = "" }: HtmlProseProps) {
  return (
    <div
      className={`${HTML_PROSE_CLASS} ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: html || "" }}
    />
  );
}

export { HTML_PROSE_CLASS };
