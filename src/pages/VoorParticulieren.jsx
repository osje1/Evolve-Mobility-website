import { useState } from 'react'
import { Car, ShieldCheck, BatteryCharging, Route, RefreshCcw, Luggage } from 'lucide-react'
import PageMeta from '../components/PageMeta.jsx'
import Hero from '../components/Hero.jsx'
import Button from '../components/Button.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import TiltCard from '../components/TiltCard.jsx'
import MobileCarousel from '../components/MobileCarousel.jsx'

const categorieën = [
  {
    icon: Car,
    title: 'De auto begrijpen',
    items: ['Instellingen', 'Belangrijke functies', 'Infotainment', 'Rijmodi'],
  },
  {
    icon: ShieldCheck,
    title: 'Veiligheid',
    items: [
      'Automatisch noodremmen',
      'Lane Assist',
      'Adaptieve cruisecontrol',
      'Verkeersbordherkenning',
      'Aandachts- en vermoeidheidswaarschuwingen',
      'Andere rijhulpsystemen',
    ],
    filosofie: ['Wat doet de auto?', 'Waarom doet hij dat?', 'Wanneer grijpt hij in?', 'Wat moet jij als bestuurder doen?'],
  },
  {
    icon: BatteryCharging,
    title: 'Laden',
    items: [
      'Laadplanning en laadlimiet instellen',
      'Laadpassen en welke past bij jouw gebruik',
      'Laadapps en navigatie naar laders',
      'Laadsnelheid en laadcurve van jouw auto',
      'Laadkabel en laadstand van de auto begrijpen',
      'Laden onderweg gebruiken',
    ],
  },
  {
    icon: Route,
    title: 'Actieradius',
    items: ['Invloed van snelheid', 'Temperatuur', 'Klimaatregeling', 'Rijstijl', 'Regeneratie', 'Energieverbruik'],
  },
  {
    icon: RefreshCcw,
    title: 'Efficiënt rijden',
    items: [
      'Regeneratief remmen',
      'Efficiënt omgaan met energie',
      'Rijstijl',
      'Optimaal gebruik van de beschikbare actieradius',
    ],
  },
  {
    icon: Luggage,
    title: 'Lange ritten & vakantie',
    items: ['Laadstops plannen', 'Routeplanning', 'Omgaan met actieradius', 'Praktische voorbereiding'],
  },
]

function VoorParticulieren() {
  // Alleen voor de "filosofie"-vragen bij Veiligheid: die maken die ene kaart op mobiel veel
  // hoger dan de andere vijf in de carrousel. Onder 640px staan ze daarom standaard
  // ingeklapt (blijven wel gewoon in de HTML); vanaf 640px altijd volledig uitgeklapt.
  const [toonFilosofie, setToonFilosofie] = useState(false)

  return (
    <>
      <PageMeta
        title="EV-gebruikerstraining voor particulieren | Evolve Mobility"
        description="Training voor nieuwe EV-rijders: in een persoonlijke gebruikerstraining van circa 75 minuten leer je wat je elektrische auto kan en hoe je hem optimaal gebruikt."
        path="/voor-particulieren"
      />

      <Hero
        tone="light"
        eyebrow="Voor particulieren"
        title="Haal meer uit je elektrische auto."
        subtitle="Een elektrische auto werkt anders dan een traditionele auto. Tijdens een persoonlijke gebruikerstraining nemen we de tijd om uit te leggen wat jouw auto kan en hoe je deze optimaal gebruikt."
      >
        <div className="flex items-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-3 text-sm font-medium text-ink-700">
          Circa 75 minuten, persoonlijk en praktisch
        </div>
        <div className="flex items-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-3 text-sm font-medium text-ink-700">
          Bijna iedereen leert iets nieuws tijdens de training
        </div>
        <Button to="/contact" variant="secondary">
          Neem contact op
        </Button>
      </Hero>

      <section id="wat-leer-je-tijdens-de-training" className="scroll-mt-24 bg-white px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="Wat leer je tijdens de training?"
            description="Een moderne elektrische auto heeft vaak veel meer functies dan je de eerste weken ontdekt. Zonder uitleg blijft een deel daarvan onbenut."
            align="center"
            className="mx-auto"
          />
          <div className="mt-14">
            <MobileCarousel gridColsClassName="md:grid-cols-2 lg:grid-cols-3">
              {categorieën.map((categorie, index) => (
                <Reveal key={categorie.title} delay={index * 0.06} className="h-full">
                  <TiltCard className="h-full rounded-2xl border border-ink-100 bg-ink-50 p-7 shadow-base transition-shadow duration-300 ease-premium hover:shadow-raised">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-flare-50 text-flare-600">
                      <categorie.icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <h3 className="mt-5 font-heading text-lg font-semibold text-ink-950">{categorie.title}</h3>
                    <ul className="mt-4 space-y-2">
                      {categorie.items.map((item) => (
                        <li key={item} className="text-sm leading-relaxed text-ink-600">
                          {item}
                        </li>
                      ))}
                    </ul>

                    {categorie.filosofie && (
                      <div className="mt-5 border-t border-ink-200 pt-4">
                        <div
                          className={`space-y-1.5 ${toonFilosofie ? '' : 'hidden'} sm:!block`}
                        >
                          {categorie.filosofie.map((vraag, i) => (
                            <p key={vraag} className="text-sm font-medium text-ink-800">
                              <span className="mr-2 text-flare-500">{i + 1}.</span>
                              {vraag}
                            </p>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => setToonFilosofie((v) => !v)}
                          aria-expanded={toonFilosofie}
                          className={`text-sm font-semibold text-flare-600 hover:text-flare-700 sm:hidden ${
                            toonFilosofie ? 'mt-1.5' : ''
                          }`}
                        >
                          {toonFilosofie ? 'Toon minder' : 'Lees meer'}
                        </button>
                      </div>
                    )}
                  </TiltCard>
                </Reveal>
              ))}
            </MobileCarousel>
          </div>
        </div>
      </section>

      <section className="bg-ink-950 px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            tone="dark"
            eyebrow="Waarom een gebruikerstraining?"
            title="Je hoeft het niet allemaal zelf uit te zoeken."
            description="De meeste bestuurders ontdekken de functies van hun auto met vallen en opstaan, of laten ze onbenut. Tijdens de training krijg je persoonlijke uitleg, precies afgestemd op jouw auto en jouw vragen. Dat neemt een hoop onzekerheid weg en geeft je vanaf dag één meer vertrouwen achter het stuur."
            align="center"
            className="mx-auto"
          />
        </div>
      </section>

      <section className="bg-white px-6 py-24 text-center lg:px-10 lg:py-32">
        <Reveal>
          <h2 className="mx-auto max-w-xl font-heading text-2xl font-semibold text-ink-950 lg:text-3xl">
            Binnenkort kun je rechtstreeks bij ons een gebruikerstraining inplannen.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-xl text-ink-600">
            Tot die tijd kun je alvast contact met ons opnemen om de mogelijkheden te bespreken.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-8 flex justify-center">
            <Button to="/contact" variant="primary">
              Neem contact op
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  )
}

export default VoorParticulieren
