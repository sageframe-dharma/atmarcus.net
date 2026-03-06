# add-card

Interactive CLI to add a new writing card to `public/index.html`.

## Usage

```
node tools/add-card/add-card.js
```

It will prompt you for four things:

```
Title:       Three Hours
Description: 278 tests, 99% coverage, and a production release before the kids wake up.
Link (URL):  https://sageframe.substack.com/p/three-hours?r=1b4mpz
Image file (in public/img/): threehours.png
```

The card is inserted at the **top** of the slider (leftmost position — newest first).

## Before you run it

1. Drop the image into `public/img/` (680 × 360px @ 2x = 340 × 180 display size)
2. Run the script from the repo root or anywhere — paths are relative to the script itself
3. Check the result in your browser, then commit and push

## Requirements

Node.js — no npm install needed.
