import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "src/content");

export type ContentType = "research" | "publications" | "journal" | "projects" | "people" | "reviews";

export interface ContentMeta {
  slug: string;
  title: string;
  date: string;
  type: string;
  tags?: string[];
  authors?: string[];
  description?: string;
  readingTime?: number;
  [key: string]: unknown;
}

export interface ContentItem {
  slug: string;
  meta: ContentMeta;
  content: string;
}

function getContentDirectory(type: ContentType): string {
  return path.join(contentDirectory, type);
}

export function getAllContent(type: ContentType): ContentItem[] {
  const dir = getContentDirectory(type);

  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));

  const items = files.map((file) => {
    const slug = file.replace(/\.(md|mdx)$/, "");
    const filePath = path.join(dir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      slug,
      meta: {
        slug,
        title: data.title || slug,
        date: data.date || "",
        type: data.type || type,
        tags: data.tags || [],
        authors: data.authors || [],
        description: data.description || "",
        readingTime: data.readingTime || Math.max(1, Math.ceil(content.split(" ").length / 200)),
        ...data,
      } as ContentMeta,
      content,
    };
  });

  return items.sort((a, b) => {
    if (a.meta.date && b.meta.date) {
      return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
    }
    return 0;
  });
}

export function getContentBySlug(type: ContentType, slug: string): ContentItem | null {
  const items = getAllContent(type);
  return items.find((item) => item.slug === slug) || null;
}

export function getArchiveItems(): { year: string; items: { title: string; date: string; slug: string }[] }[] {
  const allResearch = getAllContent("research");
  const allPublications = getAllContent("publications");
  const allJournal = getAllContent("journal");
  const allProjects = getAllContent("projects");
  const allReviews = getAllContent("reviews");

  const all = [...allResearch, ...allPublications, ...allJournal, ...allProjects, ...allReviews];

  const grouped: Record<string, { title: string; date: string; slug: string }[]> = {};

  all.forEach((item) => {
    if (item.meta.date) {
      const year = new Date(item.meta.date).getFullYear().toString();
      if (!grouped[year]) {
        grouped[year] = [];
      }
      grouped[year].push({
        title: item.meta.title,
        date: item.meta.date,
        slug: item.slug,
      });
    }
  });

  return Object.entries(grouped)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, items]) => ({ year, items }));
}

export function getAllTags(): { tag: string; count: number }[] {
  const types: ContentType[] = ["research", "publications", "journal", "projects", "reviews"];
  const tagMap: Record<string, number> = {};

  types.forEach((type) => {
    const items = getAllContent(type);
    items.forEach((item) => {
      if (item.meta.tags && Array.isArray(item.meta.tags)) {
        item.meta.tags.forEach((tag) => {
          const key = String(tag);
          tagMap[key] = (tagMap[key] || 0) + 1;
        });
      }
    });
  });

  return Object.entries(tagMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function searchContent(query: string) {
  const types: ContentType[] = ["research", "publications", "journal", "projects", "reviews"];
  const results: (ContentItem & { type: ContentType })[] = [];

  const lowerQuery = query.toLowerCase();

  types.forEach((type) => {
    const items = getAllContent(type);
    items.forEach((item) => {
      if (
        item.meta.title.toLowerCase().includes(lowerQuery) ||
        item.meta.description?.toLowerCase().includes(lowerQuery) ||
        item.content.toLowerCase().includes(lowerQuery)
      ) {
        results.push({ ...item, type });
      }
    });
  });

  return results;
}
