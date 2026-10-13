import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";
import { heroFacts, profile } from "../data/content";
import { ArmHero } from "../components/ArmHero";
import { GitHubIcon, LinkedInIcon } from "../components/Icons";
import { TitleBlock } from "../components/TitleBlock";

const riseFx = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] as const },
});

export function Hero() {
  const area = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  // Reduced motion: render in place with no entrance animation at all.
  const rise = (delay: number) => (reduce ? { initial: false as const } : riseFx(delay));
  return (
    <section ref={area} id="top" aria-labelledby="hero-title" className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24">
      <div
        aria-hidden="true"
        className="blueprint pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_75%_70%_at_72%_45%,black,transparent)]"
      />
      <div className="sheet relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <div>
          <motion.p {...rise(0)} className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-muted">
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              <MapPin className="h-4 w-4 text-signal" aria-hidden="true" />
              {profile.location}
            </span>
            <span className="hidden text-faint sm:inline" aria-hidden="true">/</span>
            <span className="w-full sm:w-auto">{profile.role}</span>
          </motion.p>
          <motion.h1 {...rise(0.08)} id="hero-title" className="text-[3.1rem] sm:text-[4.4rem] lg:text-[5rem]" style={{ fontVariationSettings: '"wdth" 120' }}>
            {profile.name}
          </motion.h1>
          <motion.p {...rise(0.16)} className="mt-4 font-display text-[1.45rem] font-medium text-signal sm:text-[1.8rem]" style={{ fontVariationSettings: '"wdth" 105' }}>
            {profile.headline}
          </motion.p>
          <motion.p {...rise(0.24)} className="mt-6 max-w-[34rem] text-[1.12rem] leading-relaxed text-muted">
            {profile.statement} My work spans robotics and autonomous systems, embedded engineering and AI-based perception.
          </motion.p>

          <motion.div {...rise(0.32)} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn btn-primary">Explore my work</a>
            <a href={profile.cv} download={profile.cvFileName} className="btn btn-secondary">Download CV</a>
            <span className="mx-1 hidden h-6 w-px bg-rule sm:block" aria-hidden="true" />
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-quiet px-2">
              <LinkedInIcon /> LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-quiet px-2">
              <GitHubIcon /> GitHub
            </a>
          </motion.div>

          <motion.div {...rise(0.4)} className="mt-12 max-w-[36rem]">
            <TitleBlock cells={heroFacts} columns="sm:grid-cols-1" />
          </motion.div>
        </div>

        <figure className="relative mx-auto w-full max-w-[36rem] lg:max-w-none">
          <ArmHero areaRef={area} />
          <figcaption className="mt-3 text-sm text-faint">
            A planar two-joint arm, solved with inverse kinematics as you move. Try it with your pointer or the arrow keys.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
