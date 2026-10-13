# Contributing (for Ali and anyone else editing the tool)

## The short version

1. Open **claude.ai/code** and select the repository `rarcemunoz-repo/gdx`.
2. Describe the change in plain language, e.g. *"In the How it works tab, add a tip about photographing
   the patient standing."*
3. Claude reads `CLAUDE.md` (the project rules), makes the edit, runs the example check and saves it.
4. About a minute later the change is live at https://rarcemunoz-repo.github.io/gdx/. Check it on your phone.

## The rules

- The tool **never saves or sends anything** and has **no patient identifier fields**. Keep it that way.
- **No text from the Robbins & Rouse book.** Paraphrase and cite it.
- **The repository is public.** Everything you commit, including your name on the commit, is visible to anyone.
- **If you change a diagnosis rule**, Claude will also update the How it works and References tabs and
  the rules version. Check that it did.

## If something goes wrong

Nothing is lost. Every version is kept. Ask Claude *"restore the site to the previous version"*, or to a
named checkpoint such as `stable-2026-10-13`. You can also tell Roger.

## Small text fixes without Claude

On github.com open `index.html`, click the pencil icon, edit, and click **Commit changes**. It goes live
the same way.
