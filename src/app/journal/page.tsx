import { ScrollAnimation } from "@/components/ScrollAnimation";
import { getAllContent } from "@/lib/content";
import Link from "next/link";

export default function JournalPage() {
  const entries = getAllContent("journal");

  return (
    <div className="page-container py-16 md:py-24">
      <div className="content-block">
        <ScrollAnimation>
          <h1 className="heading-xl mb-4">Journal</h1>
          <p className="body-text text-muted mb-12 max-w-[65ch]">
            Notes, fragments, observations, and provisional thoughts.
          </p>
        </ScrollAnimation>

        <div className="space-y-8">
          {entries.map((entry, i) => (
            <ScrollAnimation key={entry.slug} delay={i * 0.06}>
              <Link
                href={`/journal/${entry.slug}`}
                className="group block border-b border-border pb-6"
              >
                <p className="caption mb-1">{entry.meta.date}</p>
                <h2 className="heading-sm mb-2 group-hover:text-muted transition-colors duration-300">
                  {entry.meta.title}
                </h2>
                {entry.meta.description && (
                  <p className="body-small text-muted">{entry.meta.description}</p>
                )}
              </Link>
            </ScrollAnimation>
          ))}
        </div>

        {entries.length === 0 && (
          <p className="body-text text-muted">No journal entries yet.</p>
        )}
      </div>
    </div>
  );
}
