export type AppPhase = 'upload' | 'crop' | 'preview'

export interface CropArea {
  x: number
  y: number
  width: number
  height: number
}
