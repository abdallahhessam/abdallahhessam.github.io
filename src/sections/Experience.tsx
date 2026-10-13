import { experience } from "../data/content";
import { Section } from "../components/Section";
import { Reveal } from "../components/Reveal";

export function Experience() {
  return (
    <Section id="experience" title="Professional experience" intro="Titles and dates as they appear on my CV.">
      <ol className="border-t border-rule">
        {experience.map((e) => (
          <li key={`${e.org}-${e.period}`} className="border-b border-rule">
            <Reveal className="grid gap-3 py-8 md:grid-cols-[13rem_1fr] md:gap-10">
              <div>
                <p className={`tabular-nums ${e.current ? "text-signal" : "text-muted"}`}>{e.period}</p>
                <p className="mt-1 text-[0.85rem] text-faint">{[e.place, e.type].filter(Boolean).join(", ")}</p>
              </div>
              <div>
                <h3 className="text-[1.25rem]">
                  {e.title}
                  <span className="font-sans text-[1.05rem] font-normal text-muted"> at {e.org}</span>
                </h3>
                <ul className={`mt-3 max-w-[46rem] space-y-2 ${e.current ? "text-ink/90" : "text-muted"}`}>
                  {e.points.map((p) => (
                    <li key={p} className="relative pl-4 before:absolute before:left-0 before:top-[0.7em] before:h-[5px] before:w-[5px] before:bg-faint">{p}</li>
                  ))}
                </ul>
                {e.link && (
                  <a href={e.link} className="text-link mt-3 inline-block text-[0.95rem]">{e.linkLabel ?? "See the case study"}</a>
                )}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
