#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const INDEX  = path.resolve(__dirname, '../../public/index.html');
const IMG_DIR = path.resolve(__dirname, '../../public/img');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(resolve => rl.question(q, a => resolve(a.trim())));

async function main() {
  console.log('\n── Add Writing Card ──────────────────────────\n');

  const title = await ask('Title:       ');
  const desc  = await ask('Description: ');
  const link  = await ask('Link (URL):  ');
  const img   = await ask('Image file (in public/img/): ');
  rl.close();

  // Validate image exists
  const imgPath = path.join(IMG_DIR, img);
  if (!fs.existsSync(imgPath)) {
    console.error(`\n✗ Image not found: public/img/${img}`);
    console.error('  Drop the file there first, then re-run.\n');
    process.exit(1);
  }

  // Build the card HTML (indented to match existing cards)
  const card = `\
          <a class="writing-card" href="${link}" target="_blank" rel="noopener">
            <div class="writing-card-img" style="background-image: url('img/${img}')"></div>
            <div class="writing-card-body">
              <div class="writing-card-title">${title}</div>
              <div class="writing-card-desc">${desc}</div>
            </div>
          </a>`;

  // Insert at the top of writing-cards div
  const marker = '<div class="writing-cards">';
  let html = fs.readFileSync(INDEX, 'utf8');

  if (!html.includes(marker)) {
    console.error('\n✗ Could not find writing-cards div in index.html\n');
    process.exit(1);
  }

  html = html.replace(marker, `${marker}\n${card}`);
  fs.writeFileSync(INDEX, html, 'utf8');

  console.log(`\n✓ Card added: "${title}"`);
  console.log('  Commit and push when ready.\n');
}

main().catch(err => { console.error(err); process.exit(1); });
