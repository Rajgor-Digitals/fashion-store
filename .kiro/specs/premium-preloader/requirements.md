# Requirements Document

## Introduction

The premium preloader is a full-screen cinematic intro sequence displayed when a visitor first loads the New Akshat Fashion website. The current preloader is a minimal centered logo text with a thin gold progress bar that fades out after ~450 ms. This feature replaces it with a significantly more visually impressive, luxury-fashion-house-level experience — evoking the opening sequences of Dior, Chanel, or Louis Vuitton digital campaigns — while remaining a pure HTML/CSS/JS implementation with no external animation libraries. The preloader must integrate cleanly into the existing `index.html` and `base.css` files and respect the existing JS fade-out logic in `main.js`.

---

## Glossary

- **Preloader**: The full-screen overlay element (`#preloader`) displayed before the main page content becomes visible.
- **Preloader_System**: The combined HTML structure, CSS animations, and JS orchestration that constitute the premium preloader feature.
- **Reveal_Sequence**: The ordered series of animated elements that appear during the preloader's active phase.
- **Curtain_Exit**: The animated transition by which the preloader dismisses itself and reveals the page content beneath.
- **Brand_Gold**: The primary brand accent color `#D4AF37`.
- **Brand_Black**: The near-black background color `#060606` / `#0A0A0A`.
- **Brand_Beige**: The off-white text color `#F5F5F0`.
- **Progress_Indicator**: A visual element that communicates loading progress to the user.
- **Ambient_Layer**: A decorative background element (e.g., radial glow, grain texture, geometric line) that adds depth without conveying information.
- **Fade_Out_Hook**: The existing `fadeOutPreloader` function in `main.js` that adds the `.loaded` class to `#preloader` after 450 ms or on `window.load`.

---

## Requirements

### Requirement 1: Cinematic Full-Screen Stage

**User Story:** As a first-time visitor, I want the preloader to command the entire screen with a dark, immersive atmosphere, so that I immediately sense the luxury positioning of the brand before any page content appears.

#### Acceptance Criteria

1. THE Preloader_System SHALL cover 100% of the viewport width and height using `position: fixed` and `inset: 0`, with `z-index` above all page content.
2. THE Preloader_System SHALL use `#060606` (Brand_Black) as the background color, matching the brand's near-black identity.
3. WHILE the Preloader_System is active, THE Preloader_System SHALL prevent the user from scrolling or interacting with the page content beneath it.
4. THE Preloader_System SHALL include at least one Ambient_Layer — a subtle radial gold glow or geometric line pattern — rendered purely in CSS, to add visual depth to the background.
5. THE Preloader_System SHALL apply a low-opacity film-grain texture overlay (consistent with the existing `body::before` grain in `base.css`) so the preloader surface feels tactile and cinematic.

---

### Requirement 2: Reveal Sequence — Brand Identity Animation

**User Story:** As a visitor, I want to see the brand name and identity elements animate into view in a deliberate, staggered sequence, so that the preloader feels like a curated editorial moment rather than a loading screen.

#### Acceptance Criteria

1. WHEN the Preloader_System initialises, THE Reveal_Sequence SHALL begin automatically without any user interaction.
2. THE Reveal_Sequence SHALL animate a minimum of three distinct identity elements in staggered succession: a decorative separator or ornamental mark, the primary brand name "NEW AKSHAT FASHION", and a secondary descriptor line (e.g., "Est. 2012 · Bhujpur, Kutch").
3. WHEN each identity element enters the viewport, THE Reveal_Sequence SHALL use a fade-up motion (opacity `0 → 1` combined with a vertical translate `20–30 px → 0`) driven by CSS `@keyframes` and `animation-delay` staggering.
4. THE Reveal_Sequence SHALL render the primary brand name using the `Tenor Sans` font family (`--font-royal-caps`), uppercase, with letter-spacing of at least `0.35em`, and Brand_Gold color.
5. THE Reveal_Sequence SHALL render the secondary descriptor line using an italic serif font (`Libre Baskerville` or `Bodoni Moda`), in Brand_Beige at reduced opacity (≤ 0.7), to create typographic hierarchy.
6. WHERE a decorative ornamental mark is included, THE Reveal_Sequence SHALL render it as a thin horizontal rule, a diamond glyph, or an SVG monogram mark in Brand_Gold, appearing before the brand name.

---

### Requirement 3: Premium Progress Indicator

**User Story:** As a visitor, I want a visually refined progress indicator that communicates loading is happening, so that I feel informed without the experience feeling utilitarian.

#### Acceptance Criteria

