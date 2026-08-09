# Recipe Box — Style Guide

A simple, warm visual system built around the object the app is named after: a physical box of index cards. The signature element is the recipe card itself — two small punch-holes on the left edge, like it's sitting in a real binder.

## Color

| Role | Color | Hex |
|---|---|---|
| Background (paper) | Warm off-white | `#FAF6EF` |
| Primary (headers, tab dividers, buttons) | Deep forest green | `#2F4A3D` |
| Accent (favorites, active tag) | Mustard gold | `#D9A62E` |
| Text (body, ink) | Warm charcoal | `#2B2620` |
| Divider / muted | Soft sage | `#B7C4B5` |

Keep it to these five. Green does the heavy lifting (nav, primary buttons, category tabs); gold is used sparingly — only for the favorite star and the active tag, so it stays meaningful instead of decorative.

## Typography

- **Display (recipe titles):** Fraunces — a warm serif with character. Used at size for recipe names and section headers only.
- **Body (instructions, descriptions):** Inter — a clean, readable sans.
- **Utility (ingredient quantities, prep time, tags):** IBM Plex Mono. This is the detail that sells the "recipe card" feel — quantities and measurements look typed, like an old card catalog, and it visually separates *data* (2 cups, 15 min) from *prose* (instructions).

## Layout

- **Recipe card:** rounded corners, subtle drop shadow, two small circular cutouts on the left edge (like a real index card in a binder). This is the one recurring signature — every recipe, in the list or detail view, is presented as this card.
- **Category tabs:** styled like the tabbed dividers in an actual recipe box — small labeled tabs (Dinner, Dessert, etc.) that sit slightly above the card stack, not a generic pill/filter row.
- **List view:** cards stack vertically with a slight overlap/fan, like flipping through a box, rather than a flat grid — optional, but it's the kind of detail that makes this feel like *a recipe box* and not a generic list app.
- **Detail/edit view:** the same card, expanded — ingredients in a checklist (utility font), instructions in body font below.

## Motion

Keep it minimal: a soft card-flip or fade when opening a recipe, a small scale-up on hover for cards in the list. No more than that — the paper/card metaphor should feel tactile, not busy.

## Voice

Plain and kitchen-practical. Empty states invite action ("Your box is empty — add your first recipe"), buttons say exactly what they do ("Save recipe," not "Submit"), and nothing apologizes.
