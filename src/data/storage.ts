import type { Piece } from '../types/piece'
import { samplePieces } from './samplePieces'

const STORAGE_KEY = 'pottery-sketchbook:pieces'

export function loadPieces(): Piece[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return samplePieces
    return JSON.parse(raw) as Piece[]
  } catch {
    return samplePieces
  }
}

export function savePieces(pieces: Piece[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pieces))
  } catch {
    // storage unavailable (private browsing, quota) — fail silently
  }
}
