import { useState } from 'react'
import { Phone, Mail } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import PageMeta from '../components/PageMeta.jsx'
import ProfilePhoto from '../components/ProfilePhoto.jsx'
import Reveal from '../components/Reveal.jsx'
import useIsDesktop from '../hooks/useIsDesktop.js'

const DESKTOP_DRIFT_SCALE = 1.5

const onderwerpen = [
  'Gebruikerstrainingen voor dealers en dealergroepen',
  'Dealerintroductie',
  'Modelintroductie, roadshow of productdemonstratie',
  'Automotive- of mobiliteitsevenement',
  'EV-gebruikerstraining voor particulieren',
  'Overig',
]

function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const isDesktop = useIsDesktop()
  const xScale = isDesktop ? DESKTOP_DRIFT_SCALE : 1

  function handleSubmit(event) {
    event.preventDefault()
    // TODO: verzendmechanisme nog te bepalen met de klant (form-API of eigen backend-endpoint)
    setIsSubmitted(true)
  }

  return (
    <>
      <PageMeta
        title="Contact | Evolve Mobility"
        description="Neem contact op voor EV-gebruikerstrainingen, dealerintroducties of meer informatie over ons landelijke trainersnetwerk."
      />

      <section className="relative overflow-hidden bg-ink-50 px-6 py-20 lg:px-10 lg:py-28">
        <motion.div
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-flare-300/40 blur-3xl"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{
            opacity: 1,
            scale: 1,
            ...(prefersReducedMotion ? {} : { x: [0, 42 * xScale, -26 * xScale, 0], y: [0, -32, 22, 0] }),
          }}
          transition={{
            opacity: { duration: 1 },
            scale: { duration: 1 },
            x: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
            y: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:text-left">
              <ProfilePhoto className="h-24 w-24 sm:h-28 sm:w-28" />
              <h1 className="text-4xl font-semibold tracking-tight text-ink-950 lg:text-6xl">
                Neem contact op met Oscar.
              </h1>
            </div>
            <p className="mx-auto mt-6 max-w-xl text-center text-lg leading-relaxed text-ink-600 sm:mx-0 sm:text-left">
              Benieuwd naar de mogelijkheden voor uw organisatie, geïnteresseerd in een gebruikerstraining
              of wilt u mijn dienstverlening bespreken? Bel of mail mij gerust direct, of vul het formulier
              hieronder in. Ik neem dan zo snel mogelijk contact met u op.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 sm:justify-start">
              <div className="flex items-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-3 text-sm font-medium text-ink-700">
                <Phone className="h-4 w-4 text-flare-600" strokeWidth={2} />
                [telefoonnummer]
              </div>
              <div className="flex items-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-3 text-sm font-medium text-ink-700">
                <Mail className="h-4 w-4 text-flare-600" strokeWidth={2} />
                [emailadres]
              </div>
            </div>
          </motion.div>

          <Reveal delay={0.15}>
            <div className="mt-12 rounded-3xl border border-ink-100 bg-white p-6 shadow-raised sm:p-10">
              {isSubmitted ? (
                <div role="status" className="rounded-2xl border border-flare-200 bg-flare-50 p-6 text-flare-800">
                  <p className="font-heading text-lg font-semibold">Bedankt voor uw bericht</p>
                  <p className="mt-2 text-sm">Ik neem zo snel mogelijk contact met u op.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="grid gap-1.5 text-sm font-medium text-ink-700">
                      Naam
                      <input
                        type="text"
                        name="naam"
                        required
                        className="rounded-lg border border-ink-200 bg-white px-4 py-2.5 text-ink-900 shadow-base transition-transform duration-200 ease-premium focus-visible:-translate-y-px"
                      />
                    </label>
                    <label className="grid gap-1.5 text-sm font-medium text-ink-700">
                      Bedrijfsnaam
                      <input
                        type="text"
                        name="bedrijfsnaam"
                        className="rounded-lg border border-ink-200 bg-white px-4 py-2.5 text-ink-900 shadow-base transition-transform duration-200 ease-premium focus-visible:-translate-y-px"
                      />
                    </label>
                    <label className="grid gap-1.5 text-sm font-medium text-ink-700">
                      E-mailadres
                      <input
                        type="email"
                        name="email"
                        required
                        className="rounded-lg border border-ink-200 bg-white px-4 py-2.5 text-ink-900 shadow-base transition-transform duration-200 ease-premium focus-visible:-translate-y-px"
                      />
                    </label>
                    <label className="grid gap-1.5 text-sm font-medium text-ink-700">
                      Telefoonnummer
                      <input
                        type="tel"
                        name="telefoonnummer"
                        className="rounded-lg border border-ink-200 bg-white px-4 py-2.5 text-ink-900 shadow-base transition-transform duration-200 ease-premium focus-visible:-translate-y-px"
                      />
                    </label>
                  </div>

                  <label className="grid gap-1.5 text-sm font-medium text-ink-700">
                    Onderwerp
                    <select
                      name="onderwerp"
                      required
                      defaultValue=""
                      className="w-full min-w-0 rounded-lg border border-ink-200 bg-white px-4 py-2.5 text-ink-900 shadow-base transition-transform duration-200 ease-premium focus-visible:-translate-y-px"
                    >
                      <option value="" disabled>
                        Kies een onderwerp
                      </option>
                      {onderwerpen.map((onderwerp) => (
                        <option key={onderwerp} value={onderwerp}>
                          {onderwerp}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="grid gap-1.5 text-sm font-medium text-ink-700">
                    Bericht
                    <textarea
                      name="bericht"
                      rows={5}
                      required
                      className="rounded-lg border border-ink-200 bg-white px-4 py-2.5 text-ink-900 shadow-base transition-transform duration-200 ease-premium focus-visible:-translate-y-px"
                    />
                  </label>

                  <button
                    type="submit"
                    className="mt-2 w-fit rounded-full bg-flare-500 px-8 py-3 text-sm font-semibold text-white shadow-raised transition-transform duration-200 ease-premium hover:-translate-y-0.5 hover:bg-flare-600 active:translate-y-0"
                  >
                    Versturen
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default Contact
