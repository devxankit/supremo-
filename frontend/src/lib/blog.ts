export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  body: BlogBlock[];
  image: string;
}

export const blogCategories = [
  "All",
  "Buying Guides",
  "Maintenance",
  "Agriculture",
  "Gardening",
];

export function formatDate(iso: string): string {
  if (!iso) return "";
  // Parse YYYY-MM-DD safely to avoid UTC timezone offset issues
  const parts = iso.split("T")[0].split("-");
  if (parts.length !== 3) return iso;
  const [year, month, day] = parts.map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
