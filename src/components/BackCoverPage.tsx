import { forwardRef } from 'react'

interface BackCoverPageProps {
  onAddPiece: () => void
}

export const BackCoverPage = forwardRef<HTMLDivElement, BackCoverPageProps>(
  ({ onAddPiece }, ref) => {
    return (
      <div
        ref={ref}
        className="flex h-full w-full flex-col items-center justify-center gap-4 border border-stone-400 bg-gradient-to-br from-stone-700 to-stone-900 p-8 text-center text-stone-50"
      >
        <p className="text-sm text-stone-300">End of sketchbook</p>
        <button
          onClick={onAddPiece}
          className="rounded-full bg-stone-50 px-5 py-2 text-sm font-medium text-stone-800 hover:bg-white"
        >
          + New piece
        </button>
      </div>
    )
  },
)

BackCoverPage.displayName = 'BackCoverPage'
