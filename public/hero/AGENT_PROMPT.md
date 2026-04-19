# Agent handoff prompt

Paste this to whichever agent is doing the integration on the atmarcus.net repo.

---

You have access to the `sageframe-dharma/atmarcus.net` repo. I've built a self-contained interactive hero module and need you to integrate it into the landing page.

## Source files

I will hand you three files to drop into the repo at `public/hero/`:

- `resonance.html` — the hero itself
- `hero-config.js` — node data + physics tuning
- `INTEGRATION.md` — reference docs (leave in place for future edits)

Add all three to `public/hero/`. They are already set up to be served statically by Eleventy (via the existing `addPassthroughCopy('public/work')`-style pattern in `.eleventy.js` — you will need to add a new passthrough for `public/hero`).

## Tasks

### 1. Add passthrough copy for the hero folder

In `.eleventy.js`, add a new line alongside the existing passthrough rules:

```js
eleventyConfig.addPassthroughCopy('public/hero');
```

This ensures `public/hero/*` is served as-is (no template processing).

### 2. Enable the external config in resonance.html

Open `public/hero/resonance.html` and find this commented line in `<head>`:

```html
<!-- <script src="./hero-config.js"></script> -->
```

Uncomment it. This makes `hero-config.js` the source of truth for node data. (The HTML also contains inline fallback defaults so it works if the config file is ever missing.)

### 3. Embed the hero in the landing page

In `public/index.njk`, the current hero section ends at:

```html
      <div class="hero-meta fade-in">
        <span>Systems Design &amp; Organizational Strategy</span>
        <span>Human–AI Collaboration Methodology</span>
        <span>Voice Integrity Research</span>
      </div>
    </div>
  </section>

  <hr class="rule">
```

Insert a new `<section>` **between** the closing `</section>` and the `<hr class="rule">`:

```html
  </section>

  <section class="resonance-field" aria-label="Interactive project field">
    <iframe
      src="/hero/resonance.html"
      title="Project field — click to explore"
      loading="lazy"
      allow="clipboard-write"
    ></iframe>
  </section>

  <hr class="rule">
```

### 4. Add the matching CSS

In the same file, add these rules to the `<style>` block (put them near the other section styles like `.capabilities` or `.hero`):

```css
.resonance-field {
  width: 100%;
  height: clamp(380px, 50vh, 560px);
  padding: 0;
  border-top: 1px solid var(--color-rule);
  background: var(--color-ground);
}
.resonance-field iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
  background: var(--color-ground);
}
@media (max-width: 640px) {
  .resonance-field { height: clamp(320px, 45vh, 420px); }
}
```

The hero auto-scales to whatever height the `.resonance-field` container gives it.

### 5. Verify

Run `npm run dev` and check:

1. `http://localhost:8080/` — the new hero band appears between the text hero and the capabilities section. Clicking in it drops project nodes that emit interfering waves.
2. `http://localhost:8080/hero/resonance.html` — the hero loads standalone, full viewport.
3. `http://localhost:8080/hero/resonance.html?edit` — Tweaks panel appears in the bottom-left with node editor. Andrew uses this URL to tune the hero visually.
4. No console errors.
5. The nodes emit waves that fade out over time (lower-weight nodes fade within 10–20s; weight-10 nodes are permanent). Labels are sized slightly larger for higher-weight nodes.

### 6. Commit

Commit message suggestion:

```
Add interactive Resonance hero module

- New /hero/resonance.html with full wave-interference physics
- /hero/hero-config.js as editable source of truth for nodes
- Embedded as an iframe band below the text hero in index.njk
- Author mode at /hero/resonance.html?edit for live tuning
```

## Things NOT to do

- Don't modify `resonance.html` internals except to uncomment the config script tag. All behavior tuning is done via `hero-config.js` or via the author-mode UI.
- Don't replace the text hero. The animated field is additive — it reads as an interactive flourish below the heading, not a replacement for it.
- Don't inline the hero into `index.njk` directly. The iframe boundary keeps its canvas event handling, fonts, and reset state from interfering with the page chrome.

## After integration

Andrew will want the `?edit` URL to tune visuals. When he runs it and clicks "Export config," it copies a full `hero-config.js` to his clipboard. He pastes that over `public/hero/hero-config.js` and pushes — that's the update loop.
