import { useCallback, useState } from 'react'
import Cropper from 'react-easy-crop'
import { X, ZoomIn, ZoomOut } from 'lucide-react'
import type { CropArea } from '../types'

interface Props {
  imageSrc: string
  onApply: (cropArea: CropArea) => void
  onCancel: () => void
}

export function CropModal({ imageSrc, onApply, onCancel }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null)

  const onCropComplete = useCallback((_: unknown, areaPixels: CropArea) => {
    setCroppedAreaPixels(areaPixels)
  }, [])

  function handleApply() {
    if (croppedAreaPixels) onApply(croppedAreaPixels)
  }

  const zoomPercent = ((zoom - 1) / 2) * 100

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-50 flex items-center justify-end max-md:items-end"
      style={{ background: 'rgba(4, 5, 53, 0.75)', backdropFilter: 'blur(4px)' }}
    >
      {/* Modal card */}
      <div
        className="relative mx-auto w-full max-w-135 max-md:rounded-t-3xl max-md:rounded-b-none"
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: 'var(--shadow-modal)',
          maxHeight: '90vh',
          overflowY: 'auto',
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
              fontSize: '24px',
              color: '#1b1b1f',
              margin: 0,
            }}
          >
            Ajustar foto
          </h2>
          <button
            onClick={onCancel}
            className="flex items-center justify-center rounded-full transition-colors hover:bg-gray-100"
            style={{ width: '40px', height: '40px', border: 'none', background: 'none', cursor: 'pointer' }}
          >
            <X size={24} color="#777680" />
          </button>
        </div>

        <div
          className="my-4"
          style={{ borderBottom: '1px solid #c7c5d0' }}
        />

        {/* Crop area */}
        <div
          className="relative overflow-hidden"
          style={{
            width: '100%',
            aspectRatio: '1 / 1',
            maxHeight: '400px',
            background: '#000',
            borderRadius: '16px',
          }}
        >
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            restrictPosition={true}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            style={{
              cropAreaStyle: {
                border: '2px solid white',
                boxShadow: '0 0 0 9999px rgba(0,0,0,0.55)',
              },
            }}
          />
        </div>

        {/* Zoom slider */}
        <div className="mt-5 flex items-center gap-3">
          <ZoomOut size={18} color="#46464f" />
          <div className="relative flex-1">
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="zoom-slider w-full"
              style={{
                background: `linear-gradient(to right, #4740ff 0%, #2ae5dc ${zoomPercent}%, #eae7ec ${zoomPercent}%, #eae7ec 100%)`,
              }}
            />
          </div>
          <ZoomIn size={18} color="#46464f" />
        </div>

        {/* Helper text */}
        <p
          className="mt-3 text-center"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px',
            color: '#777680',
          }}
        >
          Arrastra la foto para reposicionar · Usa el deslizador para acercar
        </p>

        {/* Action buttons */}
        <div className="mt-7 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="transition-all duration-200"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              fontSize: '15px',
              color: '#46464f',
              background: 'white',
              border: '1.5px solid #c7c5d0',
              borderRadius: '12px',
              padding: '12px 24px',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#777680'
              e.currentTarget.style.background = '#f6f2f7'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#c7c5d0'
              e.currentTarget.style.background = 'white'
            }}
          >
            Cancelar
          </button>

          <button
            onClick={handleApply}
            className="transition-all duration-200"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              fontSize: '15px',
              color: 'white',
              background: 'var(--action-gradient)',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 32px',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(71, 64, 255, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9'
              e.currentTarget.style.transform = 'scale(1.02)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  )
}
