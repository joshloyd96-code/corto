# PictoLingo

Learn French, Spanish & Italian vocab straight from images — no translation step.

**390 words** across 19 themed packs, **40 situational phrases** across 5 scenarios, per
language. Spaced repetition (Leitner), audio via your device's speech synthesis, and a
15-second "immersion" warm-up whenever you switch languages.

## Run it

**Locally (quickest):** just open `index.html` in a browser. Everything works except
install-to-home-screen and offline caching (service workers need HTTPS).

**As a proper PWA (free):** host the folder on any static host —

- **GitHub Pages:** create a repo, upload this folder's contents, then Settings →
  Pages → deploy from branch. Your app lives at `https://<you>.github.io/<repo>/`.
- **Cloudflare Pages / Netlify:** drag and drop the folder in their dashboard. Done.

Then on your phone, open the URL and "Add to Home Screen" — it installs like an app
and works fully offline after the first visit.

## Tips

- **Voices:** the app prefers enhanced/premium voices and has a per-language picker
  (🗣️ dropdown). For the best audio on iPhone/Mac, download voices under
  Settings → Accessibility → Spoken Content → Voices (e.g. Thomas for French,
  Mónica for Spanish, Alice for Italian).
- **Progress:** stored in your browser. Use **Export progress** on the home screen to
  back it up or move to another device (Import on the other side).

## Project layout

```
index.html          app shell + service worker registration
css/app.css         styles
js/app.js           app logic (SRS, modes, audio, warm-up)
data/vocab.js       words   — append-only; entry format documented in file
data/phrases.js     phrases — append-only; [word] marks the cloze blank
sw.js               offline cache (bump CACHE version when files change)
manifest.webmanifest, icons/
```

## Adding content

Append entries to `data/vocab.js` or `data/phrases.js` (never reorder existing ones —
indexes are the saved-progress keys), then bump `CACHE` in `sw.js`. New pack keys also
need an entry in `PACKS`/`PPACKS` with a localized name. Words without a usable emoji
can carry an image path as a 6th element once an image pipeline exists — the current
code ignores it.
