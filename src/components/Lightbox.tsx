import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ImageAsset } from "../data/types";
import { Overlay } from "./Overlay";
import { Img } from "./Img";

interface LightboxState {
  images: ImageAsset[];
  index: number;
}

const LightboxContext = createContext<(images: ImageAsset[], index?: number) => void>(() => {});

export const useLightbox = () => useContext(LightboxContext);

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LightboxState | null>(null);
  const open = useCallback((images: ImageAsset[], index = 0) => setState({ images, index }), []);
  const close = useCallback(() => setState(null), []);

  return (
    <LightboxContext.Provider value={open}>
      {children}
      <AnimatePresence>{state && <LightboxView key="lightbox" state={state} setState={setState} onClose={close} />}</AnimatePresence>
    </LightboxContext.Provider>
  );
}

function LightboxView({
  state,
  setState,
  onClose,
}: {
  state: LightboxState;
  setState: (s: LightboxState) => void;
  onClose: () => void;
}) {
  const { images, index } = state;
  const image = images[index];
  const many = images.length > 1;
  const go = useCallback(
    (step: number) => setState({ images, index: (index + step + images.length) % images.length }),
    [images, index, setState],
  );

  useEffect(() => {
    if (!many) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [go, many]);

  return (
    <Overlay onClose={onClose} labelledBy="lightbox-caption" variant="lightbox">
      <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm text-muted sm:px-6">
        <span aria-live="polite">{many ? `Image ${index + 1} of ${images.length}` : "Image preview"}</span>
        <button data-autofocus type="button" onClick={onClose} className="btn btn-secondary px-3" aria-label="Close image preview">
          <X className="h-5 w-5" aria-hidden="true" />
          <span className="hidden sm:inline">Close</span>
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16" onClick={onClose}>
        <figure className="flex max-h-full max-w-full flex-col items-center" onClick={(e) => e.stopPropagation()}>
          <Img key={image.src} image={image} fit="contain" eager className="max-h-[calc(100vh-9.5rem)] w-auto max-w-full rounded-sm" />
          <figcaption id="lightbox-caption" className="mt-3 max-w-prose px-3 text-center text-sm text-muted">
            {image.caption ?? image.alt}
          </figcaption>
        </figure>
        {many && (
          <>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); go(-1); }}
              className="btn btn-secondary absolute left-2 top-1/2 -translate-y-1/2 px-2 sm:left-4"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); go(1); }}
              className="btn btn-secondary absolute right-2 top-1/2 -translate-y-1/2 px-2 sm:right-4"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </>
        )}
      </div>
    </Overlay>
  );
}

/** A thumbnail button that opens the lightbox. */
export function Zoomable({
  images,
  index = 0,
  className = "",
  imgClassName = "",
  fit = "cover",
  eager = false,
}: {
  images: ImageAsset[];
  index?: number;
  className?: string;
  imgClassName?: string;
  fit?: "cover" | "contain";
  /** Load immediately (used inside dialogs, where lazy loading lags in the scroll container). */
  eager?: boolean;
}) {
  const open = useLightbox();
  const image = images[index];
  return (
    <button
      type="button"
      onClick={() => open(images, index)}
      className={`group relative block overflow-hidden rounded-sm border border-rule bg-raised text-left ${className}`}
      aria-label={`Enlarge image: ${image.caption ?? image.alt}`}
    >
      <Img image={image} fit={fit} eager={eager} className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.02] ${imgClassName}`} />
    </button>
  );
}
