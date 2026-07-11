import { ScrollAnimation } from "@/components/ScrollAnimation";
import { getAllContent } from "@/lib/content";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const items = getAllContent("reviews");
  return items.map((item) => ({ slug: item.slug }));
}

export default async function ReviewDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getAllContent("reviews").find((r) => r.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="page-container py-16 md:py-24">
      <article className="content-block">
        <ScrollAnimation>
          <div className="mb-10">
            <Link
              href="/review"
              className="caption underline-animate mb-6 inline-block"
            >
              ← Back to Reviews
            </Link>
            <p className="caption mb-2">{item.meta.date}</p>
            <h1 className="heading-lg mb-3">{item.meta.title}</h1>
            {item.meta.description && (
              <p className="body-text text-muted mb-4">{item.meta.description}</p>
            )}
            {item.meta.tags && (item.meta.tags as string[]).length > 0 && (
              <div className="flex flex-wrap gap-2">
                {(item.meta.tags as string[]).map((tag) => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </ScrollAnimation>

        <div className="prose prose-sm max-w-none prose-headings:font-medium prose-headings:text-foreground prose-p:text-foreground prose-p:leading-relaxed prose-a:text-muted prose-blockquote:border-border prose-blockquote:text-muted prose-strong:text-foreground">
          <MDXRemote source={item.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </div>
      </article>
    </div>
  );
}
