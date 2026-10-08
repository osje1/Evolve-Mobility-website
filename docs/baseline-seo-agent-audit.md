# Nulmeting — AI-agent/zoekmachine-geschiktheid

Branch: `feature/seo-agent-readiness` (vanaf `main`, commit `19afc90`).
Doel: referentiepunt om na Fase 1 te vergelijken (uiterlijk + animaties moeten identiek blijven).

## Schermafbeeldingen

`screenshots/baseline/<pagina>-<breedte>-<top|full>.png`, 6 pagina's × 3 breedtes (390/768/1440)
× 2 (boven in beeld + volledige pagina na incrementeel scrollen, zodat alle
`whileInView`-reveals al getriggerd zijn). 36 bestanden totaal.

## Architectuur (relevant voor Fase 2/3)

- Pure client-side rendering: Vite + React + `react-router-dom`, geen SSR/SSG. `index.html`
  bevat alleen `<div id="root"></div>`; alle tekst wordt in de browser opgebouwd.
- Routing: 6 vaste routes (`/`, `/wie-zijn-wij`, `/voor-wie`, `/voor-particulieren`,
  `/voor-dealers`, `/contact`), elk `lazy()`-geladen; `Layout` (Navbar/Footer) niet lazy.
- Geen `AnimatePresence` rond `<Routes>` — route-wissels zijn instant, geen page-transition.
- `vercel.json` stuurt momenteel *elk* pad naar `/index.html` (ook niet-bestaande), dus alles
  geeft HTTP 200.
- `PageMeta.jsx` zet title/description/canonical/OG/Twitter-tags via `useEffect` (dus pas na
  hydratie zichtbaar voor wie geen JS uitvoert).
- `index.html` bevat wel al statische `LocalBusiness` JSON-LD en OG/Twitter-tags voor de
  homepage (telefoon/adres bewust nog niet opgenomen, staat nog als placeholder).
