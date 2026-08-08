# Japan 2026 — trip dashboard

Offline-first PWA. Survival layer built 2026-08-08, the night before departure.
Ratings/metrics layer is deliberately deferred to the flight.

## Files

| File | What it is |
|---|---|
| `data.js` | **The file you edit.** All trip content. |
| `index.html` | The app. Single file, no build step, no dependencies. |
| `sw.js` | Offline cache. Network-first for `data.js`, cache-first for the shell. |
| `manifest.json` | Home-screen install config |
| `SEED-CONFIRMATIONS.json` | **Gitignored.** Paste-once payload, device only. |

## Deploy (~5 min)

GitHub Pages free tier requires a **public** repo — which is exactly why no
booking data is in any committed file.

```bash
cd ~/Desktop/BBproject/bigbrain/working/japan-dashboard
git init && git add -A && git commit -m "Japan 2026 dashboard"
gh repo create japan-2026 --public --source=. --push
# no gh CLI? create the repo on github.com, then:
#   git remote add origin https://github.com/RaiseMuck/japan-2026.git
#   git branch -M main && git push -u origin main
```

Then: repo → **Settings → Pages → Source: `main` / root → Save.**
Live in ~60s at **https://raisemuck.github.io/japan-2026/**

Verify before trusting it:
```bash
git ls-files | grep -i seed   # must return NOTHING
```

## On the phone

1. Open the URL in **Safari** (not Chrome — only Safari can install to the home screen on iOS).
2. Share → **Add to Home Screen**. Opens full-screen, no browser chrome.
3. Open it once **on wifi** so the service worker caches everything.
4. **Vault** tab → paste `SEED-CONFIRMATIONS.json` → Save. Device only, never uploaded.
5. Turn on airplane mode and reopen it. If it loads, you're covered underground.

## Photos

**57 slots** — every stay, every day anchor (transit, checkouts, the Motoyama
booking), every candidate, and every reference card. Tap `+ photo` to open the
iOS picker (Photo Library / Take Photo / Files); on desktop, drag an image onto
the slot. Tap a filled slot to view large, replace, or remove.

Images are **downscaled to 1400px and re-encoded as JPEG (~0.82)** before being
stored — a 4MB phone shot lands around 200KB, so all 57 fit comfortably. They go
to **IndexedDB, not localStorage**, which caps near 5MB and would blow out after
about two photos.

**Photos never touch the repo.** They live only on the device that added them.
No copyright question, nothing personal pushed to a public URL, and they work
offline by definition. Current usage is shown at the bottom of the Vault tab.

Trade-off worth knowing: clearing site data wipes them, and they don't sync
between devices. For anything you want permanent, keep the original in your
camera roll — this is a display layer, not storage.

## Adding itinerary content

Edit `data.js` only. Every rateable thing needs a **unique, permanent `id`** —
ratings attach to it. Never reuse or renumber ids.

```js
{ id:"act-todaiji", bucket:"activity", title:"Tōdai-ji",
  walk:"10 min from Kintetsu-Nara", cost:"¥800",
  tags:["temple","morning"], tip:"Leave Osaka 07:00 — buses arrive by 10:00.",
  link:"https://maps.google.com/?q=Todaiji" }
```

`anchors[]` = time-fixed (`hard:true` if missing it costs money or hours).
`candidates[]` = flexible. `bench[]` = ranked substitutes with reasons.
`status:` `locked` / `partial` / `open` drives the dot on the day list.

**Bump `meta.synced` in `data.js` every time you edit it.** The header shows
the date and turns it red past 3 days. With planning running across several
chats, that stamp is the only signal the dashboard has fallen behind the vault.

**After editing `data.js`: just commit and push.** The service worker fetches
`data.js` network-first, so with any signal at all you get the current file on
next launch. Offline, it falls back to the last cached copy automatically.

**Only bump `VERSION` in `sw.js` if you edit `index.html` or `sw.js` itself** —
those are cache-first. After a bump, force-close and reopen the app twice: the
first launch installs the new worker, the second renders from it.

## Deferred to the flight

Rating capture (5 buckets: stay / activity / food / daytrip / day), two-dimension
scoring ("worth the effort", "would return"), one-tap bench swaps with reason
logging, aggregation and rankings, photo-album links, shot-list stubs.

The storage layer is already built for it — `DB.logEvent(type, targetId, payload)`
writes to an append-only, immutable, timestamped log. Adding the rating UI is
purely additive; no refactor.
