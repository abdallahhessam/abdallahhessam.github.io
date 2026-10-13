# Content and asset checklist

Status as of 13 October 2026.

## Suggested CV edits (the site already uses the verified wording)

| CV currently says | Source document says | Site shows |
|---|---|---|
| STEM.org Certified Master Trainer | Certificate: **STEM.org Certified Educational Instructor** (Aug 5, 2025) | Certified Educational Instructor |
| Finalist – ISEF Competition 2017 | Your confirmation: Egyptian national fair (Intel ISEF-affiliated) | National finalist, ISEF Egypt |
| (not listed) | LEGO Education Academy Teacher Trainer (July 21, 2026) | Listed with certificate image |

## Still optional

| Item | Notes |
|---|---|
| Certificate images for AUTOSAR MasterClass (SPRINTS), Robotics Workshop (BETA Academy), Entrepreneurship Program for Youth (TIEC – InnovEgypt) | Shown as text rows until supplied |
| Professional portrait | The hero uses the robot-arm drawing instead |

## Decided

- **AUTOSAR:** README clusters shown as "described in README"; only `ara::core`, `ara::exec`, the socket test and the ARXML reader shown as "source in repo".
- **Agri robot:** no role; year 2024; prototype hardware with rebuilt software tested in simulation.
- **ISEF 2017:** national finalist, ISEF Egypt (Intel ISEF-affiliated). The poster's 14.5% figure is not published.
- **5+ years** kept (About section). **Phone** +971 56 260 7011 shown in Contact and in the CV.
- **Private documents** (degree certificate, transcript, high-school certificate, IELTS form) are not published.
- **UMEX:** featured first. Team placements are credited to the teams, not listed as your own awards.

## Choices made with the new material

- **UMEX photos left out:** the awards-stage and group photos show unblurred faces of participants and officials, and the "1st place" cheque on stage is not one of your mentored teams. The Hula product image (manufacturer's) is also not used.
- **NASA deck:** used slide 5 (your team's SketchUp and SolidWorks renders) and slide 9 (app screens, labelled as sample data). Slides 4 and 7 appear to be Ocean Cleanup's own material, and the "90% by 2040" future-vision claim is not used. Team-member names from the roles slide are not published; only your role is.
- **STEM.org certificate:** the image shows the STEM ID (#157224329). It is a verification ID and low risk; say if you want the image hidden.

## Assets (all stored locally in `public/assets/`)

| Section | Files | Source |
|---|---|---|
| UMEX | `projects/umex/drone-lab-setup, maze-arena, maze-solvers-comparison, detection-tank, debugging-session .webp`, `system-diagram.svg`, `maze-solving-demo.mp4/.webm` (re-encoded, 24 s) | UMEX_Drone_Challenge_AUH_2026 repo |
| Scarab | `projects/scarab/front, top, internals, team-pegasi .webp`, `system-diagram.svg` | scarab-combat-robot repo |
| E-Rally | `projects/e-rally/*.webp`, `circular-track.mp4/.webm` | e-rally-autonomous-track repo |
| Agri | `projects/agri-plant-health/*.webp` | agri-plant-health-monitor repo |
| AUTOSAR | Original diagram in code (`AutosarDiagram.tsx`) | README, source tree, CV |
| ISEF | `competitions/isef/team-photo, poster .webp` | Supplied |
| NASA | `competitions/nasa/prototype, team, design-renders, mobile-app .webp` | Supplied photos and Ocean Trap deck |
| Metal Monsters | `competitions/metal-monsters/award-plaque.webp` | Supplied |
| Certificates | `certificates/ros2-…, embedded-cpp-…, lego-education-teacher-trainer, stem-org-certified-educational-instructor .webp` | Supplied |
| CV | `cv/Abdallah_Essam_CV.pdf` (updated version, English C1) | Supplied |

## Test results

- `npm run build`, `tsc -b`, `npm run lint`: pass, no warnings.
- Chromium at 390, 768 and 1440 px: no console errors, no failed requests, no horizontal overflow.
- 38 automated checks pass: section anchors; all five case studies open by link with every image loaded; focus moves into dialogs and is trapped; Escape closes the image viewer before the dialog; scroll lock released; videos muted and never autoplay; NASA details show four images; four certificate images; Metal Monsters links to Scarab; ISEF wording; arm keyboard control; CV download; phone link; reduced motion.
- Video playback verified in Chrome and Chromium (WebM). The MP4 versions are standard H.264 for Safari/iOS; this sandbox's browsers lack H.264, so check one video on an iPhone after deploying.
- Not tested: real phones and screen readers (VoiceOver/TalkBack).
