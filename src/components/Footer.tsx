export function Footer() {
  return (
    <footer
      className="mt-20 border-t"
      style={{
        background: 'var(--color-surface-container-lowest, #ffffff)',
        borderColor: 'var(--color-outline-variant, #c7c5d0)',
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-8 text-center">
        <p
          className="text-sm"
          style={{
            fontFamily: 'Poppins, sans-serif',
            color: 'var(--color-on-surface-variant, #46464f)',
          }}
        >
          Una herramienta de Inspira Tech · #NoCode #AutomatizacionesconIA
        </p>
        <p
          className="mt-1 text-sm"
          style={{
            fontFamily: 'Poppins, sans-serif',
            color: 'var(--color-outline, #777680)',
          }}
        >
          © 2024 Inspira Tech. Aprende digital, transforma tu futuro.
        </p>
      </div>
    </footer>
  )
}
