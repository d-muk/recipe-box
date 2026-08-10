# Reflection

## What I built and how I scoped it

I built Recipe Box, a simple app for saving, organizing, and searching recipes — ingredients, instructions, prep time, and photos, with category tags and favorites. I scoped it down hard: no backend, no database, no user accounts, and no deployment. Everything runs locally, in the browser, on one machine.

## Persistence decision

I chose `localStorage`. Recipe Box is single-user, browser-only, with no server or login — the only real requirement was that data survive closing and reopening the tab, and `localStorage` covers that with nothing extra to set up.

## A moment CLAUDE.md changed the outcome

When I was deciding how to save data, I consulted with Claude first. One option, IndexedDB, is powerful but clunky to work with directly, and would normally call for a small helper tool to make it easier. But the project's rulebook, CLAUDE.md, said not to add any new tools without asking first. So together we landed on `localStorage` instead — partly because it worked well enough on its own, but mainly because it didn't require adding anything extra. That decision stuck: later, when the agent was setting up the fonts, it referred back to the same rule and specifically used a font-loading feature already built into Next.js, rather than a separate add-on tool, so it still counted as "nothing new added."

## The design pass

I prepared a `style-guide.md` before handing Claude the build task, so the design direction — colors, fonts, the recipe-card component — was set upfront rather than improvised. Once the app was scaffolded, I made one correction: wider margins on the recipe card.

## Harder than the plain-HTML app

In a single static page, there's only one "view" to think about. With the two-pane layout, I had to think through several different states of the same screen — like which recipe is open, or whether you're editing — and how someone would move between them.

## What I'd keep or change

I'd keep preparing CLAUDE.md, `.gitignore`, and a style guide in a docs folder before starting — it got me to a working version with only a couple of fixes instead of many iterations. Next time I'd spend a little more time defining component boundaries upfront, since that's where most of the complexity was.

---

## Appendix: Reflection: Persistence Decision

### Mechanism chosen

`localStorage`.

### Why it fits

Recipe Box is a single-user app that runs only in the browser, on one
machine, with no server, no database, and no login. The only requirement
is that data survives closing and reopening the tab.

`localStorage` was chosen over the main alternative, IndexedDB, because:

- It's a simple synchronous key-value API (`getItem`/`setItem`) that needs
  no extra library and almost no boilerplate, in line with the project's
  "no new dependencies" constraint.
- Recipe data (ingredients, instructions, tags, prep time) is plain text
  and comfortably fits within localStorage's ~5-10MB per-origin limit.
- IndexedDB's advantages — native Blob storage, effectively unlimited size,
  async access — solve problems this app doesn't have. Its cost is a much
  more complex API (cursors, object stores, versioned schema upgrades)
  that isn't justified at this scale.
- The one risk is photos: stored naively as full-size base64, they could
  exhaust the size limit. The mitigation is to resize/compress images
  client-side before storing them as data URLs, so photos stay compatible
  with `localStorage` instead of requiring a move to IndexedDB.

In short: `localStorage` matches the app's scope and constraints, and the
photo size risk is handled by compressing on the way in rather than by
adopting a heavier storage mechanism.
