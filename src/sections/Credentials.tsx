import { Award, BadgeCheck, ExternalLink, GraduationCap } from "lucide-react";
import { awards, certifications, education, english, leadership } from "../data/content";
import { Section } from "../components/Section";
import { Zoomable } from "../components/Lightbox";

function Sub({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-rule pt-8" data-anchor id={id}>
      <h3 className="mb-6 text-[1.35rem]">{title}</h3>
      {children}
    </div>
  );
}

export function Credentials() {
  const withImage = certifications.filter((c) => c.image);
  const listed = certifications.filter((c) => !c.image);

  return (
    <Section id="credentials" title="Credentials">
      <div className="space-y-16">
        <Sub title="Technical certifications and professional development" id="certifications">
          <ul className="grid gap-6 md:grid-cols-2">
            {withImage.map((c) => (
              <li key={c.title} className="flex flex-col rounded-sm border border-rule bg-panel">
                <Zoomable images={[c.image!]} fit="contain" className="aspect-[4/3] w-full rounded-b-none border-0 border-b bg-white" />
                <div className="flex flex-1 flex-col p-5">
                  <h4 className="font-display text-[1.08rem] font-semibold leading-snug" style={{ fontVariationSettings: '"wdth" 108' }}>{c.title}</h4>
                  <p className="mt-1 text-muted">{c.issuer}{c.date ? `, ${c.date}` : ""}</p>
                  {c.topics && <p className="mt-2 text-[0.92rem] text-faint">Topics: {c.topics}</p>}
                  {c.verify && (
                    <a href={c.verify} target="_blank" rel="noreferrer" className="text-link mt-auto inline-flex items-center gap-1.5 pt-4 text-[0.95rem]">
                      <BadgeCheck className="h-4 w-4" aria-hidden="true" /> Verify on Coursera
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
            {listed.map((c) => (
              <li key={c.title} className="flex items-baseline justify-between gap-4 border-b border-rule py-3">
                <span>{c.title}</span>
                <span className="shrink-0 text-right text-[0.92rem] text-muted">{c.issuer}</span>
              </li>
            ))}
          </ul>
        </Sub>

        <Sub title="English proficiency" id="english">
          <div className="grid gap-8 rounded-sm border border-rule bg-panel p-6 sm:p-8 md:grid-cols-[auto_1fr] md:items-center md:gap-14">
            <div>
              <p className="text-muted">{english.test}</p>
              <p className="mt-1 flex items-baseline gap-3">
                <span className="font-display text-[4rem] font-semibold leading-none" style={{ fontVariationSettings: '"wdth" 118' }}>{english.overall}</span>
                <span className="text-muted">overall band<br />CEFR {english.cefr}</span>
              </p>
              <p className="mt-3 text-[0.92rem] text-faint">Test date: {english.date}</p>
            </div>
            <div>
              <table className="w-full max-w-md text-left">
                <caption className="sr-only">IELTS band scores by skill</caption>
                <thead>
                  <tr className="text-[0.82rem] text-faint">
                    {english.bands.map((b) => <th key={b.skill} scope="col" className="pb-1 font-normal">{b.skill}</th>)}
                  </tr>
                </thead>
                <tbody>
                  <tr className="font-display text-[1.6rem] font-semibold" style={{ fontVariationSettings: '"wdth" 110' }}>
                    {english.bands.map((b) => <td key={b.skill}>{b.score}</td>)}
                  </tr>
                </tbody>
              </table>
              <p className="mt-4 max-w-prose text-[0.92rem] text-muted">{english.note}</p>
            </div>
          </div>
        </Sub>

        <Sub title="Education, competitions and awards" id="education">
          <div className="grid gap-10 lg:grid-cols-2">
            <ul className="space-y-6">
              {education.map((e) => (
                <li key={e.degree} className="flex gap-4">
                  <GraduationCap className="mt-1 h-5 w-5 shrink-0 text-signal" aria-hidden="true" />
                  <div>
                    <h4 className="font-display text-[1.1rem] font-semibold" style={{ fontVariationSettings: '"wdth" 108' }}>{e.degree}</h4>
                    <p className="text-muted">{e.org}, {e.period}</p>
                    <ul className="mt-2 space-y-1 text-[0.95rem] text-muted">
                      {e.details.map((d) => <li key={d}>{d}</li>)}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
            <div>
              <ul className="border-t border-rule">
                {awards.map((a) => (
                  <li key={a.event} className="border-b border-rule">
                    <a href={a.link} className="group flex items-start gap-4 py-3.5">
                      <Award className="mt-1 h-4 w-4 shrink-0 text-amber" aria-hidden="true" />
                      <span className="flex-1">
                        <span className="text-ink group-hover:text-signal">{a.event}, {a.year}</span>
                        <span className="block text-[0.95rem] text-muted">{a.title}</span>
                      </span>
                      <ExternalLink className="mt-1 h-4 w-4 shrink-0 rotate-0 text-faint opacity-0 group-hover:opacity-100" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[0.92rem] text-faint">Also: {leadership.join("; ")}.</p>
            </div>
          </div>
        </Sub>
      </div>
    </Section>
  );
}
