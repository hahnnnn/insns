import { ScrollAnimation } from "@/components/ScrollAnimation";
import { getAllContent } from "@/lib/content";
import Link from "next/link";
import { Download } from "lucide-react";

export default function PublicationsPage() {
  const publications = getAllContent("publications");

  // Group by year
  const grouped: Record<string, typeof publications> = {};
  publications.forEach((pub) => {
    const year = pub.meta.date ? new Date(pub.meta.date).getFullYear().toString() : "Unknown";
    if (!grouped[year]) grouped[year] = [];
    grouped[year].push(pub);
  });

  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  function PubRow({ pub, i }: { pub: (typeof publications)[0]; i: number }) {
    const hasPDF = pub.meta.hasPDF ? Boolean(pub.meta.hasPDF) : false;
    const authors = pub.meta.authors && Array.isArray(pub.meta.authors) ? pub.meta.authors.map(String) : [];
    const type = pub.meta.type ? String(pub.meta.type) : "Working Paper";

    return (
      <ScrollAnimation delay={i * 0.05}>
        <Link
          href={`/publications/${pub.slug}`}
          className="group flex items-baseline justify-between gap-4 py-4 border-b border-border hover:bg-surface-muted/50 transition-colors duration-300 -mx-4 px-4"
        >
          <div className="min-w-0">
            <p className="text-sm font-medium group-hover:text-muted transition-colors duration-300">
              {pub.meta.title}
            </p>
            <div className="flex items-center gap-3 mt-1">
              <span className="caption">{type}</span>
              {authors.length > 0 && (
                <span className="caption border-l border-border pl-3">
                  {authors.join(", ")}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {hasPDF && <Download size={12} className="text-muted" />}
            <span className="caption text-muted">PDF</span>
          </div>
        </Link>
      </ScrollAnimation>
    );
  }

  return (
    <div className="page-container py-16 md:py-24">
      <div className="content-block">
        <ScrollAnimation>
          <h1 className="heading-xl mb-4">Publications</h1>
          <p className="body-text text-muted mb-12 max-w-[65ch]">
            Working papers, journal articles, and other published materials produced by the Institute
            and its affiliates.
          </p>
        </ScrollAnimation>

        {years.map((year) => (
          <div key={year} className="mb-12">
            <h2 className="heading-md mb-6">{year}</h2>
            <div className="space-y-0">
              {grouped[year].map((pub, i) => (
                <PubRow key={pub.slug} pub={pub} i={i} />
              ))}
            </div>
          </div>
        ))}

        {publications.length === 0 && (
          <p className="body-text text-muted">No publications yet.</p>
        )}
      </div>
    </div>
  );
}
