import type { CropArea } from '../types'
import { CIRCLE_POSITION } from './constants'

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

export async function getCroppedImageDataUrl(
  imageSrc: string,
  cropArea: CropArea,
): Promise<string> {
  const img = await loadImage(imageSrc)
  const canvas = document.createElement('canvas')
  canvas.width = cropArea.width
  canvas.height = cropArea.height
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(img, -cropArea.x, -cropArea.y, img.naturalWidth, img.naturalHeight)
  return canvas.toDataURL('image/jpeg', 0.95)
}

export async function composeImage(
  templateSrc: string,
  croppedDataUrl: string,
): Promise<HTMLCanvasElement> {
  const [template, userImg] = await Promise.all([
    loadImage(templateSrc),
    loadImage(croppedDataUrl),
  ])

  const canvas = document.createElement('canvas')
  canvas.width = template.naturalWidth
  canvas.height = template.naturalHeight
  const ctx = canvas.getContext('2d')!

  const W = canvas.width
  const H = canvas.height

  ctx.drawImage(template, 0, 0, W, H)

  const cx = (CIRCLE_POSITION.centerXPercent / 100) * W
  const cy = (CIRCLE_POSITION.centerYPercent / 100) * H
  const r = ((CIRCLE_POSITION.diameterPercent / 100) * W) / 2

  ctx.save()
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.clip()
  ctx.drawImage(userImg, cx - r, cy - r, r * 2, r * 2)
  ctx.restore()

  return canvas
}

export function downloadCanvas(canvas: HTMLCanvasElement, filename = 'mi-badge-inspiratech.png') {
  canvas.toBlob((blob) => {
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }, 'image/png')
}
