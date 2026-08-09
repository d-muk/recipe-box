# Reflection: Persistence Decision

## Mechanism chosen

`localStorage`.

## Why it fits

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
