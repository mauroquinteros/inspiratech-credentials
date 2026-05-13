import logoSrc from '../assets/inspiratech-logo.png'

export function Header() {
  return (
    <header
      className="relative top-0 z-50 w-full"
      style={{ background: 'var(--header-gradient)' }}
    >
      {/* Depth overlay — matches the landing Hero's second gradient layer */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(4,5,53,0.30) 0%, rgba(255,255,255,0.05) 100%)',
        }}
      />
      <div className="relative mx-auto flex h-18 max-w-7xl items-center justify-between max-md:h-16 max-md:px-5">
        <a href="https://inspira-tech.lovable.app/" className="flex items-center">
          <img
            src={logoSrc}
            alt="Inspira Tech"
            className="h-9 w-auto object-contain max-md:h-8"
            onError={(e) => {
              const el = e.currentTarget
              el.style.display = 'none'
              const fallback = el.nextElementSibling as HTMLElement
              if (fallback) fallback.style.display = 'block'
            }}
          />
          <span
            className="hidden text-white"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
          >
            Inspira Tech
          </span>
        </a>
      </div>
    </header>
  )
}
