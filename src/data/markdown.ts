export function markdownParagraphs(markdown: string): string[] {
  return markdown
    .trim()
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}
