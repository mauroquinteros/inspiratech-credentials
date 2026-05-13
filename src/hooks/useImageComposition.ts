import { useEffect, useRef, useState } from 'react'
import templateSrc from '../assets/inspiratech-template.jpg'
import { composeImage } from '../utils/canvasHelpers'

export function useImageComposition(croppedDataUrl: string | null) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [composing, setComposing] = useState(false)

  useEffect(() => {
    if (!croppedDataUrl || !canvasRef.current) return

    setComposing(true)
    composeImage(templateSrc, croppedDataUrl)
      .then((composed) => {
        const canvas = canvasRef.current!
        canvas.width = composed.width
        canvas.height = composed.height
        canvas.getContext('2d')!.drawImage(composed, 0, 0)
      })
      .finally(() => setComposing(false))
  }, [croppedDataUrl])

  return { canvasRef, composing }
}
