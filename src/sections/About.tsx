import { about } from "../data/content";
import { Section } from "../components/Section";
import { Reveal } from "../components/Reveal";

export function About() {
  return (
    <Section id="about" title="Hardware, software and the space between">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <Reveal className="max-w-prose space-y-5 text-[1.08rem]">
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="text-muted first:text-ink">{p}</p>
          ))}
        </Reveal>
        <Reveal delay={0.08}>
          <h3 className="sr-only">Areas of work</h3>
          <ul className="border-t border-rule">
            {about.pillars.map((p) => (
              <li key={p.title} className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <span className="font-display text-[1rem] font-semibold text-ink" style={{ fontVariationSettings: '"wdth" 110' }}>{p.title}</span>
                <span className="text-[0.96rem] text-muted">{p.text}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
