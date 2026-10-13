# Abdallah Essam — Robotics Engineering Portfolio

A single-page portfolio built with React, TypeScript, Vite, Tailwind CSS and Framer Motion.
All content lives in one file, so you can update it without touching the components.

## Quick start

Requires Node.js 18 or newer (20 recommended).

```bash
npm install
npm run dev        # local development at http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build at http://localhost:4173
npm run lint       # ESLint
```

## Updating content

| What | Where |
|---|---|
| Text, projects, experience, skills, certifications, IELTS, awards | `src/data/content.ts` |
| Content types (what fields exist) | `src/data/types.ts` |
| Images | `public/assets/...` (paths in `content.ts` have no leading slash) |
| CV download | `public/assets/cv/Abdallah_Essam_CV.pdf` — replace the file, keep the name |
| Colors and fonts | `tailwind.config.js`, `src/styles/index.css` |
| Page title, description, social image | `index.html`, `public/og-image.png` |

**Adding a certificate image:** export it as WebP or PNG (about 1300 px wide) into
`public/assets/certificates/`, then add an `image` object to that entry in the
`certifications` list in `content.ts` (copy the ROS 2 entry as a template).
Entries without an image appear as text rows.

**Videos:** a case study can take an H.264 `.mp4` (for Safari and iOS) plus a VP9
`.webm` (`video.webm`); browsers pick whichever they support. Keep each under about 3 MB.

**Adding a case-study figure:** drop the image into the project's folder and add it to
that project's `caseStudy.gallery`. Set `light: true` for white-background plots and
diagrams so they sit on a white mat. Set `position: "50% 20%"` to control how a cover
image is cropped.

**Linking to a case study:** every case study has its own address, e.g.
`https://<your-site>/#case/umex`. IDs: `umex`, `scarab`, `e-rally`, `agri`, `autosar`.

## Deploying to GitHub Pages

The site uses a relative base path (`./`), so the same build works at
`https://abdallahhessam.github.io/` **or** under any repository name such as
`https://abdallahhessam.github.io/portfolio/`. No configuration change is needed.

### Step by step (first deploy)

1. **Pick the address.**
   - For `https://abdallahhessam.github.io/`, name the repository exactly `abdallahhessam.github.io`.
   - For `https://abdallahhessam.github.io/portfolio/`, name it `portfolio` (or anything else).
2. **Create the repository** on GitHub: <https://github.com/new>, Public, no README
   (this project already has one).
3. **Push the code** from the unzipped folder:
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/abdallahhessam/<repository-name>.git
   git push -u origin main
   ```
4. **Turn on Pages:** in the repository, open **Settings → Pages → Build and deployment**
   and set **Source** to **GitHub Actions**.
5. **Watch the deploy:** open the **Actions** tab. The "Deploy to GitHub Pages" workflow
   lints, builds and publishes (about 1–2 minutes). If it ran before you changed the
   Source setting and failed, press **Re-run all jobs**.
6. **Open the site** at the URL shown in the finished workflow run, or under
   **Settings → Pages**.
7. **Fix social previews:** in `index.html`, replace both `./og-image.png` values with
   the absolute address, e.g. `https://abdallahhessam.github.io/og-image.png`, then commit
   and push. LinkedIn caches previews; refresh it with the LinkedIn Post Inspector.

### Updating the site later

Edit `src/data/content.ts` (or replace files in `public/assets/`), then:

```bash
npm run dev            # check locally
git add . && git commit -m "Update content" && git push
```

Every push to `main` redeploys automatically.

### Optional: custom domain

In **Settings → Pages → Custom domain**, enter your domain and follow GitHub's DNS
instructions. Because the base path is relative, no code change is needed.

### Optional: forcing an absolute base path

Only needed if you add client-side routing later:

```bash
BASE_PATH=/your-repo-name/ npm run build
```

### Troubleshooting

| Symptom | Fix |
|---|---|
| Workflow fails at "Deploy" with a Pages error | Settings → Pages → Source must be **GitHub Actions**, then re-run the job |
| Workflow fails at `npm ci` | Commit `package-lock.json` (it is included in this project) |
| Page loads but images are missing | Check that file names in `content.ts` match `public/assets/` exactly; GitHub Pages is case-sensitive |
| 404 at the site address | Wait two minutes after the first deploy, then hard-refresh |

## Project structure

```
src/
  data/          content.ts (all text), types.ts
  components/    Nav, ArmHero (interactive IK arm), Overlay (accessible modal),
                 Lightbox, ProjectDialog, AutosarDiagram, TitleBlock, Img, Section, Reveal
  sections/      Hero, About, Journey, Projects, Competitions, Experience, Skills,
                 Credentials, Contact
  hooks/         useActiveSection (nav highlight)
  lib/           asset path helper, case-study link helpers
  styles/        global CSS and design tokens
public/assets/   projects/, competitions/, certificates/, cv/
```

## Accessibility and performance notes

- Keyboard: skip link, visible focus rings, focus-trapped dialogs, Escape to close,
  arrow keys in the image viewer and on the robot arm (Shift = faster, Home = reset).
- `prefers-reduced-motion`: entrance animations and smooth scrolling are switched off.
- The hero arm is plain SVG (no 3D runtime); it only animates in response to input.
- Images are WebP with fixed dimensions (no layout shift) and lazy loading.
  Fonts are self-hosted; the site makes no third-party requests.
- No contact form: contact is by email, phone, LinkedIn and GitHub.

## Privacy

Not included in this repository or on the site, by design: degree certificate,
transcript, high-school certificate and the IELTS Test Report Form (they contain ID
numbers, dates of birth and photos). The IELTS result is shown as text only.
