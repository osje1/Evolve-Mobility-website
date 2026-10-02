function Eyebrow({ children, tone = 'light' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] ${
        tone === 'dark' ? 'text-flare-400' : 'text-flare-600'
      }`}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {children}
    </span>
  )
}

export default Eyebrow
