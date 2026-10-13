import { useEffect, useState } from "react";

/** Returns the id of the section currently in the reading zone of the viewport. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const onTop = () => { if (window.scrollY < 200) setActive(""); };
    window.addEventListener("scroll", onTop, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", onTop); };
  }, [ids]);
  return active;
}
