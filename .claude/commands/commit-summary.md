---
description: Write a conventional commit message from the current git diff. Use this when the user wants help drafting a commit message without staging or committing anything.
---

Run `git status` and `git diff HEAD` (staged and unstaged changes) and review the output.

Based on the diff, write a single commit message following the Conventional Commits format (`type(scope): summary`), where `type` is one of `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `style`, or `perf`.

- Keep the summary line under 72 characters, imperative mood (e.g. "add", not "added").
- Include a scope only if the change is clearly localized to one area.
- Add a short body (1-3 bullet points) only if the diff spans multiple concerns or the "why" isn't obvious from the summary alone.

Output only the commit message — do not run `git commit` or stage any files.
