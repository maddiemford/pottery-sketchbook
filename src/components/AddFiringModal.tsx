import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import type { Firing } from '../types/piece'
import { Modal } from './Modal'

const inputClass =
  'mt-1 w-full rounded border border-stone-300 px-3 py-2 text-sm focus:border-stone-500 focus:outline-none'
const labelClass = 'block text-sm font-medium text-stone-600'

interface AddFiringModalProps {
  pieceTitle: string
  onClose: () => void
  onAdd: (firing: Firing) => void
}

export function AddFiringModal({
  pieceTitle,
  onClose,
  onAdd,
}: AddFiringModalProps) {
  const [label, setLabel] = useState('Bisque')
  const [coneOrTemp, setConeOrTemp] = useState('')
  const [glaze, setGlaze] = useState('')
  const [height, setHeight] = useState('')
  const [width, setWidth] = useState('')
  const [weight, setWeight] = useState('')
  const [notes, setNotes] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const firing: Firing = {
      id: uuid(),
      label: label.trim() || 'Firing',
      date: new Date().toISOString().slice(0, 10),
      coneOrTemp: coneOrTemp.trim(),
      glaze: glaze.trim(),
      measurementsAfter: {
        heightCm: height ? Number(height) : undefined,
        widthCm: width ? Number(width) : undefined,
        weightG: weight ? Number(weight) : undefined,
      },
      notes: notes.trim(),
    }
    onAdd(firing)
  }

  return (
    <Modal title={`Log a firing — ${pieceTitle}`} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className={labelClass}>Stage</label>
          <select
            className={inputClass}
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          >
            <option>Bisque</option>
            <option>Glaze</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Cone / temperature</label>
          <input
            className={inputClass}
            value={coneOrTemp}
            onChange={(e) => setConeOrTemp(e.target.value)}
            placeholder="e.g. Cone 6 or 1220°C"
          />
        </div>

        <div>
          <label className={labelClass}>Glaze</label>
          <input
            className={inputClass}
            value={glaze}
            onChange={(e) => setGlaze(e.target.value)}
            placeholder="e.g. Amber Celadon over white slip"
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
            placeholder="How did it come out?"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded bg-stone-800 py-2 text-sm font-medium text-white hover:bg-stone-700"
        >
          Save firing
        </button>
      </form>
    </Modal>
  )
}
