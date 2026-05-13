import { Download } from 'lucide-react'

interface Props {
  disabled?: boolean
  onClick: () => void
}

export function DownloadButton({ disabled = false, onClick }: Props) {
  if (disabled) {
    return (
      <button
        disabled
        className="flex w-full cursor-not-allowed items-center justify-center gap-2.5"
        style={{
          height: '64px',
          background: '#dcd9de',
          color: '#777680',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 700,
          fontSize: '18px',
          borderRadius: '16px',
          border: 'none',
          maxWidth: '560px',
        }}
      >
        <Download size={20} />
        Descargar mi badge
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2.5 transition-all duration-200"
      style={{
        height: '64px',
        background: '#2ae5dc',
        color: '#040535',
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 700,
        fontSize: '18px',
        borderRadius: '16px',
        border: 'none',
        maxWidth: '560px',
        cursor: 'pointer',
        boxShadow: 'var(--shadow-cta)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '0.9'
        e.currentTarget.style.transform = 'scale(1.02)'
        e.currentTarget.style.boxShadow = 'var(--shadow-cta-hover)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '1'
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = 'var(--shadow-cta)'
      }}
    >
      <Download size={20} />
      Descargar mi badge
    </button>
  )
}
