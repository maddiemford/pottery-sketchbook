import { forwardRef } from 'react'
import type { Piece } from '../types/piece'
import { PageShell } from './PageShell'

function formatMeasurements(m: Piece['measurementsBeforeFiring']): string {
  const parts: string[] = []
  if (m.heightCm) parts.push(`H ${m.heightCm}cm`)
  if (m.widthCm) parts.push(`W ${m.widthCm}cm`)
  if (m.depthCm) parts.push(`D ${m.depthCm}cm`)
  if (m.weightG) parts.push(`${m.weightG}g`)
  return parts.length ? parts.join(' · ') : '—'
}

interface PiecePageProps {
  piece: Piece
  pageNumber: number
  onAddFiring: (pieceId: string) => void
}

export const PiecePage = forwardRef<HTMLDivElement, PiecePageProps>(
  ({ piece, pageNumber, onAddFiring }, ref) => {
    return (
      <PageShell ref={ref} pageNumber={pageNumber}>
        <h2 className="font-serif text-xl text-stone-800 sm:text-2xl">
          {piece.title}
        </h2>
        <p className="mt-1 text-xs text-stone-500">{piece.createdAt}</p>

        {piece.sketchImageUrl ? (
          <img
            src={piece.sketchImageUrl}
            alt={`Sketch of ${piece.title}`}
            className="mt-3 max-h-40 w-full rounded border border-stone-300 object-contain bg-white"
          />
        ) : (
          <div className="mt-3 flex h-28 w-full items-center justify-center rounded border border-dashed border-stone-300 text-xs text-stone-400">
            no sketch attached
          </div>
        )}

        <dl className="mt-4 space-y-1 text-sm text-stone-700">
          <div className="flex justify-between gap-2">
            <dt className="text-stone-500">Clay body</dt>
            <dd className="text-right">{piece.clayBody || '—'}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-stone-500">Pre-fire measurements</dt>
            <dd className="text-right">
              {formatMeasurements(piece.measurementsBeforeFiring)}
            </dd>
          </div>
        </dl>

        {piece.notes && (
          <p className="mt-3 whitespace-pre-wrap text-sm italic text-stone-600">
            {piece.notes}
          </p>
        )}

        <div className="mt-4 border-t border-stone-300 pt-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
              Firings
            </h3>
            <button
              onClick={() => onAddFiring(piece.id)}
              className="rounded border border-stone-300 px-2 py-1 text-xs text-stone-600 hover:bg-stone-100"
            >
              + Log firing
            </button>
          </div>
          {piece.firings.length === 0 ? (
            <p className="mt-2 text-sm text-stone-400">Not fired yet.</p>
          ) : (
            <ul className="mt-2 space-y-3">
              {piece.firings.map((firing) => (
                <li
                  key={firing.id}
                  className="rounded border border-stone-200 bg-stone-50/60 p-2 text-sm"
                >
                  <div className="flex justify-between font-medium text-stone-700">
                    <span>{firing.label}</span>
                    <span className="text-stone-500">{firing.date}</span>
                  </div>
                  <div className="mt-1 text-stone-600">
                    {firing.coneOrTemp}
                    {firing.glaze ? ` · ${firing.glaze}` : ''}
                  </div>
                  <div className="mt-1 text-stone-500">
                    {formatMeasurements(firing.measurementsAfter)}
                  </div>
                  {firing.notes && (
                    <div className="mt-1 italic text-stone-500">
                      {firing.notes}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </PageShell>
    )
  },
)

PiecePage.displayName = 'PiecePage'
