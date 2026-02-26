# atmarcus.net

Personal professional site for Andrew Todd Marcus.

## Structure

```
public/           ← everything in here gets deployed
├── index.html    ← landing page
└── work/         ← case study pages (coming)
```

## Local Development

Open `public/index.html` in a browser, or use any local server:

```bash
# Python
cd public && python3 -m http.server 8080

# Node (if you have npx)
npx serve public

# Or just open the file directly
open public/index.html
```

## Deploy to Cloudflare Pages

1. Push to a GitHub repo
2. In Cloudflare Pages dashboard: Create Project → Connect to Git
3. Build settings:
   - Build command: (leave empty — static site, no build step)
   - Build output directory: `public`
4. Deploy

Or use Wrangler CLI:
```bash
npx wrangler pages deploy public
```

## Domain

Point `atmarcus.net` DNS to Cloudflare Pages via the dashboard.
blueprintforcreativity.com → CNAME or redirect to atmarcus.net
