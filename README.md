# XCAD USA — Website Redesign Concept
### A Front-End Portfolio Project by [Your Name]

---

## Why I Built This

I came across XCAD USA while researching companies I genuinely wanted to work with. I liked what the company does — precision irrigation, American manufacturing, a real product catalog with depth — but I felt the website wasn't doing the brand justice. Instead of just saying *"I could build you something better,"* I built it.

This project is a complete front-end redesign of [xcadusa.com](https://www.xcadusa.com/), rebuilt from scratch using only HTML, CSS, and vanilla JavaScript — no frameworks, no libraries, no shortcuts. Every link, every product image, and every external resource (including the 2026 catalog PDF) still points to the original XCAD USA URLs. The goal was to keep everything functionally identical to the real site while showing what a modern, polished front-end implementation could look like.

I'm sharing this as part of my application because I think it's more honest than a resume bullet point. Here's the work. Here's what I changed. Here's what I'd bring to the role.

---

## What's in the Project

```
xcad-site/
├── index.html      — Full page structure and content
├── style.css       — All styling (~1,360 lines)
└── main.js         — All interactivity (~530 lines, 18 modules)
```

Three files. No build step. Open `index.html` in a browser and it works.

---

## What I Changed and Why

### 1. Typography — From Generic to Purposeful
The original site uses Roboto, a perfectly fine but entirely forgettable font. I replaced it with:
- **Oswald** for all headlines and display text — condensed, strong, industrial. It fits agricultural manufacturing.
- **DM Sans** for body copy — clean, modern, highly readable at small sizes.

The pairing gives the site a much more intentional personality while staying professional.

---

### 2. The Hero Section — From Static to Alive
The original hero is a full-width image with text on top. It works, but it sits there.

What I built instead:
- The background image slowly **zooms in** (Ken Burns effect) creating a sense of depth and life
- A **parallax scroll** effect moves the image at 35% of scroll speed, so the field appears to exist behind the content
- Headline text animates in **line by line**, each line sliding up from a clipped container — a technique that feels considered, not just "fade in"
- A **cursor spotlight** follows the mouse across the hero with a subtle teal glow
- Stats (40+ years, 9 product lines, 200+ SKUs) **count up from zero** with an eased animation when the section loads

---

### 3. Navigation — From Basic to Contextual
The original navigation is a standard horizontal list with a dropdown.

What I added:
- A **mega-menu dropdown** for Products that shows actual product thumbnail images pulled directly from XCAD's own image URLs — so hovering Products gives you a visual preview of each category, not just a list of words
- The header **transitions from transparent to solid** as you scroll, using `backdrop-filter: blur()` for a frosted glass effect
- A **mobile slide-in panel** from the right with an accordion sub-menu for products, a close button, and a full-width catalog download button at the bottom
- A **2px scroll progress bar** at the very top of the page in a teal-to-blue gradient — a small detail that tells the user exactly how far through the page they are

---

### 4. Product Grid — From Uniform to Structured
The original products page is a grid of equal-size boxes. It conveys the catalog but doesn't create any hierarchy.

What I built:
- A **3-column grid with intentional layout variation** — some cards span two columns (wide cards), one card spans two columns with a side-by-side image+text layout (feature card). This creates visual rhythm and signals which products are most important.
- Every card uses the **real XCAD product images** (Radius-BK pivot sprinkler, Thunderbolt X100, Seal-Matic valve, X-Gate canal gate, etc.)
- On hover, cards **lift with a drop shadow**, the product image **scales and re-saturates**, and the arrow icon **slides right and turns teal**
- On desktop with a mouse, cards have a **subtle 3D tilt** that follows the cursor using perspective transforms — the card rotates ±4° toward your mouse position
- Images **fade in gracefully** as they load rather than popping in

---

### 5. The Brands Marquee
The original site shows distributor logos in a static footer row.

I added a **continuous scrolling marquee** for the brand family (XCAD, Thunderbolt, AquaBurst, Black Max, Cyto-X) using pure CSS animation — no JavaScript library. It pauses on hover, has fade-out masks on both edges so it looks clean, and loops seamlessly by duplicating the track.

---

### 6. Loader
Added a **page loader** with an animated progress bar that runs for ~1.5 seconds before revealing the site. This gives images time to start loading and creates a more polished first impression. After the loader disappears, the hero elements animate in sequence — eyebrow text, logo, headline, subtitle, CTAs, then stats — each staggered by 100ms.

---

### 7. Scroll Reveal Animations
Every section fades and slides up as you scroll into it, using **IntersectionObserver** — the modern, performance-friendly way to do scroll animations (no scroll event listeners, no layout thrashing). Each product card within a section has a small staggered delay so they don't all appear at once.

---

### 8. Back to Top + Accessibility
- A **back-to-top button** appears after scrolling 500px — smooth, unobtrusive, teal on hover
- **Keyboard navigation** is fully supported with a visible teal focus ring that only appears when you're tabbing (not when clicking)
- All images have `alt` attributes, all interactive elements have `aria-label` where needed

---

## What I Kept the Same (On Purpose)

- Every external link goes to the real xcadusa.com page
- All product images are loaded directly from XCAD's own CDN URLs
- The 2026 Catalog PDF link is the real document
- Distributor links (Wish, IrriComp, BA Fischer) go to their real websites
- The XCAD logo is never altered — only repositioned for better layout balance
- Brand logos (Thunderbolt, AquaBurst, Black Max, Cyto-X) are untouched

The intent was never to replace or misrepresent the site — it was to demonstrate what I would build if given the opportunity to work on it.

---

## Technical Summary

| | Details |
|---|---|
| **Languages** | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| **Frameworks** | None |
| **Dependencies** | Google Fonts (Oswald, DM Sans) — loaded via CDN |
| **JS Modules** | 18 self-contained IIFE modules |
| **CSS Lines** | ~1,360 |
| **JS Lines** | ~530 |
| **Build Tool** | None — open index.html and it runs |
| **Browser Support** | All modern browsers (Chrome, Firefox, Safari, Edge) |
| **Responsive** | Yes — mobile, tablet, desktop breakpoints |

---

## How to Run It Locally

1. Download the `xcad-site` folder
2. Open `index.html` in any browser
3. That's it — no install, no server, no npm

---

## Live Deployment — Hosted on Vercel

This project is live at:

**🔗 `https://xcad-site.vercel.app`** *(update with your actual URL once deployed)*

### How I Deployed It

Since this is a plain HTML/CSS/JS project with no build step, deploying to Vercel is straightforward:

**Option A — Via Vercel CLI**
```bash
# Install Vercel CLI (one-time)
npm install -g vercel

# From inside the xcad-site folder
cd xcad-site
vercel

# Follow the prompts — Vercel auto-detects it as a static site
# Your live URL is printed at the end
```

**Option B — Via Vercel Dashboard (no CLI)**
1. Push the `xcad-site` folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Vercel detects it as a static site automatically — no build command, no output directory to set
4. Click Deploy — it's live in under 30 seconds

**Vercel Config (optional)**

If you want to be explicit, add a `vercel.json` in the folder:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
This isn't strictly needed for a single-page static file but is good practice if you ever add routing later.

### Why Vercel

- **Zero configuration** for static HTML — it just works
- **Instant global CDN** — the site loads fast from anywhere in the world
- **Free tier** covers this entirely
- **Automatic HTTPS** — the live URL is always `https://`
- Every push to GitHub **auto-redeploys** — so if you update `style.css` and push, the live site updates in seconds

This means the interviewers can open the link on their phones during the interview and see it live, responsive, and fully functional — not just a screenshot.

---

## A Note to the Interviewer

I built this because I wanted to show up to the conversation with something real. I've read through what XCAD USA makes, I understand the product lines, and I think the brand deserves a web presence that matches the quality of the engineering behind it.

I'm not just able to build this — I built it. And I'd be glad to maintain it, improve it, and keep building on it as the product catalog grows.

---

*Built by [Your Name] — [your email] — [your LinkedIn or portfolio URL]*
