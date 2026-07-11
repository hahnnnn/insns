import { ScrollAnimation } from "@/components/ScrollAnimation";
import { getAllContent } from "@/lib/content";
import Link from "next/link";

export default function ResearchPage() {
  const researchItems = getAllContent("research");

  return (
    <div className="page-container py-16 md:py-24">
      <div className="content-block">
        <ScrollAnimation>
          <h1 className="heading-xl mb-4">Research</h1>
          <p className="body-text text-muted mb-12 max-w-[65ch]">
            Ongoing research programs investigating the unexamined, the overlooked, and the
            deliberately ignored aspects of contemporary networked life.
          </p>
        </ScrollAnimation>

        <div className="space-y-12">
          {researchItems.map((item, i) => (
            <ScrollAnimation key={item.slug} delay={i * 0.08}>
              <Link
                href={`/research/${item.slug}`}
                className="group block border-b border-border pb-10"
              >
                <p className="caption mb-2">{item.meta.date}</p>
                <h2 className="heading-md mb-3 group-hover:text-muted transition-colors duration-300">
                  {item.meta.title}
                </h2>
                {item.meta.description && (
                  <p className="body-text text-muted leading-relaxed">
                    {item.meta.description}
                  </p>
                )}
                {item.meta.tags && item.meta.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.meta.tags.map((tag) => (
                      <span
                        key={tag}
                        className="caption border border-border px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </ScrollAnimation>
          ))}
        </div>

        {researchItems.length === 0 && (
          <p className="body-text text-muted">No research entries yet.</p>
        )}
      </div>
    </div>
  );
}
