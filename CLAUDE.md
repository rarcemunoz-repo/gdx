# Global Diagnosis Exam: instructions for Claude

A chairside teaching tool for residents, based on the Global Diagnosis system of Robbins and Rouse
(4 global diagnoses, 5 CORE questions, 6 tools). Owner: Roger Arce (UTHealth Houston SOD,
Periodontics). Collaborator: Ali B. Live at https://rarcemunoz-repo.github.io/gdx/

## How the repo works

- **`index.html` is the whole tool and the master copy.** It's a single standalone page with inline CSS
  and JS; the only external resource is Google Fonts. There is no build step.
- **Every push to `main` goes live** through GitHub Pages in about a minute. There is no review gate,
  so be careful; any version can be restored from git history or the `stable-*` tags.
- `docs/framework.md` lists the normative values and where each rule comes from. **Read it before
  changing any rule.** `docs/reading-list.md` is the curated PubMed list.
- `tests/check-examples.js` runs the 12 worked examples through the rules. GitHub runs it on every push.

## Rules that are not up for change without Roger

1. **Nothing is saved or sent.** No localStorage, cookies, forms that submit, analytics, fetch/XHR, or
   third-party scripts. Residents rely on "refreshing clears it".
2. **No patient identifiers** anywhere: no name, MRN, DOB or date fields.
3. **No text from the book** (it is copyrighted). Paraphrase, cite chapter and page, and keep short
   quotes (such as the five CORE questions) to a minimum.
4. **Public repo:** never commit PHI, book PDFs or text, or full PubMed abstracts (publishers hold
   their copyright). Citations and links are fine.

## When you change the diagnosis rules (`evaluate()` and the `NORMS` / `DX` constants)

- Bump `RULES_VERSION` (format `YYYY-MM-DD` plus a letter).
- Update the **How it works** tab (tutorial and worked example) and the **References** tab ("How this
  tool decides" and the normative values table) so the text matches the code.
- Run `node tests/check-examples.js`. If an example's expected result changes on purpose, update
  `EXPECTED` in the same commit and say why in the commit message.
- Cite the source for any new threshold in `docs/framework.md`.

## Style

- Tabs, in Roger's order: How it works (landing) · Exam · References.
- Colors come from the CSS tokens in `:root`, with dark-mode blocks. Never hard-code a color.
- Clinical copy is plain and direct, written for residents. Units are always mm. Tooth numbers use
  the Universal system (#8, #9).
- Before calling a change done, check it works at phone width (about 400 px) and in dark mode.

## Before you start and when you finish

- `git pull` first, since Roger's Claude and Ali's Claude both edit this repo.
- Commit with a message that says what changed and why. Tag a known-good state when Roger asks:
  `git tag -a stable-YYYY-MM-DD -m "..." && git push origin --tags`.
