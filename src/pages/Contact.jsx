import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import PageMeta from '../components/PageMeta.jsx'
import ProfilePhoto from '../components/ProfilePhoto.jsx'
import Reveal from '../components/Reveal.jsx'
import useIsDesktop from '../hooks/useIsDesktop.js'

const DESKTOP_DRIFT_SCALE = 1.5

// Web3Forms: geen eigen backend nodig, deze access key is bedoeld om publiek in de
// frontend te staan (vergelijkbaar met een reCAPTCHA site-key), dat is hoe Web3Forms werkt.
const WEB3FORMS_ACCESS_KEY = '99295064-99ea-4452-ba12-5a4f4f77f968'
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const MAIL_SUBJECT = 'Nieuw bericht via evolvemobility.nl'
// Extra, onzichtbare bot-check naast de honeypot: een bot vult een formulier vrijwel
// direct in, een echt persoon heeft daar altijd even voor nodig.
const MIN_FILL_TIME_MS = 3000

const onderwerpen = [
  'Gebruikerstrainingen voor dealers en dealergroepen',
  'Dealerintroductie',
  'Modelintroductie, roadshow of productdemonstratie',
  'Automotive- of mobiliteitsevenement',
  'EV-gebruikerstraining voor particulieren',
  'Overig',
]

function Contact() {
  // 'idle' | 'submitting' | 'success' | 'error'
  const [status, setStatus] = useState('idle')
  const prefersReducedMotion = useReducedMotion()
  const isDesktop = useIsDesktop()
  const xScale = isDesktop ? DESKTOP_DRIFT_SCALE : 1
  const formShownAtRef = useRef(Date.now())

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget

    // Twee onzichtbare controles tegen geautomatiseerd/misbruikt versturen door anderen
    // dan een bezoeker die het formulier echt invult:
    // 1) Honeypot-veld: alleen bots vullen dit in.
    // 2) Te snel verstuurd: sneller dan een mens het formulier kan invullen.
    // In beide gevallen doen we alsof het gelukt is (zodat een bot niet blijft proberen),
    // maar sturen we niets naar Web3Forms.
    const submittedTooFast = Date.now() - formShownAtRef.current < MIN_FILL_TIME_MS
    if (form.elements.botcheck.checked || submittedTooFast) {
      form.reset()
      setStatus('success')
      return
    }

    // Verplichte velden check (naast de native browser-validatie via `required`).
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    setStatus('submitting')

    const payload = Object.fromEntries(new FormData(form).entries())
    payload.access_key = WEB3FORMS_ACCESS_KEY
    payload.subject = MAIL_SUBJECT
    delete payload.botcheck

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json().catch(() => null)

      if (response.ok && result?.success) {
        form.reset()
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <PageMeta
        title="Contact | Evolve Mobility"
        description="Neem contact op voor EV-gebruikerstraining, dealerintroducties of meer informatie over ons landelijke trainersnetwerk."
        path="/contact"
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
                [telefoonnummer]
              </div>
              <a
                href="mailto:info@evolvemobility.nl"
                className="flex items-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-3 text-sm font-medium text-ink-700 transition-colors duration-200 ease-premium hover:border-flare-300 hover:text-flare-700"
              >
                info@evolvemobility.nl
              </a>
            </div>
          </motion.div>

          <Reveal delay={0.15}>
            <div className="mt-12 overflow-hidden rounded-3xl border border-ink-100 bg-white p-6 shadow-raised sm:p-10">
              <AnimatePresence mode="wait" initial={false}>
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    role="status"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-2xl border border-flare-200 bg-flare-50 p-6 text-flare-800"
                  >
                    <p className="font-heading text-lg font-semibold">Bedankt voor uw bericht</p>
                    <p className="mt-2 text-sm">Ik neem zo snel mogelijk contact met u op.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="grid gap-5"
                  >
                    {status === 'error' && (
                    <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                      Er ging iets mis bij het versturen van uw bericht. Probeert u het nogmaals, of neem
                      rechtstreeks contact op via de gegevens hierboven.
                    </div>
                  )}

                  {/* Honeypot-veld tegen spam: voor echte bezoekers onzichtbaar en niet focusbaar. */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    tabIndex="-1"
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />

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
                      Bedrijfsnaam (optioneel)
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
                    disabled={status === 'submitting'}
                    className="mt-2 w-fit rounded-full bg-flare-500 px-8 py-3 text-sm font-semibold text-white shadow-raised transition-transform duration-200 ease-premium hover:-translate-y-0.5 hover:bg-flare-600 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60"
                  >
                    {status === 'submitting' ? 'Versturen...' : 'Versturen'}
                  </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default Contact
