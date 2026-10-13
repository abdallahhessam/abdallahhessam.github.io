import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Award, X } from "lucide-react";
import { competitions } from "../data/content";
import type { Competition } from "../data/types";
import { Section } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { Zoomable } from "../components/Lightbox";
import { Overlay } from "../components/Overlay";
import { caseHref } from "../lib/caseStudy";

function CompetitionDialog({ c, onClose }: { c: Competition; onClose: () => void }) {
  const d = c.detail!;
  const titleId = `comp-${c.id}-title`;
  return (
    <Overlay onClose={onClose} labelledBy={titleId}>
      <div className="flex items-start justify-between gap-4 border-b border-rule px-5 py-4 sm:px-8">
        <div>
          <p className="text-[0.85rem] text-muted">{c.event}, {c.year}</p>
          <h2 id={titleId} className="text-[1.45rem] sm:text-[1.8rem]">{c.project}</h2>
        </div>
        <button data-autofocus type="button" onClick={onClose} className="btn btn-secondary shrink-0 px-3" aria-label="Close details">
          <X className="h-5 w-5" aria-hidden="true" />
          <span className="hidden sm:inline">Close</span>
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-10 pt-6 sm:px-8">
        <p className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 text-amber">
          <Award className="h-4 w-4" aria-hidden="true" />
          {c.achievement}
          {c.secondary && <span className="text-muted">{c.secondary}</span>}
        </p>
        <p className="mt-2 text-muted">{c.role}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[c.image, ...d.gallery].map((img, i, all) => (
            <figure key={img.src}>
              <Zoomable eager images={all} index={i} fit={img.light ? "contain" : "cover"} className={`aspect-[4/3] w-full ${img.light ? "bg-white" : ""}`} />
              <figcaption className="mt-2 text-sm text-muted">{img.caption ?? img.alt}</figcaption>
            </figure>
          ))}
        </div>

        <section className="mt-8 border-t border-rule pt-6">
          <h3 className="text-[1.02rem]">Objective</h3>
          <p className="mt-2 text-muted">{d.objective}</p>
        </section>
        <section className="mt-6 border-t border-rule pt-6">
          <h3 className="text-[1.02rem]">Technical approach</h3>
          <ul className="mt-3 space-y-2.5 text-muted">
            {d.approach.map((a) => (
              <li key={a} className="relative pl-4 before:absolute before:left-0 before:top-[0.7em] before:h-[5px] before:w-[5px] before:bg-faint">{a}</li>
            ))}
          </ul>
        </section>
        <section className="mt-6 border-t border-rule pt-6">
          <h3 className="text-[1.02rem]">What was reported</h3>
          <p className="mt-2 text-muted">{d.reported}</p>
          {d.people && <p className="mt-3 text-sm text-faint">{d.people}</p>}
        </section>
      </div>
    </Overlay>
  );
}

export function Competitions() {
  const [open, setOpen] = useState<Competition | null>(null);
  const featured = competitions.filter((c) => !c.caseStudyId);
  const linked = competitions.filter((c) => c.caseStudyId);

  return (
    <Section
      id="competitions"
      title="Competitions and innovation"
      intro="Before the job titles, there were science fairs, hackathons and an arena. These are the builds behind the results."
    >
      <div className="space-y-16 sm:space-y-24">
        {featured.map((c, i) => (
          <Reveal key={c.id}>
            <article aria-labelledby={`c-${c.id}`} className="grid gap-6 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-2">
                <p className="font-display text-[3rem] font-semibold leading-none text-faint/60 sm:text-[3.6rem] lg:text-[3.1rem]" style={{ fontVariationSettings: '"wdth" 100' }} aria-hidden="true">
                  {c.year}
                </p>
              </div>
              <div className={`lg:col-span-5 ${i % 2 ? "lg:order-3" : ""}`}>
                <Zoomable
                  images={[c.image, ...(c.detail?.gallery ?? [])]}
                  className={c.image.h > c.image.w ? "aspect-[4/5] w-full sm:max-w-sm lg:max-w-none" : "aspect-[4/3] w-full"}
                />
              </div>
              <div className="lg:col-span-5">
                <p className="text-muted">
                  {c.event} <span className="sr-only">{c.year}</span>
                </p>
                <h3 id={`c-${c.id}`} className="mt-1 text-[1.5rem] sm:text-[1.7rem]">{c.project}</h3>
                <p className="mt-3 inline-flex items-center gap-2 text-amber">
                  <Award className="h-4 w-4" aria-hidden="true" />
                  {c.achievement}
                </p>
                {c.secondary && <p className="mt-1 text-[0.95rem] text-muted">{c.secondary}</p>}
                <p className="mt-1 text-[0.95rem] text-muted">{c.role}</p>
                <dl className="mt-5 space-y-3">
                  <div>
                    <dt className="text-[0.82rem] text-faint">Problem</dt>
                    <dd className="text-muted">{c.problem}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.82rem] text-faint">Solution</dt>
                    <dd className="text-muted">{c.solution}</dd>
                  </div>
                </dl>
                <button type="button" onClick={() => setOpen(c)} className="btn btn-secondary mt-6">
                  View project details
                </button>
              </div>
            </article>
          </Reveal>
        ))}

        {linked.map((c) => (
          <Reveal key={c.id}>
            <article aria-labelledby={`c-${c.id}`} className="grid items-center gap-6 border-t border-rule pt-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-2">
                <p className="font-display text-[3rem] font-semibold leading-none text-faint/60 sm:text-[3.6rem] lg:text-[3.1rem]" style={{ fontVariationSettings: '"wdth" 100' }} aria-hidden="true">
                  {c.year}
                </p>
              </div>
              <div className="lg:col-span-3">
                <Zoomable images={[c.image]} className="aspect-[4/3] w-full max-w-sm" />
              </div>
              <div className="lg:col-span-7">
                <p className="text-muted">{c.event}</p>
                <h3 id={`c-${c.id}`} className="mt-1 text-[1.35rem]">{c.project}</h3>
                <p className="mt-2 inline-flex items-center gap-2 text-amber">
                  <Award className="h-4 w-4" aria-hidden="true" />
                  {c.achievement}
                </p>
                <p className="mt-1 text-[0.95rem] text-muted">{c.role}. {c.solution}</p>
                <a href={caseHref(c.caseStudyId!)} className="btn btn-secondary mt-5">Read the Scarab case study</a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>{open && <CompetitionDialog key={open.id} c={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </Section>
  );
}
