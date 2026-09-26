# Pottery Sketchbook

A digital sketchbook for pottery pieces — record the sketch/idea, clay body,
pre-fire measurements, firings (cone/temp, glaze, post-fire measurements),
and notes for each piece. Displayed as a book you flip through, works on
mobile.

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4
- [react-pageflip](https://github.com/Nodlik/react-pageflip) for the page-turn UI
- Data currently persists to `localStorage` (see "Next steps" below)

## Running locally

```bash
npm install
npm run dev
```

## Data model

See [`src/types/piece.ts`](src/types/piece.ts) — a `Piece` has a title, sketch
image, clay body, pre-fire measurements, notes, and a list of `Firing`s (each
with a stage, cone/temp, glaze, post-fire measurements, and notes).

## Next steps

- **Sync across devices**: swap `src/data/storage.ts` for
  [Supabase](https://supabase.com) (Postgres + Storage for photos + auth) so
  entries made on your phone show up on desktop and vice versa.
- **PWA / installable on phone**: add `vite-plugin-pwa` for an offline-capable,
  homescreen-installable app.
- **Deploy**: push to GitHub and connect the repo to
  [Vercel](https://vercel.com) or [Netlify](https://netlify.com) for
  automatic deploys.
- **Editing existing pieces**: currently you can add pieces and log firings,
  but not edit/delete an existing entry — worth adding once the shape of the
  data feels right.
