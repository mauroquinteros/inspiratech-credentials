import { useRef, useState } from 'react'
import templateSrc from '../assets/inspiratech-template.jpg'

const TEMPLATE_CONFIG = {
  centerXPercent: 50.9,
  centerYPercent: 39.9,
  diameterPercent: 67.5,
}

function preCropPhoto(img: HTMLImageElement): HTMLCanvasElement {
  const { naturalWidth: w, naturalHeight: h } = img
  let sx = 0, sy = 0, size = Math.min(w, h)

  if (h > w) {
    sy = Math.round(h * 0.05)
    size = w
    if (sy + size > h) sy = h - size
  } else if (w > h) {
    sx = Math.round((w - h) / 2)
    size = h
  }

  const c = document.createElement('canvas')
  c.width = size
  c.height = size
  c.getContext('2d')!.drawImage(img, -sx, -sy, w, h)
  return c
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

export function ComposerTest() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [composed, setComposed] = useState(false)
  const [status, setStatus] = useState('')

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setStatus('Cargando imágenes...')
    const userSrc = URL.createObjectURL(file)

    try {
      const [template, userImg] = await Promise.all([
        loadImage(templateSrc),
        loadImage(userSrc),
      ])
      URL.revokeObjectURL(userSrc)

      const canvas = canvasRef.current!
      canvas.width = template.naturalWidth
      canvas.height = template.naturalHeight
      const ctx = canvas.getContext('2d')!

      const W = canvas.width
      const H = canvas.height

      ctx.drawImage(template, 0, 0, W, H)

      const cx = (TEMPLATE_CONFIG.centerXPercent / 100) * W
      const cy = (TEMPLATE_CONFIG.centerYPercent / 100) * H
      const r = ((TEMPLATE_CONFIG.diameterPercent / 100) * W) / 2

      // pre-crop portrait to square (same strategy as Python script)
      const cropped = preCropPhoto(userImg)
      const diameter = r * 2

      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.clip()
      ctx.drawImage(cropped, cx - r, cy - r, diameter, diameter)
      ctx.restore()

      setComposed(true)
      setStatus(`Listo. ${W}×${H} | cx=${cx}, cy=${cy}, r=${Math.round(r)}`)
    } catch {
      setStatus('Error al cargar las imágenes.')
    }
  }

  function handleDownload() {
    canvasRef.current!.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'badge-test.png'
      a.click()
      URL.revokeObjectURL(url)
    }, 'image/png')
  }

  return (
    <div style={{ padding: '16px' }}>
      <h1>ComposerTest</h1>
      <p>
        centerX={TEMPLATE_CONFIG.centerXPercent}% · centerY=
        {TEMPLATE_CONFIG.centerYPercent}% · diameter=
        {TEMPLATE_CONFIG.diameterPercent}%
      </p>
      <input type="file" accept="image/png,image/jpeg" onChange={handleFile} />
      {composed && (
        <button onClick={handleDownload} style={{ marginLeft: '12px' }}>
          Descargar PNG
        </button>
      )}
      {status && <p style={{ color: '#555', fontSize: '13px' }}>{status}</p>}
      <br />
      <div style={{ maxWidth: '400px', margin: '0 auto', marginTop: '8px' }}>
        <canvas
          ref={canvasRef}
          style={{ display: 'block', width: '100%', border: '1px solid #ccc' }}
        />
      </div>
    </div>
  )
}
