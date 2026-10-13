import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Nav } from "./components/Nav";
import { LightboxProvider } from "./components/Lightbox";
import { ProjectDialog } from "./components/ProjectDialog";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Journey } from "./sections/Journey";
import { Projects } from "./sections/Projects";
import { Competitions } from "./sections/Competitions";
import { Experience } from "./sections/Experience";
import { Skills } from "./sections/Skills";
import { Credentials } from "./sections/Credentials";
import { Contact } from "./sections/Contact";
import { profile, projects } from "./data/content";
import { caseIdFromHash } from "./lib/caseStudy";

export default function App() {
  const [caseId, setCaseId] = useState<string | null>(() => caseIdFromHash(window.location.hash));

  // Case studies open from #case/<id> links, so they are shareable and work with Back.
  useEffect(() => {
    const onHash = () => setCaseId(caseIdFromHash(window.location.hash));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const closeCase = useCallback(() => {
    setCaseId(null);
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}#projects`);
  }, []);

  const project = projects.find((p) => p.id === caseId) ?? null;

  return (
    <LightboxProvider>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Journey />
        <Projects />
        <Competitions />
        <Experience />
        <Skills />
        <Credentials />
        <Contact />
      </main>
      <footer className="border-t border-rule py-8">
        <div className="sheet flex flex-wrap justify-between gap-3 text-sm text-faint">
          <span>{profile.name}, {profile.location}</span>
          <span>© {new Date().getFullYear()}. Built with React, TypeScript and Vite.</span>
        </div>
      </footer>
      <AnimatePresence>{project && <ProjectDialog key={project.id} project={project} onClose={closeCase} />}</AnimatePresence>
    </LightboxProvider>
  );
}
