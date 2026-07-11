import { ScrollAnimation } from "@/components/ScrollAnimation";
import { getAllContent } from "@/lib/content";
import Link from "next/link";

export default function ReviewPage() {
  const reviews = getAllContent("reviews");

  return (
    <div className="page-container py-16 md:py-24">
      <div className="content-block">
        <ScrollAnimation>
          <h1 className="heading-xl mb-4">Review</h1>
          <p className="body-text text-muted mb-12 max-w-[65ch]">
            Critical reviews of books, papers, and other publications that inform or provoke
            the Institute&apos;s thinking. Each review is less a summary than an encounter.
          </p>
        </ScrollAnimation>

        <div className="space-y-10">
          {reviews.map((item, i) => (
            <ScrollAnimation key={item.slug} delay={i * 0.08}>
              <Link
                href={`/review/${item.slug}`}
                className="group block border-b border-border pb-8"
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
                  <div className="flex flex-wrap gap-2 mt-3">
                    {(item.meta.tags as string[]).map((tag) => (
                      <span key={tag} className="tag-pill">{tag}</span>
                    ))}
                  </div>
                )}
              </Link>
            </ScrollAnimation>
          ))}
        </div>

        {reviews.length === 0 && (
          <p className="body-text text-muted">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}
