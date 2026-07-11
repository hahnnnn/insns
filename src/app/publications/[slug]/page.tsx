import { getContentBySlug, getAllContent, type ContentItem } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/components/mdx/MDXComponents";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const items = getAllContent("publications");
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = getContentBySlug("publications", slug);
  if (!item) return { title: "Not Found" };
  return {
    title: item.meta.title,
    description: item.meta.description,
  };
}

export default async function PublicationDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getContentBySlug("publications", slug);

  if (!item) {
    notFound();
  }

  const meta = item.meta;
  const hasPDF = meta.hasPDF ? Boolean(meta.hasPDF) : false;
  const externalUrl = meta.externalUrl ? String(meta.externalUrl) : null;
  const authors = meta.authors && Array.isArray(meta.authors) ? meta.authors.map(String) : [];
  const type = meta.type ? String(meta.type) : "Working Paper";

  const components = useMDXComponents();

  return (
    <div className="page-container py-16 md:py-24">
      <article className="content-block">
        <Link
          href="/publications"
          className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors duration-300 mb-12"
        >
          <ArrowLeft size={14} />
          Back to Publications
        </Link>

        <header className="mb-12">
          <p className="caption mb-3">{meta.date}</p>
          <h1 className="heading-xl mb-4">{meta.title}</h1>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="caption border border-border px-2 py-0.5">
              {type}
            </span>
          </div>
          {authors.length > 0 && (
            <p className="body-small mb-4">
              By {authors.join(", ")}
            </p>
          )}
          {meta.description && (
            <p className="body-text text-muted">{String(meta.description)}</p>
          )}
          <div className="flex flex-wrap gap-3 mt-6">
            {hasPDF && (
              <a
                href={`/pdfs/${slug}.pdf`}
                className="inline-flex items-center gap-2 text-sm border border-border px-4 py-2 hover:bg-surface-muted transition-colors duration-300"
              >
                <Download size={14} />
                Download PDF
              </a>
            )}
            {externalUrl && (
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm border border-border px-4 py-2 hover:bg-surface-muted transition-colors duration-300"
              >
                <ExternalLink size={14} />
                External Link
              </a>
            )}
          </div>
        </header>

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
