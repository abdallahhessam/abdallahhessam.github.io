export interface ImageAsset {
  src: string;
  alt: string;
  w: number;
  h: number;
  caption?: string;
  /** Diagram or plot with a white background: shown on a light mat. */
  light?: boolean;
  /** CSS object-position used when the image is cropped, e.g. "50% 20%". */
  position?: string;
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  titleBlock: { context: string; role?: string; evidence: string; year: string };
  result?: string;
  tags: string[];
  cover?: ImageAsset;
  /** Use a built-in SVG diagram instead of a photo. */
  diagram?: "autosar";
  repo: string;
  caseStudy: {
    problem: string;
    role: string[];
    architecture: string[];
    implementation: string[];
    results: string[];
    limitations: string[];
    safety?: string[];
    /** src = H.264 MP4 (Safari/iOS); webm = VP9 fallback, listed first for other browsers. */
    video?: { src: string; webm?: string; caption: string };
    gallery: ImageAsset[];
    extraLinks?: { label: string; href: string }[];
  };
}

export interface MiniProject {
  title: string;
  text: string;
  tags: string[];
  repo: string;
}

export interface Competition {
  id: string;
  event: string;
  year: string;
  achievement: string;
  secondary?: string;
  role: string;
  project: string;
  problem: string;
  solution: string;
  image: ImageAsset;
  detail?: {
    objective: string;
    approach: string[];
    reported: string;
    people?: string;
    gallery: ImageAsset[];
  };
  /** Link to a featured project case study instead of a separate detail view. */
  caseStudyId?: string;
}

export interface JourneyItem {
  period: string;
  title: string;
  text: string;
  kind: "education" | "work" | "competition";
  link?: string;
}

export interface ExperienceItem {
  title: string;
  org: string;
  place: string;
  type?: string;
  period: string;
  current?: boolean;
  points: string[];
  link?: string;
  linkLabel?: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date?: string;
  topics?: string;
  verify?: string;
  image?: ImageAsset;
}
