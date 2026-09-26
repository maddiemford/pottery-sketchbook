import { forwardRef } from 'react'

interface BackCoverPageProps {
  onAddPiece: () => void
}

export const BackCoverPage = forwardRef<HTMLDivElement, BackCoverPageProps>(
  ({ onAddPiece }, ref) => {
    return (
      <div
        ref={ref}
        className="paper-noise h-full w-full border border-stone-400 bg-[#cbcbd4]"
      >
        {/* react-pageflip forces `display:block` inline on the ref'd root,
            so the flex row layout has to live one level in. */}
        <div className="cover-content-row flex h-full w-full">
          <div className="spine-strip h-full w-8 flex-shrink-0 sm:w-10" />
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center text-stone-800 sm:p-8">
            <p className="text-sm text-stone-600">End of sketchbook</p>
            <button
              onClick={onAddPiece}
              className="rounded-full bg-[#f2545b] px-5 py-2 text-sm font-medium text-white hover:bg-[#c73f47]"
            >
              + New piece
            </button>
          </div>
        </div>
      </div>
    )
  },
)

BackCoverPage.displayName = 'BackCoverPage'
