// ════════════════════════════════════════════════════════════════════
//  hero-config.js  —  Resonance hero config for atmarcus.net
// ════════════════════════════════════════════════════════════════════
//  Source of truth for the interactive hero.
//  • HERO_PROJECTS — the list of nodes you can drop. Edit freely.
//  • HERO_RES_TUNE — physics tuning. Live-tunable at /hero/?edit
//
//  To tune visually: load /hero/resonance.html?edit  → drag sliders →
//  click "Export config" → paste the result over the blocks below.
// ════════════════════════════════════════════════════════════════════

window.HERO_COLORS = {
  ink:       '#1a1a1a',
  inkLight:  '#4a4a4a',
  inkMuted:  '#7a7a7a',
  ground:    '#f5f2ed',
  groundWarm:'#ebe6dd',
  accent:    '#c45a2d',
  umber:     '#6b3a2a',
  rule:      '#d0c9be',
  plum:      '#8b5e8b',
  ochre:     '#b8860b',
  steel:     '#3a7ca5',
  sage:      '#5a8a3a',
  clay:      '#a0846b',
};

// Each project = one wave source.
//   weight 1–10 drives:  ring tightness · reach · lifespan
window.HERO_PROJECTS = [
  { name: 'Ho System',                  url: 'https://atmarcus.net/work/ho-system',                color: HERO_COLORS.accent, weight: 10 },
  { name: 'Sageframe',                  url: 'https://sageframe.net',                              color: HERO_COLORS.plum,   weight: 5  },
  { name: 'Sageframe Knowledge System', url: 'https://atmarcus.net/work/sageframe',                color: HERO_COLORS.plum,   weight: 7  },
  { name: 'Glassroom',                  url: 'https://glassroom.sageframe.net',                    color: HERO_COLORS.steel,  weight: 8  },
  { name: 'Kanyo',                      url: 'https://kanyo.sageframe.net',                        color: HERO_COLORS.sage,   weight: 8  },
  { name: 'm4Bookmaker',                url: 'https://m4bookmaker.sageframe.net',                  color: HERO_COLORS.ochre,  weight: 5  },
  { name: 'Constructive Interference',  url: 'https://sageframe.substack.com',                     color: HERO_COLORS.accent, weight: 10 },
  { name: 'NuVu SMS',                   url: 'https://atmarcus.net/work/sms-case-study.html',      color: HERO_COLORS.ochre,  weight: 4  },
  { name: 'CS Learning Framework',      url: 'https://atmarcus.net/work/citizen-schools.html',     color: HERO_COLORS.sage,   weight: 5  },
  { name: 'ARCK System Design',         url: 'https://atmarcus.net/work/arck.html',                color: HERO_COLORS.clay,   weight: 4  },
  { name: 'Hozo Sentinel',              url: 'https://github.com/sageframe-no-kaji/hozo-sentinel', color: HERO_COLORS.steel,  weight: 1  },
  { name: 'ssh actually',               url: 'https://github.com/sageframe-no-kaji/ssh-actually',  color: HERO_COLORS.ink,    weight: 3  },
];

// Global physics tuning.
window.HERO_RES_TUNE = {
  speed:      0.25,   // 0..2   how fast waves expand
  wavelength: 60,     // px between crests at w=5
  drift:      0.0,    // 0..1   source jitter. 0 = still.
  smoothing:  0.55,   // 0..0.9 temporal blend with previous frame
  fadeBase:   20,     // seconds at w=5. only w=10 is permanent.
};

// Fade curve reference (at fadeBase=20):
//   w=1 → 6s   w=3 → 10s   w=5 → 20s   w=7 → 36s   w=9 → 60s   w=10 → ∞
