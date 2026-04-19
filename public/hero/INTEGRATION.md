# Integrating the Resonance hero into atmarcus.net

The hero is a standalone HTML file you embed as an `<iframe>` below your existing landing-page hero. Its height is controlled entirely by the parent — no config changes needed per placement.

## Files (already in this repo)

```
public/hero/
  resonance.html    ← the hero. Self-contained with baked-in fallback data.
  hero-config.js    ← source of truth for nodes + physics tuning.
  INTEGRATION.md    ← this file.
```

## Deployment prep

Before first deploy, open `public/hero/resonance.html` and uncomment this line in `<head>`:

```html
<!-- <script src="./hero-config.js"></script> -->
```

This makes `hero-config.js` the canonical data source so edits to it flow through without touching the HTML.

## Author mode — live tuning

Visit `/hero/resonance.html?edit` on any environment (local, preview, prod). You get:

- Sliders for wave speed, wavelength, drift, smoothing, fade base
- Full node editor: color swatch (click for picker), editable name, editable URL (click row to expand), weight slider 1–10, ✕ delete
- "+ Add node" button
- "Export config" — copies a complete `hero-config.js` to clipboard, ready to paste over the file

Your edits persist in localStorage per-browser. The deployed site stays untouched until you paste the exported config into `hero-config.js` and push.

## Embedding on the landing page

The current `index.njk` has a text hero, an `<hr class="rule">`, and then the capabilities section. Drop the iframe **between the text hero and the rule** so it reads as an interactive punctuation mark to the heading.

### Step 1 — Add the iframe

In `public/index.njk`, find:

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

Insert a new section **between** `</section>` and `<hr class="rule">`:

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

### Step 2 — Add the CSS

In the `<style>` block, with the other section styles:

```css
.resonance-field {
  width: 100%;
  height: clamp(380px, 50vh, 560px);   /* ← tune height here */
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

**Change the `height` value** to fit your design. The hero scales to whatever box you give it. Suggested ranges:

| Use case        | Height                       |
|-----------------|------------------------------|
| Compact band    | `clamp(280px, 35vh, 400px)`  |
| Standard        | `clamp(380px, 50vh, 560px)`  |
| Large showcase  | `clamp(480px, 65vh, 720px)`  |
| Full viewport   | `100vh`                      |

## Fade curve reference

At `fadeBase = 20` (the new default):

| weight | lifespan |
|--------|----------|
| 1      | 6s       |
| 3      | 10s      |
| 5      | 20s      |
| 7      | 36s      |
| 9      | 60s      |
| 10     | ∞ (permanent) |

Higher weight = tighter wave spacing + longer reach + longer lifespan + slightly larger label text.

## Tuning workflow

1. Run `npm run dev` (Eleventy serve).
2. Open `http://localhost:8080/hero/resonance.html?edit`.
3. Drop nodes, drag sliders, edit labels.
4. Click "Export config" → paste over `public/hero/hero-config.js`.
5. Commit + push. Cloudflare redeploys.
