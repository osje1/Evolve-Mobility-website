import profielfoto from '../assets/oscar-profielfoto.jpg'
import linkedinLogo from '../assets/linkedin-logo.png'

const LINKEDIN_URL = 'https://www.linkedin.com/in/oscar-spermon-50b99b19a/'

function ProfilePhoto({ className = 'h-28 w-28' }) {
  return (
    <a
      href={LINKEDIN_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block flex-shrink-0 overflow-hidden rounded-full shadow-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flare-500 focus-visible:ring-offset-2 ${className}`}
      aria-label="Bekijk het LinkedIn-profiel van Oscar Spermon (opent in een nieuw tabblad)"
    >
      <img
        src={profielfoto}
        alt="Oscar Spermon"
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-bottom transition-[filter] duration-300 ease-premium group-hover:blur-sm group-focus-visible:blur-sm"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-ink-950/60 opacity-0 transition-opacity duration-300 ease-premium group-hover:opacity-100 group-focus-visible:opacity-100">
        <span className="block h-[45%] w-[45%] overflow-hidden rounded-full bg-white shadow-base">
          <img src={linkedinLogo} alt="" className="h-full w-full object-cover" />
        </span>
      </span>
    </a>
  )
}

export default ProfilePhoto
