# Akademi Kebidanan Mega Buana Palu — Home Page

Vue 3 (Composition API) + Vite + Tailwind CSS + Swiper.js + AOS.

## Setup

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Structure

```
src/
  components/
    layout/
      Navbar.vue          sticky, transparent→solid on scroll, glassmorphism, mobile hamburger
      Footer.vue          address, contact, quick links, socials
      AnnouncementBar.vue pure CSS marquee (no JS interval)
    home/
      HeroSlider.vue      Swiper.js, initialized only in onMounted, destroyed in onUnmounted
      WelcomeSection.vue  two-column welcome/about
      DirectorSection.vue director photo + sambutan text card
      NewsSection.vue     static news grid, 6 items
      NewsCard.vue        single news card
    ui/
      Button.vue          primary / outline / ghost variants
      SectionTitle.vue    eyebrow + heading + gold underline
  App.vue
  main.js                 AOS.init() called once, outside any Vue reactivity
  style.css
```

## Bugfix pass

- **Navbar contrast** — the navbar used to be transparent until scroll, which meant it floated
  over a strip of the page's plain background (not the hero photo) and made the white text
  unreadable. It's now always solid navy so the text stays legible everywhere.
- **Hero position** — the hero carousel now sits fully and cleanly below the announcement bar
  + navbar in normal document flow, with no overlap and no gap.
- **Prodi section removed from the home page** — "Prodi" (and "Galeri", "PMB") are nav links to
  their own dedicated pages, not sections that belong on this home page, so they were taken out
  and the nav/CTA links now point to `/prodi`, `/galeri`, and `/pmb` respectively.

## Visual upgrade pass

- **Signature motif** — a gold "pulse line" (ECG-style squiggle, `ui/PulseLine.vue`) replaces
  the plain underline bar everywhere, tying every section back to the healthcare identity.
  It draws itself in with a CSS `stroke-dashoffset` animation (respects `prefers-reduced-motion`).
- **StatsStrip.vue** — a floating stat card overlaps the bottom of the hero (years running,
  programs, alumni, accreditation) for a premium, editorial feel instead of flat section stacking.
- **ProdiSection.vue** — new program-studi teaser cards fill the `#prodi` nav anchor that
  previously had no matching section.
- **Wave divider** — an SVG curve at the base of the hero flows into the next section instead
  of a hard rectangle cut.
- **Director section** — moved to a navy background with a watermark pulse-line and an oversized
  quotation mark behind the sambutan card, giving it a pull-quote feel.
- **News cards** — category tag chip, image gradient overlay, and a sharper hover lift.
- **Footer** — icon-based social buttons (lucide-vue-next) instead of plain text links.
- Icons throughout use `lucide-vue-next` for a consistent, professional icon set.

## Notes on stability (anti auto-reload)

- Swiper is created once in `onMounted` and destroyed in `onUnmounted`; no reactive
  state is read inside its config, so it can never re-initialize in a loop.
- The announcement bar marquee is pure CSS (`@keyframes` + Tailwind `animate-marquee`),
  not a `setInterval`.
- The only `ref`s in the app are `isScrolled` and `isMenuOpen` in `Navbar.vue`, both
  set from a single passive `scroll` listener that's removed in `onUnmounted`.
- No `watch()` is used anywhere in the app.