- `public/robots.txt` en `public/sitemap.xml` bestaan al en zijn correct (6 URL's).

## Animatie- en interactie-inventarisatie

Alle easing is de custom `ease-premium` curve (`cubic-bezier(0.16, 1, 0.3, 1)`), tenzij anders
vermeld. Alle scroll-reveals gebruiken Framer Motion `whileInView` met `viewport={{ once: true,
margin: '-80px' }}` — triggeren dus precies één keer, 80px voordat het element in beeld komt.

### Globaal (Layout, op elke pagina)

| Element | Werking | Begintoestand | Trigger |
|---|---|---|---|
| Navbar achtergrond/schaduw | CSS `transition-[box-shadow,border-color,background-color]` 300ms | `bg-black`, transparante rand | `scroll` event, `window.scrollY > 8` |
| Navbar logo hover/focus | CSS `transition-opacity` 200ms | opacity 100% | hover/focus-visible |
| Navbar desktop links hover | CSS `transition-[color,transform]` 200ms | eigen kleur, geen offset | hover/focus-visible → kleur + `-translate-y-px` |
| Hamburger → X icoon | 3× CSS `transition-transform`/`opacity` 200ms per streepje | hamburger-vorm | klik op menuknop (`isOpen` state) |
| Mobiel menupaneel | Conditionele render (`isOpen &&`), **geen animatie** — instant tonen/verbergen | niet in DOM | klik op menuknop |
| Mobiel menu-links hover | CSS `transition-colors` 200ms | eigen kleur | hover/focus-visible |
| Footer-links hover | CSS `transition-colors` 200ms | eigen kleur | hover/focus-visible |
| Focus-ring op elk klikbaar element | `focus-visible:ring-2` (geen transitie, directe state) | geen ring | toetsenbordfocus |
| `html { scroll-behavior: smooth }` | Globale CSS, geldt voor elke scroll (incl. anker-links) | n.v.t. | elke scroll-naar-positie |

### `Reveal.jsx` (scroll-in-beeld fade/slide, overal gebruikt voor koppen, tekst, pillen, kaarten)

- Bibliotheek: Framer Motion (`motion.div` + `whileInView`).
- Begintoestand: `opacity: 0`, plus offset afhankelijk van `direction` (`up`: y+28, `right`: x+28 vanaf rechts, etc.).
- Eindtoestand: `opacity: 1`, offset 0. Duur 0.7s (standaard), individuele `delay`-props per item (vaak `index * 0,04–0,1`s voor een staggered effect).
- Trigger: `whileInView`, `once: true`, `margin: -80px` (vuurt dus één keer, vlak voordat het zichtbaar wordt; daarna blijft het element altijd zichtbaar, ook als je terugscrollt).

### `TiltCard.jsx` (gebruikt binnen `IconCard`, `TextCard`, `StepCard`, en direct in Home-diensten/VoorDealers-kaarten)

- Bibliotheek: Framer Motion (`useMotionValue`/`useSpring`/`useTransform`).
- Volgt de muis: `rotateX`/`rotateY` op basis van cursorpositie t.o.v. het midden van de kaart, plus `whileHover: { y: -6, scale: 1.015 }`. Spring-transitie (`stiffness: 300, damping: 26`/`30`).
- Volledig **uitgeschakeld** bij `prefers-reduced-motion: reduce` (geen tilt-style, geen hover-animatie).
- Trigger: `mousemove`/`mouseleave` op de kaart (alleen relevant bij een muis; op touch gebeurt er niets).
- Daarnaast heeft de buitenste kaart-`div` nog een losse CSS `hover:shadow-raised` (`transition-shadow` 300ms), die blijft ook op touch werken (CSS `:hover`).

### `Hero.jsx` (bovenaan elke pagina behalve Contact)

- Twee decoratieve "blob"-vlekken: bij mount (niet scroll-getriggerd) `opacity 0→1`, `scale 0.8→1` in 1.2s, gevolgd door een **oneindige** drift-animatie (`x`/`y` keyframes, 22s/18s resp. 13s/15s, `easeInOut`, `repeat: Infinity`). Op desktop (`min-width:1024px`, via `useIsDesktop`-hook met `matchMedia`) is de drift-afstand 1,5× groter. Volledig uitgeschakeld bij `prefers-reduced-motion`.
- Eyebrow/titel/subtitel/children: elk een eigen `motion`-element, fade+slide-up bij mount (niet scroll), met oplopende `delay` (0 / 0,08 / 0,18 / 0,28s).

### `NetworkCoverage.jsx` (Home, Wie zijn wij, Voor dealers — "Eén organisatie, landelijk vertegenwoordigd")

- Eén decoratieve blob, ditmaal wél `whileInView` (scroll-getriggerd, once) i.p.v. bij mount, met dezelfde oneindige drift-logica als Hero (12s/10s, desktop-schaal via dezelfde hook).
- Tekstinhoud via `Reveal` met oplopende delays (0 / 0,08 / 0,16 / 0,24s).

### `VideoBackground.jsx` (alleen Home, "Het probleem"-sectie)

- Posterafbeelding direct zichtbaar (`loading="lazy"`).
- Video laadt pas zodra de sectie (bijna) in beeld komt (`useInView`, `once: true`, `margin: 800px` — laadt dus ruim van tevoren) én `prefers-reduced-motion` niet actief is. `autoPlay muted loop playsInline`.
- Geen fade-in van de video zelf; alleen de aanwezigheid ervan verandert.

### `MobileCarousel.jsx` (alleen Voor particulieren, "Wat leer je tijdens de training", **uitsluitend < 640px**)

- Horizontale scroll-snap carrousel (`overflow-x-auto`, `snap-x snap-mandatory`, `scroll-smooth`), kaarten 85% breed met randje van de volgende kaart zichtbaar.
- Automatisch doorschuiven: `setInterval` ~6,5s, stopt **definitief** zodra de gebruiker aanraakt/sleept (`touchstart`/`pointerdown`), pauzeert (niet stopt) zodra de sectie buiten beeld is (`useInView`, `amount: 0.4`), start niet bij `prefers-reduced-motion` en niet vanaf 640px (`matchMedia`).
- 6 stip-indicatoren onderaan, klikbaar, actieve stip `bg-flare-500` (CSS `transition-colors` 200ms), scrollt de container naar de juiste kaart via directe `scrollLeft`-toewijzing (vloeiend door de CSS `scroll-smooth`-klasse).
- Vanaf 640px: gewone CSS-grid, geen carrousel-gedrag, geen stippen (`sm:hidden`).

### Inklap/uitklap-knoppen (pijltje-icoon, alleen zichtbaar < 640px, content staat altijd al in de HTML)

Op Home (pillenlijst techniek-onderwerpen), Wie zijn wij (specialiteiten), Voor dealers
(pillenlijst complexiteit) en Voor particulieren (filosofie-vragen in de Veiligheid-kaart):
- Instant tonen/verbergen via Tailwind `hidden`/niet-`hidden` (`display:none`), **geen**
  hoogte-animatie (bewuste keuze, want `transition-all`/`max-height`-animatie is niet
  toegestaan volgens de projectregels).
- Het chevron-icoon zelf roteert wel: CSS `transition-transform` 200ms, `rotate-180` in
  geopende toestand.

### Contact-pagina specifiek

- Decoratieve blob: zelfde patroon als Hero/NetworkCoverage (bij mount, oneindige drift 12s/10s).
- Header (profielfoto + titel + tekst + contactgegevens-pills): één `motion.div`, fade+slide-up bij mount, 0.6s.
- Formulier-kaart: `Reveal` met delay 0,15s.
- Formulier ↔ bevestigingsbericht: `AnimatePresence mode="wait"` — bij succesvol versturen schuift het formulier weg (`opacity 0, y:-16`) en de bevestiging in (`opacity 0→1, y:16→0`), 0.5s, getriggerd door de `status`-state na een geslaagde `fetch` naar Web3Forms.
- Invoervelden: `focus-visible:-translate-y-px` (CSS `transition-transform` 200ms).
- Verstuurknop: hover `-translate-y-0.5`, uitgeschakeld + `opacity-60` tijdens versturen.
- Lettergrootte op mobiel bewust `text-base` (16px) i.p.v. `text-sm`, om iOS Safari's
  auto-zoom-bij-focus te voorkomen (eerder al opgelost, geen onderdeel van deze opdracht maar
  relevant om niet per ongeluk terug te draaien).

### `ProfilePhoto.jsx` (Wie zijn wij, Contact)

- Hover/focus: foto krijgt `blur-sm` (CSS `transition-[filter]` 300ms), LinkedIn-overlay
  faded in (`opacity-0 → group-hover:opacity-100`, 300ms).

### `Button.jsx` (overal)

- Hover: `-translate-y-0.5` (CSS `transition-transform` 300ms), pijl-icoon binnenin schuift
  `translate-x-1` op group-hover. `active:translate-y-0` bij indrukken.

## Belangrijk voor Fase 2 (prerendering) — nog te beantwoorden, niet uitvoeren

De verborgen beginstaat van alle `Reveal`/`whileInView`-elementen (`opacity:0` + offset) wordt
nu puur client-side door Framer Motion gezet. Als prerendering louter de uiteindelijke
(zichtbare) HTML/CSS zou bevriezen, zouden al die elementen in de prerendered HTML in hun
*eind*-toestand staan totdat React hydrateert — en dan is er geen "invliegen" meer te zien bij
eerste paint, of (erger) een zichtbare sprong van zichtbaar → onzichtbaar → opnieuw animeren
zodra Framer Motion overneemt. Dit is exact het risico dat in Fase 2 onderzocht moet worden.
