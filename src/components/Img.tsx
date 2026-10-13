import { useState } from "react";
import { ImageOff } from "lucide-react";
import type { ImageAsset } from "../data/types";
import { asset } from "../lib/asset";

interface Props {
  image: ImageAsset;
  className?: string;
  /** "cover" crops to the container; "contain" shows the whole image. */
  fit?: "cover" | "contain";
  eager?: boolean;
  sizes?: string;
}

/** Image with intrinsic dimensions (no layout shift), lazy loading and a clear fallback. */
export function Img({ image, className = "", fit = "cover", eager = false }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={image.alt}
        className={`flex flex-col items-center justify-center gap-2 bg-raised p-6 text-center text-sm text-muted ${className}`}
      >
        <ImageOff aria-hidden="true" className="h-6 w-6 text-faint" />
        <span>Image unavailable</span>
        <code className="text-xs text-faint">{image.src}</code>
      </div>
    );
  }

  return (
    <img
      src={asset(image.src)}
      alt={image.alt}
      width={image.w}
      height={image.h}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      style={image.position && fit === "cover" ? { objectPosition: image.position } : undefined}
      className={`${fit === "cover" ? "object-cover" : "object-contain"} ${image.light ? "bg-white" : ""} ${className}`}
    />
  );
}
