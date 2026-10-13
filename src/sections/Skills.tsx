import { skills } from "../data/content";
import { Section } from "../components/Section";

export function Skills() {
  return (
    <Section id="skills" title="Technical skills" intro="Grouped by discipline. No percentage bars: the projects above are the evidence.">
      <div className="grid gap-x-12 gap-y-9 md:grid-cols-2">
        {skills.map((g) => (
          <div key={g.title} className="border-t border-rule pt-4">
            <h3 className="text-[1.05rem]">{g.title}</h3>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {g.items.map((s) => (
                <li key={s} className="tag text-ink/85">{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
