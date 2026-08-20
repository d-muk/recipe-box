---
description: Run a review checklist against a pull request or diff. Use this when the user asks to review a PR or check a diff.
---

Determine the diff to review: if the user named a PR, branch, or commit range, use that (e.g. `gh pr diff <number>` or `git diff <range>`); otherwise use the current working diff (`git status` and `git diff HEAD`, staged and unstaged).

Work through this checklist:

1. **Diff summary** — Summarize what changed: which files, and the nature of each change (new feature, fix, refactor, docs, config, etc).
2. **Large changes** — Flag any file with a large number of changed lines relative to the rest of the diff (a much bigger diff than its neighbors, or a file that looks like it's doing too much at once). Call out why it stands out and suggest splitting it if it mixes unrelated concerns.
3. **Commit message** — Look at the commit message(s) for this diff (`git log` for the relevant range, or the PR title/description). If a message is vague (e.g. "fix stuff", "updates", "wip"), suggest a specific Conventional Commits-style replacement based on what the diff actually does.

Present the results as a short report with these three sections, in this order. Skip a section only if it has nothing to report (e.g. no oversized files).
