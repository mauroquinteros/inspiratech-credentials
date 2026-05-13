import { useCallback, useRef, useState } from 'react'
import { UploadCloud } from 'lucide-react'
import templateSrc from '../assets/inspiratech-template.jpg'
import { ACCEPTED_TYPES, MAX_FILE_SIZE_MB } from '../utils/constants'

interface Props {
  onFileSelected: (src: string) => void
  onError: (msg: string) => void
}

export function UploadZone({ onFileSelected, onError }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  function validateAndLoad(file: File) {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      onError('Solo PNG o JPG, máximo 5MB')
      return
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      onError('El archivo es demasiado grande (máximo 5MB)')
      return
    }
    onFileSelected(URL.createObjectURL(file))
  }

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      const file = e.dataTransfer.files[0]
      if (file) validateAndLoad(file)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) validateAndLoad(file)
    e.target.value = ''
  }

  return (
    <div
      className="relative w-full cursor-pointer overflow-hidden"
      style={{
        maxWidth: '560px',
        borderRadius: '24px',
      }}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
    >
      {/* Template image in flow — drives the container height to match the real aspect ratio */}
      <img
        src={templateSrc}
        alt=""
        className="block w-full h-auto"
        draggable={false}
      />

      {/* Frosted overlay */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-200"
        style={{
          background: isDragOver
            ? 'rgba(224, 253, 251, 0.95)'
            : 'rgba(252, 248, 253, 0.88)',
          backdropFilter: 'blur(8px)',
          borderRadius: '24px',
        }}
      >
        {/* Dashed border inset */}
        <div
          className="pointer-events-none absolute"
          style={{
            inset: '16px',
            borderRadius: '16px',
            border: isDragOver
              ? '3px solid #2ae5dc'
              : '2.5px dashed #2ae5dc',
            transition: 'all 200ms ease',
          }}
        />

        {/* Upload icon */}
        <div
          className="flex items-center justify-center"
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'var(--action-gradient)',
          }}
        >
          <UploadCloud size={40} color="white" strokeWidth={1.5} />
        </div>

        {/* Text */}
        <p
          className="mt-5"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            fontSize: '20px',
            color: '#1b1b1f',
          }}
        >
          Arrastra tu foto aquí
        </p>
        <p
          className="mt-1.5"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            fontSize: '15px',
            color: '#46464f',
          }}
        >
          o haz clic para seleccionarla
        </p>
        <p
          className="mt-4"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            fontSize: '12px',
            color: '#777680',
            letterSpacing: '0.3px',
          }}
        >
          PNG o JPG · Máximo 5MB
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  )
}
