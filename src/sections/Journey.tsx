import { journey } from "../data/content";
import { Section } from "../components/Section";
import { Reveal } from "../components/Reveal";

const kindLabel = { education: "Education", work: "Work", competition: "Competition" } as const;

export function Journey() {
  return (
    <Section id="journey" title="Engineering journey" intro="From a high-school solar tracker to robots on Jetson hardware: the milestones, grouped. Full roles are in the experience section.">
      <ol className="relative ml-[0.4rem] border-l border-rule sm:ml-[8.6rem]">
        {journey.map((item, i) => (
          <li key={item.title} className="relative pb-10 pl-7 last:pb-0 sm:pl-10">
            <span
              aria-hidden="true"
              className={`absolute -left-[5px] top-[0.55rem] h-[9px] w-[9px] rotate-45 border ${
                i === journey.length - 1 ? "border-signal bg-signal" : "border-faint bg-ground"
              }`}
            />
            <Reveal delay={0.02}>
              <p className="text-[0.92rem] tabular-nums text-signal sm:absolute sm:-left-[8.6rem] sm:top-[0.2rem] sm:w-[7.4rem] sm:text-right">
                {item.period}
              </p>
              <h3 className="mt-1 text-[1.18rem] sm:mt-0">
                {item.link ? (
                  <a href={item.link} className="hover:text-signal">{item.title}</a>
                ) : (
                  item.title
                )}
              </h3>
              <p className="mt-1.5 max-w-prose text-muted">{item.text}</p>
              <p className="mt-2 text-[0.8rem] text-faint">{kindLabel[item.kind]}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
