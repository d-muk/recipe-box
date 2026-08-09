# Recipe Box

A simple recipe box app. Users save, organize, and search their favorite
recipes in one place.

## Features

- Save recipes with ingredients, instructions, prep time, and photos
- Tag recipes by category (e.g. "dinner", "dessert")
- Mark recipes as favorites
- Quickly search recipes while cooking

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Constraints

- No backend, no database, no user accounts. All data lives client-side
  (e.g. localStorage) unless told otherwise.
- No deployment step and no public URL. The app only runs locally.
- Do not add new libraries/dependencies without asking first.

## Persistence

- Data is persisted with `localStorage`, keyed under a single namespaced key
  (e.g. `recipe-box:recipes`), serialized as JSON.
- Photos are resized/compressed client-side before being stored as data URLs,
  to stay within localStorage's ~5-10MB per-origin limit.
- Chosen over IndexedDB for simplicity and zero dependencies, since recipe
  text data and a few compressed photos comfortably fit the size limit.

## Development

- Run locally: `npm run dev`
- View at: http://localhost:3000

@AGENTS.md
