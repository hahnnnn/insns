import { getContentBySlug, getAllContent } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/components/mdx/MDXComponents";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const items = getAllContent("projects");
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = getContentBySlug("projects", slug);
  if (!item) return { title: "Not Found" };
  return {
    title: item.meta.title,
    description: item.meta.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getContentBySlug("projects", slug);

  if (!item) {
    notFound();
  }

  const components = useMDXComponents();

  return (
    <div className="page-container py-16 md:py-24">
      <article className="content-block">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors duration-300 mb-12"
        >
          <ArrowLeft size={14} />
          Back to Projects
        </Link>

        <header className="mb-12">
          <p className="caption mb-3">{item.meta.date}</p>
          <h1 className="heading-xl mb-4">{item.meta.title}</h1>
          {item.meta.description && (
            <p className="body-text text-muted">{item.meta.description}</p>
          )}
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
