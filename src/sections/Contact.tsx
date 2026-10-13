import { useState } from "react";
import { Check, Copy, Mail, Phone } from "lucide-react";
import { profile } from "../data/content";
import { GitHubIcon, LinkedInIcon } from "../components/Icons";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-rule py-24 sm:py-32">
      <div aria-hidden="true" className="blueprint pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_80%_at_20%_60%,black,transparent)]" />
      <div className="sheet relative">
        <div className="dim-rule mb-5 w-16" aria-hidden="true" />
        <h2 id="contact-title" className="max-w-3xl text-[2.2rem] sm:text-[3.2rem]">Let's talk about your robots</h2>
        <p className="mt-5 max-w-prose text-[1.1rem] text-muted">
          I'm interested in robotics engineering, R&amp;D and lab roles where hardware, software and perception meet, and in
          helping teams learn to build with them. Email is the quickest way to reach me.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a href={`mailto:${profile.email}`} className="btn btn-primary text-[1rem]">
            <Mail className="h-4 w-4" aria-hidden="true" /> {profile.email}
          </a>
          <button type="button" onClick={copy} className="btn btn-secondary" aria-live="polite">
            {copied ? <Check className="h-4 w-4 text-signal" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
            {copied ? "Email copied" : "Copy email"}
          </button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a href={profile.phoneHref} className="btn btn-secondary"><Phone className="h-4 w-4" aria-hidden="true" /> {profile.phone}</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary"><LinkedInIcon /> LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-secondary"><GitHubIcon /> GitHub</a>
          <a href={profile.cv} download={profile.cvFileName} className="btn btn-secondary">Download CV (PDF)</a>
        </div>
      </div>
    </section>
  );
}
