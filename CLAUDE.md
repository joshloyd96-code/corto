# PictoLingo — context for future Claude sessions

Read this and README.md before making changes. Built July 2026 with Josh
(josh@thrustcarbon.com). Live at https://joshloyd96-code.github.io/PictoLingo/

## The one rule that matters

**The USP is: no English, ever, in the learning flow.** Meaning is carried by
images (emoji/tableaux), situations (scenes), audio, and context (cloze,
stories) — never by translation. Any feature that shows an English gloss
breaks the product. UI chrome switches to the target language after language
selection; only the home screen is English.

## Current state (v3.4)

Per language (FR/ES/IT): 655 words in 22 packs, 122 phrases in 11 packs,
12 graded stories. Modes: learn cards, image→word choice, word→image match,
listen→image, typed recall, phrase choice, tile builder, cloze, story
comprehension. Leitner SRS (boxes 0–5, intervals 0/1/3/7/21/60 days), lapse
counter feeds a trouble-words deck, daily streak, per-language voice picker,
15-second immersion warm-up on language switch, progress export/import.

## Data conventions (breaking these corrupts user progress)

- **Append only, never reorder or delete** entries in data/*.js — array
  indexes are the saved-progress keys in localStorage.
- vocab.js entry: `[emoji, fr, es, it, packKey]`. Words include the article;
  gender derives from it. `|` overrides: m/f/pl (ambiguous articles like l'),
  v (verb), a (adjective), d (adverb). Multi-emoji tableaux are fine — the
  renderer auto-scales by grapheme count.
- phrases.js entry: `{sc, p, fr, es, it}` — sc is the scene tableau ("»"
  splits panels), exactly one `[cloze word]` per language per phrase.
- Conjugation-drill scene convention: 🙋=je/yo/io, 🫵=tu, 👨=il, 👩=elle, 👥=nous.
- stories.js: `{e, t:{...}, x:{...}, q:[{q:{...}, o:{lang:[4 options]}}]}` —
  correct answer is ALWAYS o[lang][0]; the app shuffles at render.
- New pack keys need a PACKS/PPACKS entry with names localized in all three
  languages (immersion — pack names are in the target language).
- After ANY file change, bump `CACHE` in sw.js or installed phones won't update.

## Validation (always run before handing back)

Pattern used throughout: extract/eval the data + app.js in node with a DOM
stub, then check — no duplicate word/phrase texts within a language, no
duplicate emoji strings, every noun resolves a gender chip, exactly one cloze
marker per phrase per language, 4 unique options per story question, pack
coverage equals array length, distractors(i,3) works for every index, and
spot-check that old indexes still hold (e.g. VOCAB[0]="🐕", [390]="📆",
[526]="🇫🇷"). Simulate a learn session and a story completion. Josh expects
this rigour — every release today was validated this way.

## Deployment

GitHub Pages from the repo root (public repo). Josh updates by uploading
changed files via the GitHub web UI (Add file → Upload files → commit).
Always tell him exactly which files changed, and remind him the cache bump
handles phone updates.

## Roadmap (agreed with Josh, in priority order)

1. **Photo pipeline** → 1,000+ words. Fetch CC-licensed images (Openverse/
   Wikimedia), resize to ~20KB webp, 6th element in vocab entries holds the
   image path (renderer currently ignores it — needs wiring). Emoji stays as
   fallback. Spot-check image-word matches; write an ATTRIBUTION file.
2. **More stories** — highest value per word written. 15–20 total, ramping
   difficulty, salted with function words (mais, parce que, toujours, rien,
   quelque chose…). ~70–90 words each, parallel across the three languages.
3. **Speaking mode** — Web Speech recognition, scene → say the word/phrase.
   Explicitly deprioritised by Josh for now; ask before building.
4. Possible: SM-2 ease factors, more chunks/petits-mots, two-panel scenes for
   ambiguous tableaux.

## Known rough edges

- Emoji tableau legibility unverified on-device for v3.1+ words (e.g. 📏⬆️
  grand, 🍎🍌☝️ choisir) — ask Josh which ones misread and fix data only.
- Speech quality depends on device voices; the picker + enhanced-voice
  ranking mitigate. Real native audio (Tatoeba clips) is a future option.
- es "salir" appears only for sortir; partir=irse — watch near-synonym
  collisions when adding verbs (validator catches exact dups only).
- 🩶 (gris) and 🫏-era emoji may not render on older devices.
