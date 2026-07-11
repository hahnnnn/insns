import { getContentBySlug, getAllContent, type ContentItem } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/components/mdx/MDXComponents";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const items = getAllContent("research");
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = getContentBySlug("research", slug);
  if (!item) return { title: "Not Found" };
  return {
    title: item.meta.title,
    description: item.meta.description,
  };
}

export default async function ResearchDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getContentBySlug("research", slug);

  if (!item) {
    notFound();
  }

  const meta = item.meta;
  const hasPDF = meta.hasPDF ? Boolean(meta.hasPDF) : false;
  const authors = meta.authors && Array.isArray(meta.authors) ? meta.authors.map(String) : [];
  const tags = meta.tags && Array.isArray(meta.tags) ? meta.tags.map(String) : [];

  const components = useMDXComponents();

  return (
    <div className="page-container py-16 md:py-24">
      <article className="content-block">
        {/* Back link */}
        <Link
          href="/research"
          className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors duration-300 mb-12"
        >
          <ArrowLeft size={14} />
          Back to Research
        </Link>

        {/* Header */}
        <header className="mb-12">
          <p className="caption mb-3">{meta.date}</p>
          <h1 className="heading-xl mb-4">{meta.title}</h1>
          {meta.description && (
            <p className="body-text text-muted mb-4">{String(meta.description)}</p>
          )}
          {authors.length > 0 && (
            <p className="body-small">
              By {authors.join(", ")}
            </p>
          )}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="caption border border-border px-2 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {hasPDF && (
            <div className="mt-6">
              <a
                href={`/pdfs/${slug}.pdf`}
                className="inline-flex items-center gap-2 text-sm border border-border px-4 py-2 hover:bg-surface-muted transition-colors duration-300"
              >
                <Download size={14} />
                Download PDF
              </a>
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose-custom">
          <MDXRemote
            source={item.content}
            components={components}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </div>
      </article>
    </div>
  );
}
