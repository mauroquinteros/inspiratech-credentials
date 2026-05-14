import { useRef, useState } from 'react'
import { ArrowRight, Loader2, AlertCircle, MessageCircle, Sparkles } from 'lucide-react'

interface ValidationScreenProps {
  onValidate: (code: string) => Promise<boolean>
  onSuccess: () => void
}

export function ValidationScreen({ onValidate, onSuccess }: ValidationScreenProps) {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isButtonHovered, setIsButtonHovered] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const isEmpty = !code.trim()
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER ?? '51999888777'

  async function handleSubmit() {
    if (isEmpty || isLoading) return
    setIsLoading(true)
    setHasError(false)
    const ok = await onValidate(code)
    setIsLoading(false)
    if (ok) {
      setIsFadingOut(true)
      setTimeout(() => onSuccess(), 300)
    } else {
      setHasError(true)
      inputRef.current?.select()
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCode(e.target.value)
    if (hasError) setHasError(false)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSubmit()
  }

  function getContainerBorder() {
    if (hasError) return '2px solid #ba1a1a'
    if (isFocused) return '2px solid #4740ff'
    return '1.5px solid #c7c5d0'
  }

  return (
    <main
      style={{
        minHeight: 'calc(100vh - 72px)',
        background: '#fcf8fd',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 200ms ease',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '500px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(26px, 5vw, 36px)',
            lineHeight: 1.2,
            color: '#2b18ea',
            margin: '0 0 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          Bienvenido al programa
          <Sparkles className="h-8 w-8 text-inspira-purple" />
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: 1.6,
            color: '#46464f',
            maxWidth: '400px',
            margin: '0 0 32px',
          }}
        >
          Ingresa el código que recibiste por correo para generar tu credencial
        </p>

        {/* Input combo */}
        <div
          className="h-14 max-md:h-13"
          style={{
            width: '100%',
            display: 'flex',
            border: getContainerBorder(),
            borderRadius: '14px',
            overflow: 'hidden',
            background: '#ffffff',
            boxShadow: isFocused && !hasError ? '0 0 0 3px rgba(71, 64, 255, 0.1)' : 'none',
            transition: 'border-color 150ms ease, box-shadow 150ms ease',
            animation: hasError ? 'shake 400ms ease-in-out' : 'none',
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setIsFocused(false)
            }
          }}
        >
          <input
            ref={inputRef}
            type="text"
            autoFocus
            value={code}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="Tu código de acceso"
            aria-label="Código de acceso"
            className="validation-input"
            style={{
              flex: 1,
              minWidth: 0,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              padding: '0 20px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 500,
              fontSize: '16px',
              color: '#1b1b1f',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              opacity: isLoading ? 0.6 : 1,
              transition: 'opacity 150ms ease',
            }}
          />
          <button
            onClick={handleSubmit}
            disabled={isEmpty || isLoading}
            aria-label="Validar código"
            className="h-full max-md:w-13"
            style={{
              width: '56px',
              flexShrink: 0,
              border: 'none',
              background: isEmpty || isLoading ? '#e5e1e6' : 'var(--action-gradient)',
              cursor: isEmpty || isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 200ms ease',
            }}
            onMouseEnter={() => { if (!isEmpty && !isLoading) setIsButtonHovered(true) }}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            {isLoading ? (
              <Loader2 size={24} color="#777680" className="animate-spin" />
            ) : (
              <ArrowRight
                size={24}
                color={isEmpty ? '#777680' : 'white'}
                style={{
                  transition: 'transform 200ms ease',
                  transform: isButtonHovered ? 'translateX(2px)' : 'translateX(0)',
                }}
              />
            )}
          </button>
        </div>

        {/* Error message */}
        {hasError && (
          <div
            role="alert"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '12px',
              padding: '10px 14px',
              borderRadius: '10px',
              background: '#ffdad6',
              color: '#93000a',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              textAlign: 'left',
              animation: 'errorAppear 200ms ease-out',
            }}
          >
            <AlertCircle size={16} color="#93000a" style={{ flexShrink: 0 }} />
            El código no es correcto. Revisa tu correo o contáctanos si tienes dudas.
          </div>
        )}

        {/* Support link */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '32px',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px',
            color: '#46464f',
            textAlign: 'center',
          }}
        >
          ¿No tienes tu código?{' '}
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              color: '#777680',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'color 200ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#2b18ea'
              e.currentTarget.style.textDecoration = 'underline'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#777680'
              e.currentTarget.style.textDecoration = 'none'
            }}
          >
            <MessageCircle size={14} />
            Escríbenos por WhatsApp
          </a>
        </div>
      </div>
    </main>
  )
}
