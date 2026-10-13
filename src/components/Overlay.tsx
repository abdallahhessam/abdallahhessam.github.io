import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

/** Stack of open overlays so Escape and focus-trapping only act on the topmost one. */
const stack: symbol[] = [];

const FOCUSABLE =
  'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"]), input, select, textarea';

interface Props {
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  variant?: "dialog" | "lightbox";
}

/**
 * Accessible modal surface: focus moves in on open and returns on close,
 * Tab is trapped, Escape closes, and page scroll is locked.
 * Mount it inside <AnimatePresence> to get the exit animation.
 */
export function Overlay({ onClose, labelledBy, children, variant = "dialog" }: Props) {
  const panel = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const id = Symbol();
    stack.push(id);
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbar}px`;
    panel.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (stack[stack.length - 1] !== id) return;
      if (e.key === "Escape") {
        e.preventDefault();
        closeRef.current();
      } else if (e.key === "Tab" && panel.current) {
        const items = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
          (el) => el.offsetParent !== null,
        );
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      stack.splice(stack.indexOf(id), 1);
      if (!stack.length) {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, []);

  const isLightbox = variant === "lightbox";

  return createPortal(
    <motion.div
      className={`fixed inset-0 ${isLightbox ? "z-[70]" : "z-[60]"} flex items-stretch justify-center sm:items-center`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <div
        className={`absolute inset-0 ${isLightbox ? "bg-black/92" : "bg-black/75 backdrop-blur-[2px]"}`}
        onClick={() => closeRef.current()}
        aria-hidden="true"
      />
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={
          isLightbox
            ? "relative flex h-full w-full flex-col"
            : "relative flex h-full w-full flex-col overflow-hidden border-rule bg-panel sm:h-[min(92vh,60rem)] sm:max-w-4xl sm:rounded-md sm:border"
        }
        initial={{ opacity: 0, y: isLightbox ? 0 : 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: isLightbox ? 0 : 12 }}
        transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>,
    document.body,
  );
}
