import { ScrollAnimation } from "@/components/ScrollAnimation";
import { getAllContent } from "@/lib/content";
import Link from "next/link";

export default function ProjectsPage() {
  const projects = getAllContent("projects");

  return (
    <div className="page-container py-16 md:py-24">
      <div className="content-block">
        <ScrollAnimation>
          <h1 className="heading-xl mb-4">Projects</h1>
          <p className="body-text text-muted mb-12 max-w-[65ch]">
            Curatorial, editorial, and experimental projects initiated by the Institute.
          </p>
        </ScrollAnimation>

        <div className="space-y-12">
          {projects.map((project, i) => (
            <ScrollAnimation key={project.slug} delay={i * 0.08}>
              <Link
                href={`/projects/${project.slug}`}
                className="group block border-b border-border pb-8"
              >
                <p className="caption mb-2">{project.meta.date}</p>
                <h2 className="heading-md mb-3 group-hover:text-muted transition-colors duration-300">
                  {project.meta.title}
                </h2>
                {project.meta.description && (
                  <p className="body-text text-muted">{project.meta.description}</p>
                )}
              </Link>
            </ScrollAnimation>
          ))}
        </div>

        {projects.length === 0 && (
          <p className="body-text text-muted">No projects yet.</p>
        )}
      </div>
    </div>
  );
}
