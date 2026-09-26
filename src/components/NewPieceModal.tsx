import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import type { Piece } from '../types/piece'
import { Modal } from './Modal'

const inputClass =
  'mt-1 w-full rounded border border-stone-300 px-3 py-2 text-sm focus:border-stone-500 focus:outline-none'
const labelClass = 'block text-sm font-medium text-stone-600'

interface NewPieceModalProps {
  onClose: () => void
  onCreate: (piece: Piece) => void
}

export function NewPieceModal({ onClose, onCreate }: NewPieceModalProps) {
  const [title, setTitle] = useState('')
  const [clayBody, setClayBody] = useState('')
  const [height, setHeight] = useState('')
  const [width, setWidth] = useState('')
  const [weight, setWeight] = useState('')
  const [notes, setNotes] = useState('')
  const [sketchImageUrl, setSketchImageUrl] = useState<string | undefined>()

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setSketchImageUrl(reader.result as string)
    reader.readAsDataURL(file)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return

    const piece: Piece = {
      id: uuid(),
      title: title.trim(),
      createdAt: new Date().toISOString().slice(0, 10),
      clayBody: clayBody.trim(),
      sketchImageUrl,
      measurementsBeforeFiring: {
        heightCm: height ? Number(height) : undefined,
        widthCm: width ? Number(width) : undefined,
        weightG: weight ? Number(weight) : undefined,
      },
      notes: notes.trim(),
      firings: [],
    }
    onCreate(piece)
  }

  return (
    <Modal title="New piece" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className={labelClass}>Title</label>
          <input
            className={inputClass}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Speckled Mug"
            autoFocus
            required
          />
        </div>

        <div>
          <label className={labelClass}>Sketch / photo</label>
          <input
            type="file"
            accept="image/*"
            className="mt-1 w-full text-sm"
            onChange={handleImageChange}
          />
        </div>

        <div>
          <label className={labelClass}>Clay body</label>
          <input
            className={inputClass}
            value={clayBody}
            onChange={(e) => setClayBody(e.target.value)}
            placeholder="e.g. Speckled Buff Stoneware"
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className={labelClass}>Height (cm)</label>
            <input
              type="number"
              step="0.1"
              className={inputClass}
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Width (cm)</label>
            <input
              type="number"
              step="0.1"
              className={inputClass}
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Weight (g)</label>
            <input
              type="number"
              step="1"
              className={inputClass}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Notes</label>
          <textarea
            className={inputClass}
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Idea, technique, anything to remember"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded bg-stone-800 py-2 text-sm font-medium text-white hover:bg-stone-700"
        >
          Add to sketchbook
        </button>
      </form>
    </Modal>
  )
}
