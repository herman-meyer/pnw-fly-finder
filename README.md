# PNW Fly & Tackle Finder

A recommendation tool for Pacific Northwest anglers. Pick a target species,
water type, and month, and get ranked fly or conventional tackle
recommendations — each with an expandable reasoning chain showing *why*
it was picked (what the fish eats, what's active that month, what works
in that water).

Built on a curated knowledge graph: 18 fish species, 28 fly patterns,
23 conventional lures/jigs, and the food sources (insects, baitfish,
crayfish, etc.) that connect them.

## Run it locally

```
npm install
npm run dev
```

## Deploy to GitHub Pages

1. Create a new repo on GitHub (e.g. `pnw-fly-finder`).
2. If your repo name is different from `pnw-fly-finder`, edit `vite.config.js`
   and change the `base` value to match: `/your-repo-name/`.
3. Push this code to the repo (see commands below).
4. Run `npm run deploy` — this builds the site and pushes it to a `gh-pages`
   branch.
5. In your repo on GitHub: Settings → Pages → set Source to the `gh-pages`
   branch. Your site will be live at
   `https://yourusername.github.io/pnw-fly-finder/` within a couple minutes.

## Editing the data

All fish, flies, lures, and food sources live in `src/App.jsx` near the top
in the `DATA` object. Add or edit entries there — the app updates
automatically.
