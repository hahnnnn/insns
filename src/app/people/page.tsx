import { ScrollAnimation } from "@/components/ScrollAnimation";
import { getAllContent } from "@/lib/content";
import { User } from "lucide-react";

function PersonCard({ person }: { person: { slug: string; meta: Record<string, unknown> } }) {
  const role = person.meta.role ? String(person.meta.role) : null;
  const description = person.meta.description ? String(person.meta.description) : null;

  return (
    <div className="py-6 border-b border-border">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 shrink-0 border border-border flex items-center justify-center bg-surface-muted">
          <User size={18} className="text-muted" />
        </div>
        <div>
          <h2 className="text-sm font-medium">{person.meta.title as string}</h2>
          {role && <p className="caption">{role}</p>}
          {description && <p className="caption text-muted mt-1">{description}</p>}
        </div>
      </div>
    </div>
  );
}

function EmptyPerson({ name, description }: { name: string; description: string }) {
  return (
    <div className="py-6 border-b border-border">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 shrink-0 border border-border flex items-center justify-center bg-surface-muted">
          <User size={18} className="text-muted" />
        </div>
        <div>
          <h2 className="text-sm font-medium">{name}</h2>
          <p className="caption">Position Open</p>
          <p className="caption text-muted mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function PeoplePage() {
  const people = getAllContent("people");

  return (
    <div className="page-container py-16 md:py-24">
      <div className="content-block">
        <ScrollAnimation>
          <h1 className="heading-xl mb-4">People</h1>
          <p className="body-text text-muted mb-12 max-w-[65ch]">
            Researchers, contributors, and affiliates of the Institute.
          </p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {people.length > 0
            ? people.map((person, i) => (
                <ScrollAnimation key={person.slug} delay={i * 0.05}>
                  <PersonCard person={person as { slug: string; meta: Record<string, unknown> }} />
                </ScrollAnimation>
              ))
            : (
              <>
                <ScrollAnimation delay={0}>
                  <EmptyPerson
                    name="Founder &amp; Director"
                    description="The founding position remains deliberately unfilled."
                  />
                </ScrollAnimation>
                <ScrollAnimation delay={0.05}>
                  <EmptyPerson
                    name="Research Affiliate"
                    description="Applications for research affiliations are accepted on a rolling basis."
                  />
                </ScrollAnimation>
              </>
            )}
        </div>
      </div>
    </div>
  );
}
