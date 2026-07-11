import { ScrollAnimation } from "@/components/ScrollAnimation";
import { getArchiveItems, getAllContent } from "@/lib/content";
import Link from "next/link";

export default function ArchivePage() {
  const archiveItems = getArchiveItems();

  // Hard-coded static timeline items
  const staticTimeline = [
    { year: "2026", items: [{ title: "Cancellation of Forum on Network Society", date: "2026-03" }] },
    { year: "2025", items: [{ title: "Publication of First Working Paper", date: "2025-09" }, { title: "Establishment of Reading Room", date: "2025-04" }] },
    { year: "2024", items: [{ title: "Institute Founded", date: "2024-11" }, { title: "Initial Research Program Launched", date: "2024-12" }] },
    { year: "2023", items: [{ title: "No Record", date: "2023" }] },
    { year: "2022", items: [{ title: "Pre-history: Conversations Begin", date: "2022" }] },
  ];

  // Merge with dynamic content
  const mergedTimeline = archiveItems.reduce((acc, dyn) => {
    const existing = acc.find((s) => s.year === dyn.year);
    if (existing) {
      existing.items.push(...dyn.items.map((i) => ({ ...i, title: i.title + " (content)" })));
    } else {
      acc.push({ year: dyn.year, items: dyn.items.map((i) => ({ ...i, title: i.title })) });
    }
    return acc;
  }, staticTimeline);

  mergedTimeline.sort((a, b) => Number(b.year) - Number(a.year));

  return (
    <div className="page-container py-16 md:py-24">
      <div className="content-block">
        <ScrollAnimation>
          <h1 className="heading-xl mb-4">Archive</h1>
          <p className="body-text text-muted mb-12 max-w-[65ch]">
            A chronological record of the Institute&apos;s activities, publications, and
            institutional memory. The archive is intentionally incomplete.
          </p>
        </ScrollAnimation>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[72px] top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="space-y-0">
            {mergedTimeline.map((period, i) => (
              <ScrollAnimation key={period.year} delay={i * 0.06}>
                <div className="relative flex gap-6 py-6 border-b border-border last:border-0">
                  {/* Year marker */}
                  <div className="w-16 shrink-0 text-right">
                    <span className="text-sm font-medium">{period.year}</span>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-[68px] top-[26px] w-[10px] h-[10px] rounded-full border border-border bg-background z-10" />

                  <div className="pl-0 md:pl-10 space-y-3 flex-1">
                    {period.items.map((item, j) => (
                      <div key={`${item.title}-${j}`}>
                        <p className="text-sm">
                          {item.title}
                        </p>
                        {item.date && (
                          <p className="caption text-muted mt-0.5">{item.date}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
