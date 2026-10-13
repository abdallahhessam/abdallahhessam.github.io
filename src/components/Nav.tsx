import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav, profile } from "../data/content";
import { useActiveSection } from "../hooks/useActiveSection";

const ids = nav.map((n) => n.id);

export function Nav() {
  const active = useActiveSection(ids);
  const { scrollYProgress } = useScroll();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled || open ? "border-b border-rule bg-ground/90 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-signal focus:px-3 focus:py-2 focus:text-ground">
        Skip to content
      </a>
      <nav aria-label="Main" className="sheet flex h-16 items-center justify-between gap-6">
        <a href="#top" className="font-display text-[1.05rem] font-semibold tracking-tight text-ink" style={{ fontVariationSettings: '"wdth" 118' }}>
          {profile.name}
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} className="relative">
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`block px-3 py-2 text-[0.92rem] transition-colors ${isActive ? "text-ink" : "text-muted hover:text-ink"}`}
                >
                  {item.label}
                </a>
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-[13px] h-[2px] bg-signal"
                    transition={{ type: "spring", stiffness: 420, damping: 38 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <a href={profile.cv} download={profile.cvFileName} className="btn btn-secondary hidden min-h-[38px] py-1.5 text-sm lg:inline-flex">
          Download CV
        </a>

        <button
          type="button"
          className="btn btn-quiet -mr-2 px-2 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </nav>

      {/* Reading progress */}
      <motion.div aria-hidden="true" className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-signal/70" style={{ scaleX: scrollYProgress }} />

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="border-t border-rule bg-ground lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="sheet grid gap-1 py-4">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? "location" : undefined}
                    className={`flex min-h-[44px] items-center border-l-2 pl-4 text-lg ${
                      active === item.id ? "border-signal text-ink" : "border-transparent text-muted"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-3">
                <a href={profile.cv} download={profile.cvFileName} className="btn btn-secondary w-full justify-center">
                  Download CV
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
