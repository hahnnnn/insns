import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const contentDir = path.join(rootDir, "src", "content");
const publicDir = path.join(rootDir, "public");
const dataDir = path.join(rootDir, "src", "data");
const siteUrl = "https://notstudying.network";

function getAllMDFiles(dir, type) {
  const items = [];
  if (!fs.existsSync(dir)) return items;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.endsWith(".md") || file.endsWith(".mdx")) {
      const filePath = path.join(dir, file);
      const content = fs.readFileSync(filePath, "utf-8");
      const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      if (match) {
        const frontmatter = {};
        match[1].split("\n").forEach((line) => {
          const sep = line.indexOf(": ");
          if (sep > 0) {
            const key = line.slice(0, sep).trim();
            let val = line.slice(sep + 2).trim();
            if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
            frontmatter[key] = val;
          }
        });
        items.push({
          title: frontmatter.title || file,
          date: frontmatter.date || "",
          description: frontmatter.description || "",
          type,
          slug: file.replace(/\.(md|mdx)$/, ""),
          tags: frontmatter.tags || "",
          content: match[2].slice(0, 500),
        });
      }
    }
  }
  return items;
}

const types = ["research", "publications", "journal", "projects", "reviews"];
let allItems = [];
types.forEach((type) => {
  allItems = allItems.concat(getAllMDFiles(path.join(contentDir, type), type));
});

// --- Generate RSS ---
allItems.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>网络社会不研究所</title>
    <link>${siteUrl}</link>
    <description>Institute of Not Studying Network Society — Researching Everything Except Network Society.</description>
    <language>zh-cn</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
`;

allItems.forEach((item) => {
  const pubDate = item.date ? new Date(item.date).toUTCString() : new Date().toUTCString();
  rss += `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${siteUrl}/${item.type}/${item.slug}</link>
      <guid>${siteUrl}/${item.type}/${item.slug}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(item.description || "")}</description>
    </item>\n`;
});

rss += `  </channel>\n</rss>\n`;

fs.writeFileSync(path.join(publicDir, "rss.xml"), rss, "utf-8");
console.log("✅ RSS feed generated");

// --- Generate Sitemap ---
const staticPages = [
  { url: siteUrl, priority: "1.0", freq: "weekly" },
  { url: `${siteUrl}/research`, priority: "0.9", freq: "weekly" },
  { url: `${siteUrl}/publications`, priority: "0.9", freq: "weekly" },
  { url: `${siteUrl}/projects`, priority: "0.8", freq: "monthly" },
  { url: `${siteUrl}/reading-room`, priority: "0.7", freq: "monthly" },
  { url: `${siteUrl}/people`, priority: "0.6", freq: "monthly" },
  { url: `${siteUrl}/journal`, priority: "0.8", freq: "weekly" },
  { url: `${siteUrl}/archive`, priority: "0.7", freq: "monthly" },
  { url: `${siteUrl}/contact`, priority: "0.5", freq: "yearly" },
];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

staticPages.forEach((page) => {
  sitemap += `  <url>
    <loc>${page.url}</loc>
    <changefreq>${page.freq}</changefreq>
    <priority>${page.priority}</priority>
  </url>\n`;
});

allItems.forEach((item) => {
  sitemap += `  <url>
    <loc>${siteUrl}/${item.type}/${item.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
});

sitemap += "</urlset>\n";

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap, "utf-8");
console.log("✅ Sitemap generated");

// --- Generate Search Index ---
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const searchIndex = allItems.map((item) => ({
  slug: item.slug,
  title: item.title,
  date: item.date,
  description: item.description,
  type: item.type,
  tags: item.tags,
  content: item.content,
}));

fs.writeFileSync(
  path.join(dataDir, "search-index.json"),
  JSON.stringify(searchIndex, null, 2),
  "utf-8"
);
console.log("✅ Search index generated");
