# CLAUDE.md - Website EV-gebruikerstrainingen

## Projectcontext
- Website voor een Nederlands bedrijf gespecialiseerd in EV-gebruikerstrainingen, dealerintroducties en automotive/mobiliteitsevenementen.
- Doelgroepen, in volgorde van commerciele prioriteit: dealers en dealergroepen, leasemaatschappijen, importeurs/automotive merken, particuliere EV-rijders.
- Uitstraling: premium automotive/tech, professioneel, betrouwbaar, innovatief. Nadrukkelijk niet: rijschool-uitstraling, standaard trainingsbureau, groen duurzaamheidscliche.
- Kernboodschap: een moderne EV zit vol technologie, maar de aflevering biedt te weinig tijd om die uit te leggen. Dit bedrijf vult dat gat, met eigen trainers (landelijk netwerk van circa 35), volledige planning en een centraal aanspreekpunt.
- De volledige inhoudelijke briefing (paginastructuur, exacte koppen, teksten per sectie) staat in `docs/briefing.md`. Lees dat bestand altijd voordat je content of copy schrijft of aanpast.

## Tech stack
- React + Vite.
- Tailwind CSS, geconfigureerd via `tailwind.config.js` met een eigen kleuren- en spacing-schaal. Geen Tailwind via CDN-script.
- Routing via `react-router-dom` voor de pagina's: Home, Wie zijn wij, Voor wie, Voor particulieren, Voor dealers, Contact.
- Een gedeelde `Layout`-component met vaste navigatiebalk en footer, gebruikt op elke pagina. Navigatie en footer nooit per pagina dupliceren.
- Lokaal draaien: `npm run dev`.
- Productiebuild: `npm run build`, geschikt voor eigen hosting/VPS.
- Geen AI-API of andere externe runtime-dependency nodig om de site te laten draaien. AI wordt alleen gebruikt tijdens de ontwikkeling.

## Projectstructuur
- `/src/pages/` - een bestand per pagina.
- `/src/components/` - herbruikbare onderdelen: Navbar, Footer, Hero, Card, CTA-knop, ProcesStap, etc.
- `/src/assets/` - afbeeldingen en tijdelijke placeholders.
- Kleuren, fonts en spacing centraal beheren via de Tailwind-config of CSS-variabelen, niet los per component.

## Designrichting
- Veel witruimte, grote typografie, duidelijke visuele hierarchie.
- Twee verschillende fonts voor koppen en body-tekst, nooit hetzelfde font voor beide.
- Subtiele, premium animaties: alleen `transform` en `opacity`, nooit `transition-all`.
- Hover-effecten en focus-visible states op ieder klikbaar element.
- Gelaagde diepte (basis, verhoogd, zwevend) in plaats van platte `shadow-md`.
- Eigen kleurenpalet passend bij premium automotive/tech, bijvoorbeeld een donkere basis met een scherpe accentkleur. Geen standaard Tailwind-indigo of blue-600 als primaire kleur. Leg het gekozen palet vast in de Tailwind-config.
- Vermijd expliciet: stockfoto-cliches, standaard stekker-iconen, bliksemschichten, groene blaadjes, overdreven duurzaamheidsclichés, WordPress- of Bootstrap-look.
- Afbeeldingen: gebruik tijdelijke, neutrale placeholders (bijvoorbeeld `https://placehold.co/BREEDTExHOOGTE`) zolang er geen echte automotive-fotografie beschikbaar is, en vervang deze zodra die er is.

## Content en tone of voice
- Volg de aangeleverde briefing voor structuur, koppen en boodschap per pagina. Verzin geen secties of features die niet in de briefing staan.
- Nederlands, professioneel maar niet stijf, geen overdreven marketingtaal.
- Dealerpagina's: aanspreekvorm "u". Particuliere pagina's: aanspreekvorm "je".
- Iedere pagina ondersteunt de kernboodschap: een moderne EV vraagt om meer dan een aflevering, en dit bedrijf lost dat professioneel en landelijk op.

## Kwaliteitscontrole
- Start de dev server op de achtergrond (`npm run dev`) en maak na wijzigingen een screenshot van iedere pagina, bijvoorbeeld met Puppeteer.
- Sla screenshots op in `./screenshots/` en bekijk ze voordat je verdergaat naar de volgende sectie.
- Test minimaal op mobiel (375px), tablet (768px) en desktop (1440px) breedte.
- Check: leesbaarheid van tekst op afbeeldingen, voldoende contrast op donkere en lichte vlakken, werkende hover- en focus-states, geen overlappende elementen op kleine schermen.
- Stop niet na een eerste ronde. Herstel afwijkingen en controleer opnieuw.

## Toegankelijkheid en vindbaarheid (minimum)
- Semantische HTML: correcte kopjeshierarchie, gebruik van `nav`, `main`, `footer`.
- Alt-teksten op alle content-afbeeldingen.
- Voldoende kleurcontrast, ook in donkere secties.
- Eigen paginatitel en meta-omschrijving per pagina.

## Contactformulier
- Velden: naam, bedrijfsnaam, e-mailadres, telefoonnummer, onderwerp (dropdown), bericht.
- Na versturen een duidelijke bevestiging tonen.
- Het formulier moet uiteindelijk naar het zakelijke e-mailadres van het bedrijf kunnen versturen. Vraag welk verzendmechanisme gewenst is (bijvoorbeeld een formulier-API of een eigen backend-endpoint) als dit nog niet vastligt. Bouw dit niet stilzwijgend met een placeholder-API.

## Volgorde van bouwen
1. Layout, navigatie en footer.
2. Homepage: hero, probleemstelling, drie pijlers, diensten, landelijke dekking.
3. Kleuren, typografie, buttons en basisanimaties vastzetten voor de hele site.
4. Overige pagina's: Wie zijn wij, Voor wie, Voor particulieren, Voor dealers, Contact.
5. Responsive gedrag en toegankelijkheid controleren over alle pagina's.

## Harde regels
- Geen standaard Tailwind blauw/indigo als primaire kleur.
- Geen `transition-all`.
- Geen secties, features of content toevoegen die niet in de briefing staan.
- Navigatie en footer altijd via de gedeelde Layout-component, nooit per pagina dupliceren.
- Stop niet na een eerste bouw- of screenshotronde als er nog afwijkingen zijn.
- Schrijf alle code-commentaar en variabelenamen in het Engels. Communiceer met de gebruiker in het Nederlands.