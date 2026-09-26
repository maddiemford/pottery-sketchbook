import { useEffect, useRef, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { AddFiringModal } from './components/AddFiringModal'
import { BackCoverPage } from './components/BackCoverPage'
import { CoverPage } from './components/CoverPage'
import { NewPieceModal } from './components/NewPieceModal'
import { PiecePage } from './components/PiecePage'
import { SpiralBinding } from './components/SpiralBinding'
import { loadPieces, savePieces } from './data/storage'
import type { Firing, Piece } from './types/piece'

// react-pageflip's types require every setting even though the component
// works fine with sensible defaults for the ones we don't care about.
const flipBookDefaults = {
  startPage: 0,
  minWidth: 280,
  maxWidth: 520,
  minHeight: 400,
  maxHeight: 720,
  drawShadow: true,
  flippingTime: 500,
  startZIndex: 0,
  autoSize: true,
  maxShadowOpacity: 0.5,
  mobileScrollSupport: false,
  clickEventForward: true,
  useMouseEvents: true,
  swipeDistance: 30,
  showPageCorners: true,
  disableFlipByClick: false,
}

function App() {
  const [pieces, setPieces] = useState<Piece[]>(() => loadPieces())
  const [showNewPiece, setShowNewPiece] = useState(false)
  const [firingForPieceId, setFiringForPieceId] = useState<string | null>(
    null,
  )
  const bookRef = useRef<any>(null)
  const bookWrapperRef = useRef<HTMLDivElement>(null)
  const [bookBox, setBookBox] = useState<{
    left: number
    width: number
    pageCount: number
  }>({ left: 0, width: 0, pageCount: 0 })

  // react-pageflip keeps a full two-slot container even when only a single
  // hard cover is showing, so the spine can't be positioned from that
  // container's own box. Instead, take the union of whichever `.stf__item`
  // page elements are actually visible (their rect collapses to 0 when
  // off-screen) — one item means a single page (spine at its left edge),
  // two means a spread (spine in the middle).
  const spiralLeft =
    bookBox.pageCount === 2
      ? bookBox.left + bookBox.width / 2 - 17
      : bookBox.left

  useEffect(() => {
    savePieces(pieces)
  }, [pieces])

  useEffect(() => {
    const wrapper = bookWrapperRef.current
    if (!wrapper) return

    function measure() {
      const wrapperRect = wrapper!.getBoundingClientRect()
      const rects = Array.from(
        wrapper!.querySelectorAll<HTMLElement>('.stf__item'),
      )
        .map((el) => el.getBoundingClientRect())
        .filter((r) => r.width > 0)
      if (rects.length === 0) return

      const left = Math.min(...rects.map((r) => r.left)) - wrapperRect.left
      const right = Math.max(...rects.map((r) => r.right)) - wrapperRect.left
      setBookBox({ left, width: right - left, pageCount: rects.length })
    }

    measure()
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(wrapper)
    const mutationObserver = new MutationObserver(measure)
    mutationObserver.observe(wrapper, {
      attributes: true,
      attributeFilter: ['style', 'class'],
      subtree: true,
    })
    return () => {
      resizeObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [pieces.length])

  function handleCreatePiece(piece: Piece) {
    setPieces((prev) => [...prev, piece])
    setShowNewPiece(false)
    // jump to the freshly added page once the book re-renders
    setTimeout(() => {
      bookRef.current?.pageFlip()?.flip(pieces.length + 1)
    }, 0)
  }

  function handleAddFiring(firing: Firing) {
    if (!firingForPieceId) return
    setPieces((prev) =>
      prev.map((p) =>
        p.id === firingForPieceId
          ? { ...p, firings: [...p.firings, firing] }
          : p,
      ),
    )
    setFiringForPieceId(null)
  }

  const firingTargetPiece = pieces.find((p) => p.id === firingForPieceId)

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#d9cdbb] px-4 py-6">
      <header className="mb-6 flex w-full max-w-3xl items-center justify-between">
        <h1 className="font-serif text-xl text-stone-800 sm:text-2xl">
          🏺 Pottery Sketchbook
        </h1>
        <button
          onClick={() => setShowNewPiece(true)}
          className="rounded-full bg-stone-800 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700"
        >
          + New piece
        </button>
      </header>

      <div ref={bookWrapperRef} className="relative w-full max-w-3xl">
        <HTMLFlipBook
          {...flipBookDefaults}
          ref={bookRef}
          width={360}
          height={520}
          size="stretch"
          usePortrait={true}
          showCover={true}
          className="mx-auto"
          style={{}}
        >
          <CoverPage />
          {pieces.map((piece, i) => (
            <PiecePage
              key={piece.id}
              piece={piece}
              pageNumber={i + 1}
              onAddFiring={setFiringForPieceId}
            />
          ))}
          <BackCoverPage onAddPiece={() => setShowNewPiece(true)} />
        </HTMLFlipBook>
        {bookBox.width > 0 && <SpiralBinding left={spiralLeft} />}
      </div>

      {showNewPiece && (
        <NewPieceModal
          onClose={() => setShowNewPiece(false)}
          onCreate={handleCreatePiece}
        />
      )}

      {firingTargetPiece && (
        <AddFiringModal
          pieceTitle={firingTargetPiece.title}
          onClose={() => setFiringForPieceId(null)}
          onAdd={handleAddFiring}
        />
      )}
    </div>
  )
}

export default App
