import templateSrc from '../assets/inspiratech-template.jpg'
import { useImageComposition } from '../hooks/useImageComposition'

interface Props {
  croppedDataUrl: string
}

export function BadgePreview({ croppedDataUrl }: Props) {
  const { canvasRef, composing } = useImageComposition(croppedDataUrl)

  return (
    <div
      className="relative w-full overflow-hidden transition-shadow duration-200"
      style={{
        maxWidth: '560px',
        borderRadius: '24px',
        boxShadow: 'var(--shadow-primary)',
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLElement).style.boxShadow =
          'var(--shadow-primary-hover)'
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-primary)'
      }}
    >
      {/* Invisible spacer — lets the container adopt the template's natural aspect ratio */}
      <img src={templateSrc} alt="" className="block w-full h-auto invisible" aria-hidden />

      {/* Composed canvas absolutely fills the spacer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full"
      />

      {composing && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
          <div
            className="h-10 w-10 animate-spin rounded-full border-4 border-transparent"
            style={{ borderTopColor: '#4740ff' }}
          />
        </div>
      )}
    </div>
  )
}
