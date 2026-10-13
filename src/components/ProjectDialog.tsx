import { ExternalLink, X } from "lucide-react";
import type { Project } from "../data/types";
import { Overlay } from "./Overlay";
import { TitleBlock } from "./TitleBlock";
import { Zoomable } from "./Lightbox";
import { AutosarDiagram } from "./AutosarDiagram";
import { GitHubIcon } from "./Icons";
import { asset } from "../lib/asset";

function Part({ n, title, items }: { n: number; title: string; items: string[] | string }) {
  const list = Array.isArray(items) ? items : [items];
  if (!list.length) return null;
  return (
    <section className="grid gap-2 border-t border-rule py-6 sm:grid-cols-[12rem_1fr] sm:gap-8">
      <h3 className="text-[1.02rem]">
        <span className="mr-2 tabular-nums text-faint">{n}</span>
        {title}
      </h3>
      {list.length === 1 ? (
        <p className="text-muted">{list[0]}</p>
      ) : (
        <ul className="space-y-2.5 text-muted">
          {list.map((t) => (
            <li key={t} className="relative pl-4 before:absolute before:left-0 before:top-[0.7em] before:h-[5px] before:w-[5px] before:bg-faint">
              {t}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const cs = project.caseStudy;
  const tb = project.titleBlock;
  const titleId = `case-${project.id}-title`;
  let n = 0;

  return (
    <Overlay onClose={onClose} labelledBy={titleId}>
      <div className="flex items-start justify-between gap-4 border-b border-rule px-5 py-4 sm:px-8">
        <div>
          <p className="text-[0.85rem] text-muted">Case study</p>
          <h2 id={titleId} className="text-[1.5rem] sm:text-[1.9rem]">{project.title}</h2>
        </div>
        <button data-autofocus type="button" onClick={onClose} className="btn btn-secondary shrink-0 px-3" aria-label="Close case study">
          <X className="h-5 w-5" aria-hidden="true" />
          <span className="hidden sm:inline">Close</span>
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-10 pt-6 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-[1.2fr_1fr]">
          <div className="overflow-hidden rounded-sm">
            {project.diagram === "autosar" ? (
              <AutosarDiagram />
            ) : project.cover ? (
              <Zoomable eager images={[project.cover, ...cs.gallery]} className="aspect-[4/3] w-full" />
            ) : null}
          </div>
          <div>
            <p className="text-ink">{project.summary}</p>
            <TitleBlock
              className="mt-5"
              columns="grid-cols-1"
              cells={[
                { label: "Context", value: tb.context },
                { label: "Year", value: tb.year },
                ...(tb.role ? [{ label: "Role", value: tb.role }] : []),
                { label: "Evidence", value: tb.evidence },
                ...(project.result ? [{ label: "Result", value: project.result, highlight: true }] : []),
              ]}
            />
          </div>
        </div>

        <div className="mt-8">
          <Part n={++n} title="Problem and objective" items={cs.problem} />
          {cs.role.length > 0 && <Part n={++n} title="My role and contribution" items={cs.role} />}
          <Part n={++n} title="System architecture" items={cs.architecture} />
          <Part n={++n} title="Implementation" items={cs.implementation} />
          <Part n={++n} title="Demonstration and results" items={cs.results} />
          {cs.safety && <Part n={++n} title="Safety and failsafes" items={cs.safety} />}
          <Part n={++n} title="Challenges and limitations" items={cs.limitations} />

          {cs.video && (
            <figure className="border-t border-rule py-6">
              <video
                className="mx-auto block max-h-[70vh] w-auto max-w-full rounded-sm border border-rule bg-black"
                controls
                muted
                playsInline
                preload="metadata"
              >
                {cs.video.webm && <source src={asset(cs.video.webm)} type="video/webm" />}
                <source src={asset(cs.video.src)} type="video/mp4" />
                <track kind="captions" />
              </video>
              <figcaption className="mt-2 text-sm text-muted">{cs.video.caption}</figcaption>
            </figure>
          )}

          <section className="border-t border-rule py-6">
            <h3 className="mb-4 text-[1.02rem]">
              <span className="mr-2 tabular-nums text-faint">{++n}</span>
              Repository and evidence
            </h3>
            {cs.gallery.length > 0 && (
              <ul className="mb-6 grid gap-4 sm:grid-cols-2">
                {cs.gallery.map((img, i) => (
                  <li key={img.src}>
                    <figure>
                      <Zoomable eager images={cs.gallery} index={i} fit={img.light ? "contain" : "cover"} className={`aspect-[4/3] w-full ${img.light ? "bg-white" : ""}`} />
                      <figcaption className="mt-2 text-sm text-muted">{img.caption}</figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex flex-wrap gap-3">
              <a href={project.repo} target="_blank" rel="noreferrer" className="btn btn-primary">
                <GitHubIcon className="h-4 w-4" /> View repository
              </a>
              {cs.extraLinks?.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="btn btn-secondary">
                  <ExternalLink className="h-4 w-4" aria-hidden="true" /> {l.label}
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Overlay>
  );
}