1. THE Preloader_System SHALL display a Progress_Indicator that animates from 0% to 100% width during the preloader's active phase.
2. THE Progress_Indicator SHALL be a thin horizontal bar (height 1–2 px) rendered in Brand_Gold, positioned below the brand identity elements, with a minimum width of 160 px and a maximum width of 280 px.
3. THE Progress_Indicator SHALL animate its fill using a CSS `transform: translateX(-100%) → translateX(0)` technique (consistent with the existing `preloader-bar-fill` pattern) over a duration of 1.2–2.0 seconds with a `cubic-bezier(0.65, 0, 0.35, 1)` easing.
4. WHEN the Progress_Indicator fill animation completes, THE Preloader_System SHALL display a small numeric counter or short text label (e.g., "100" or "Ready") that fades in at the right end of the bar, reinforcing completion.
5. THE Progress_Indicator track (unfilled background) SHALL be rendered at ≤ 15% opacity of Brand_Gold so it is visible but recessive.

---

### Requirement 4: Curtain Exit Transition

**User Story:** As a visitor, I want the preloader to exit in a way that feels intentional and cinematic — not just a plain fade — so that the transition into the main page content feels like a reveal.

#### Acceptance Criteria

1. WHEN the Fade_Out_Hook fires (after 450 ms or on `window.load`, whichever comes first), THE Curtain_Exit SHALL begin.
2. THE Curtain_Exit SHALL use one of the following techniques: a vertical split (the preloader splits into two panels that slide off-screen in opposite directions), a full-screen opacity fade combined with a slight upward translate, or a horizontal wipe. The chosen technique SHALL be implemented purely in CSS transitions triggered by the `.loaded` class.
3. THE Curtain_Exit transition duration SHALL be between 0.7 s and 1.2 s, using a smooth easing curve (`cubic-bezier(0.16, 1, 0.3, 1)` or equivalent).
4. WHEN the Curtain_Exit transition completes, THE Preloader_System SHALL remove the `#preloader` element from the DOM (consistent with the existing `setTimeout(() => preloader.remove(), 800)` in `main.js`).
5. THE Curtain_Exit SHALL NOT cause any visible layout shift or flash of unstyled content in the page content that is revealed beneath it.

---

### Requirement 5: Typographic & Brand Consistency

**User Story:** As the brand owner, I want the preloader to use only the established brand fonts, colors, and design tokens, so that the preloader feels like a native part of the New Akshat Fashion visual identity.

#### Acceptance Criteria

1. THE Preloader_System SHALL use only font families already declared in `base.css`: `Tenor Sans`, `Bodoni Moda`, `Libre Baskerville`, `Josefin Sans`, and `DM Sans`.
2. THE Preloader_System SHALL use only color values defined in the `:root` CSS custom properties in `base.css` (e.g., `--brand-gold`, `--brand-black-pure`, `--brand-beige`).
3. THE Preloader_System SHALL NOT introduce any new Google Fonts `@import` or external stylesheet links.
4. THE Preloader_System SHALL NOT depend on any external JavaScript animation libraries (e.g., GSAP, Anime.js, Three.js).
5. WHEN the Preloader_System is implemented, THE Preloader_System SHALL replace the existing `#preloader` HTML block in `index.html` and the existing preloader CSS rules in `base.css` in-place, without altering any other HTML structure or CSS rules.

---

### Requirement 6: Performance & Accessibility

**User Story:** As a visitor on a mobile device or slow connection, I want the preloader to load and animate without causing jank or blocking the page, so that the experience remains smooth regardless of device capability.

#### Acceptance Criteria

1. THE Preloader_System SHALL use only CSS `transform` and `opacity` properties for all animations, avoiding layout-triggering properties (e.g., `width`, `height`, `top`, `left`) to ensure GPU-accelerated rendering.
2. THE Preloader_System SHALL apply `will-change: transform, opacity` to animated elements to hint the browser for compositing optimisation.
3. IF the user has enabled the `prefers-reduced-motion` media query, THEN THE Preloader_System SHALL skip all motion animations and display the brand identity elements as immediately visible (opacity 1, no translate), while still showing the Progress_Indicator as a static filled bar.
4. THE Preloader_System SHALL include an `aria-hidden="true"` attribute on the `#preloader` element so screen readers skip the decorative preloader content.
5. THE Preloader_System SHALL NOT block the browser's main thread with synchronous JavaScript during the animation sequence; all timing SHALL be managed via CSS `animation-delay` or `setTimeout`/`requestAnimationFrame`.

---

### Requirement 7: Responsive Behaviour

**User Story:** As a visitor on a mobile phone, I want the preloader to look equally polished as on desktop, so that the premium impression is consistent across all screen sizes.

#### Acceptance Criteria

1. THE Preloader_System SHALL scale all typographic sizes using `clamp()` or viewport-relative units so the brand name remains legible and proportionate on screens from 320 px to 2560 px wide.
2. WHEN the viewport width is below 480 px, THE Preloader_System SHALL reduce the brand name font size to no larger than `1.4rem` and the letter-spacing to no less than `0.25em` to prevent overflow.
3. THE Progress_Indicator SHALL be horizontally centred on all viewport sizes and SHALL NOT overflow its container.
4. THE Ambient_Layer decorative elements SHALL be hidden or reduced in opacity on viewports narrower than 480 px to avoid visual clutter on small screens.
