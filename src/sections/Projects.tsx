import { ArrowUpRight, Award } from "lucide-react";
import { moreProjects, projects } from "../data/content";
import type { Project } from "../data/types";
import { Section } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { Img } from "../components/Img";
import { TitleBlock } from "../components/TitleBlock";
import { AutosarDiagram } from "../components/AutosarDiagram";
import { GitHubIcon } from "../components/Icons";
import { caseHref } from "../lib/caseStudy";

function Visual({ project }: { project: Project }) {
  if (project.diagram === "autosar") return <AutosarDiagram compact />;
  if (!project.cover) return null;
  return (
    <a
      href={caseHref(project.id)}
      className="group block h-full overflow-hidden rounded-sm border border-rule bg-raised"
      aria-label={`Open the ${project.title} case study`}
      tabIndex={-1}
    >
      <Img image={project.cover} className="aspect-[4/3] h-full w-full transition-transform duration-700 group-hover:scale-[1.025]" />
    </a>
  );
}

function ProjectRow({ project, flip }: { project: Project; flip: boolean }) {
  const tb = project.titleBlock;
  return (
    <article aria-labelledby={`p-${project.id}`} className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
      <Reveal className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <Visual project={project} />
      </Reveal>
      <Reveal delay={0.06} className="lg:col-span-5">
        {project.result && (
          <p className="mb-3 inline-flex items-center gap-2 text-[0.92rem] text-amber">
            <Award className="h-4 w-4" aria-hidden="true" />
            {project.result}
          </p>
        )}
        <h3 id={`p-${project.id}`} className="text-[1.65rem] sm:text-[1.9rem]">
          {project.title}
        </h3>
        <p className="mt-3 text-muted">{project.summary}</p>
        <TitleBlock
          className="mt-6"
          cells={[
            { label: "Context", value: tb.context },
            { label: "Year", value: tb.year },
            ...(tb.role ? [{ label: "Role", value: tb.role }] : []),
            { label: "Evidence", value: tb.evidence },
          ]}
        />
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.tags.map((t) => (
            <li key={t} className="tag">{t}</li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={caseHref(project.id)} className="btn btn-primary">Read case study</a>
          <a href={project.repo} target="_blank" rel="noreferrer" className="btn btn-secondary">
            <GitHubIcon className="h-4 w-4" /> Repository
          </a>
        </div>
      </Reveal>
    </article>
  );
}

export function Projects() {
  return (
    <Section
      id="projects"
      title="Featured projects"
      intro="Five systems, from autonomous drones and a welded combat robot to an automotive communication stack. Each case study says plainly what was built physically, what ran in simulation and what is still a design."
    >
      <div className="space-y-20 sm:space-y-28">
        {projects.map((p, i) => (
          <ProjectRow key={p.id} project={p} flip={i % 2 === 1} />
        ))}
      </div>

      <div className="mt-24 border-t border-rule pt-10" data-anchor id="more-projects">
        <h3 className="text-[1.3rem]">More engineering projects</h3>
        <p className="mt-2 max-w-prose text-muted">Smaller embedded builds on STM32.</p>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {moreProjects.map((m) => (
            <li key={m.title}>
              <a
                href={m.repo}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col rounded-sm border border-rule bg-panel p-5 transition-colors hover:border-faint"
              >
                <span className="flex items-start justify-between gap-4">
                  <span className="font-display text-[1.08rem] font-semibold" style={{ fontVariationSettings: '"wdth" 110' }}>{m.title}</span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-faint transition-colors group-hover:text-signal" aria-hidden="true" />
                </span>
                <span className="mt-2 text-[0.96rem] text-muted">{m.text}</span>
                <span className="mt-4 flex flex-wrap gap-1.5">
                  {m.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </span>
                <span className="sr-only">(opens repository on GitHub)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
