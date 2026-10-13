import type { ReactNode } from "react";

interface Props {
  id: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Page section with a consistent heading and dimension-line rule. */
export function Section({ id, title, intro, children, className = "" }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`py-20 sm:py-28 ${className}`}>
      <div className="sheet">
        <header className="mb-10 max-w-prose sm:mb-14">
          <div className="dim-rule mb-5 w-16" aria-hidden="true" />
          <h2 id={`${id}-title`} className="text-[2rem] sm:text-[2.6rem]">
            {title}
          </h2>
          {intro && <p className="mt-4 text-muted">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
