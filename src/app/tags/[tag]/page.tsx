import { ScrollAnimation } from "@/components/ScrollAnimation";
import { getAllContent, getAllTags } from "@/lib/content";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(({ tag }) => ({ tag }));
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const allTags = getAllTags();
  
  if (!allTags.some((t) => t.tag === decodedTag)) {
    notFound();
  }

  const types = ["research", "publications", "journal", "projects", "reviews"] as const;
  const items = types.flatMap((type) => {
    const contents = getAllContent(type);
    return contents.filter((c) => 
      c.meta.tags && Array.isArray(c.meta.tags) && 
      c.meta.tags.some((t) => String(t) === decodedTag)
    ).map((c) => ({ ...c, type }));
  });

  return (
    <div className="page-container py-16 md:py-24">
      <div className="content-block">
        <ScrollAnimation>
          <Link href="/tags" className="caption underline-animate mb-6 inline-block">
            ← All Tags
          </Link>
          <h1 className="heading-xl mb-2">{decodedTag}</h1>
          <p className="body-text text-muted mb-10">{items.length} entries</p>
        </ScrollAnimation>

        <div className="space-y-0">
          {items.map((item, i) => (
            <ScrollAnimation key={`${item.type}-${item.slug}`} delay={i * 0.04}>
              <Link
                href={`/${item.type}/${item.slug}`}
                className="entry-row group"
              >
                <span className="entry-date">{item.meta.date}</span>
                <div className="entry-content">
                  <span className="text-sm font-medium">{item.meta.title}</span>
                  <span className="caption ml-2 uppercase">[{item.type}]</span>
                  {item.meta.description && (
                    <p className="caption mt-0.5">{item.meta.description}</p>
                  )}
                </div>
              </Link>
            </ScrollAnimation>
          ))}
        </div>

        {items.length === 0 && (
          <p className="body-text text-muted">No entries with this tag.</p>
        )}
      </div>
    </div>
  );
}
