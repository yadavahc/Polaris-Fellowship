# Yadava H C — Polaris Fellowship Portfolio

A cinematic, **video-narrated** personal portfolio. As the intro video plays in
the floating bottom-right card, the website **responds in real time** — it
scrolls to and highlights whatever section is being spoken about, and renders
beautiful word-by-word subtitles.

Built with **Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer
Motion · React Three Fiber / Drei · Lenis smooth scroll**.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

---

## How the video → website sync works

The "narrator drives the page" effect lives in three files:

| File | Role |
|------|------|
| `src/lib/cues.ts` | The transcript timeline — each spoken segment maps to a website section + subtitle text. |
| `src/components/video/VideoCard.tsx` | The floating player. On every `timeupdate` it finds the active cue, highlights that section, and (when **Sync** is on) smooth-scrolls to it. |
| `src/context/SyncContext.tsx` | Shared state so the player can tell sections "I'm talking about you now". |

**Timings are computed automatically.** Instead of hard-coding timestamps, each
cue has an implicit weight (its word count). When the video's real duration is
known, cues are spread proportionally across the timeline (`buildTimeline`). So
the sync adapts to whatever the actual video length is — no manual timing needed.

### Tuning the sync
- Edit the text/section mapping in `src/lib/cues.ts`.
- If a section comes a little early/late, split or merge cues (more cues = finer
  control) or adjust the `lead` (silent intro) argument in `buildTimeline`.
- Toggle **Sync on/off** in the player to stop auto-scrolling (captions still show).

### Want frame-accurate auto-captions? (optional)
True speech-to-text needs a transcription model. Generate a WebVTT once with
[OpenAI Whisper](https://github.com/openai/whisper):

```bash
pip install -U openai-whisper
whisper Polaris_fellowship-portfolio-video.mp4 --model small --output_format vtt
# move the result to public/video/intro.vtt
```

The authored cues in `cues.ts` already give a polished, reliable experience out
of the box — Whisper is only if you want exact word-level timing.

---

## The video file

- The player streams `public/video/intro.mp4` (copied from your upload). Range
  requests work, so seeking is smooth.
- **It's ~367 MB.** That's fine locally, but for deployment either:
  1. **Compress it** (huge quality-for-size win):
     ```bash
     ffmpeg -i intro.mp4 -vf "scale=-2:720" -c:v libx264 -crf 24 -preset slow \
       -c:a aac -b:a 128k -movflags +faststart public/video/intro.mp4
     ```
     `+faststart` lets it start playing before fully downloaded.
  2. **Or host it on Google Drive** and let visitors watch it in-page: set
     `driveVideoUrl` in `src/lib/content.ts` to a Drive **preview** link:
     `https://drive.google.com/file/d/<FILE_ID>/preview`. A "Watch on Google
     Drive" button then opens an embedded player. (Drive playback can't drive the
     live section-sync — that uses the local mp4 — but it's a great fallback.)

> `public/video/intro.mp4` and the original `.mp4` are git-ignored so they don't
> bloat the repo. Upload the (compressed) file with your deploy, or use Git LFS.

---

## Editing content

Everything you'd want to change is in **`src/lib/content.ts`** — name, tagline,
projects, achievements, DSA stats, hackathons, community, vision, social links,
and the optional Google Drive URL. Images live in `public/images/` (already
organized from your `Portfolio_Images/` folder).

---

## Project structure

```
src/
  app/                 layout (fonts, SEO), page (section order), globals.css
  components/
    AppShell.tsx       providers + global UI (loader, cursor, bg, nav, video)
    background/        Aurora (morphing gradients) + Particles (canvas field)
    three/             HeroScene — R3F floating 3D objects + mouse parallax
    sections/          Hero, About, Journey, Experience, Projects,
                       Achievements, DSA, Hackathons, Community, Vision
    video/             VideoCard (floating player) + Subtitles (word reveal)
    nav/               side dot-nav + scroll progress bar
    ui/                Reveal, SectionHeading, MagneticButton, Cursor, Loader,
                       Section (highlight wrapper), TiltCard, ImageFrame
    providers/         SmoothScroll (Lenis)
  context/             SyncContext (video ↔ sections)
  lib/                 content.ts (data), cues.ts (timeline), utils.ts
```

## Performance & a11y notes
- 3D scene, particles, cursor and video card are lazy-loaded (`ssr: false`) so
  first paint stays light; Three.js uses a capped DPR and a high-perf context.
- Images use `next/image` (lazy + responsive). All animations respect
  `prefers-reduced-motion`.
- Custom cursor only activates on fine-pointer (desktop) devices; layout is fully
  responsive down to mobile.

## Deploy
Push to GitHub and import on **Vercel** (zero config). Remember the video isn't
in git — add the compressed `public/video/intro.mp4` to the deployment, or rely
on the Google Drive link.
