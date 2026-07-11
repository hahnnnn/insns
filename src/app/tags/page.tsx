import { ScrollAnimation } from "@/components/ScrollAnimation";
import { getAllContent, getAllTags } from "@/lib/content";
import Link from "next/link";

export default function TagsPage() {
  const tags = getAllTags();
  const types = ["research", "publications", "journal", "projects", "reviews"] as const;

  return (
    <div className="page-container py-16 md:py-24">
      <div className="content-block">
        <ScrollAnimation>
          <h1 className="heading-xl mb-4">Tags</h1>
          <p className="body-text text-muted mb-12 max-w-[65ch]">
            A taxonomy of topics, themes, and obsessions. Each tag collects related content
            across research, publications, reviews, and journal notes.
          </p>
        </ScrollAnimation>

        <div className="tag-cloud mb-12">
          {tags.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="tag-pill text-sm px-3 py-1"
            >
              {tag}
              <span className="ml-1.5 text-[0.625rem] opacity-50">{count}</span>
            </Link>
          ))}
        </div>

        {/* Content by tag */}
        {tags.slice(0, 8).map(({ tag }) => {
          const items = types.flatMap((type) => {
            const contents = getAllContent(type);
            return contents.filter((c) => 
              c.meta.tags && Array.isArray(c.meta.tags) && 
              c.meta.tags.some((t) => String(t) === tag)
            ).map((c) => ({ ...c, type }));
          });

          if (items.length === 0) return null;

          return (
            <div key={tag} className="mb-10">
              <h2 className="heading-sm mb-4 flex items-center gap-2">
                <span className="tag-pill">{tag}</span>
                <span className="caption">({items.length})</span>
              </h2>
              <div className="space-y-0">
                {items.map((item, i) => (
                  <Link
                    key={`${item.type}-${item.slug}`}
                    href={`/${item.type}/${item.slug}`}
                    className="entry-row group"
                  >
                    <span className="entry-date">{item.meta.date}</span>
                    <div className="entry-content">
                      <span className="text-sm">{item.meta.title}</span>
                      <span className="caption ml-2 uppercase">[{item.type}]</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
