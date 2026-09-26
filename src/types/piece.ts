export interface Measurements {
  heightCm?: number
  widthCm?: number
  depthCm?: number
  weightG?: number
}

export interface Firing {
  id: string
  label: string // e.g. "Bisque", "Glaze"
  date: string // ISO date
  coneOrTemp: string // e.g. "Cone 6" or "1220°C"
  glaze: string
  measurementsAfter: Measurements
  notes: string
}

export interface Piece {
  id: string
  title: string
  createdAt: string // ISO date, when the sketch/idea was recorded
  sketchImageUrl?: string
  clayBody: string
  measurementsBeforeFiring: Measurements
  firings: Firing[]
  notes: string
}
