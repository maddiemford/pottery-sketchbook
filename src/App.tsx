import { useEffect, useRef, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { AddFiringModal } from './components/AddFiringModal'
import { BackCoverPage } from './components/BackCoverPage'
import { CoverPage } from './components/CoverPage'
import { NewPieceModal } from './components/NewPieceModal'
import { GutterShadow } from './components/GutterShadow'
import { PiecePage } from './components/PiecePage'
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
  const isFlippingRef = useRef(false)
  const measureRef = useRef<() => void>(() => {})
  const [bookBox, setBookBox] = useState<{
    left: number
    width: number
    pageCount: number
    singleItemIsLeftSlot: boolean
  }>({ left: 0, width: 0, pageCount: 0, singleItemIsLeftSlot: false })

  // react-pageflip keeps a full two-slot container even when only a single
  // hard cover is showing, so the spine can't be positioned from that
  // container's own box. Instead, take the union of whichever `.stf__item`
  // page elements are actually visible (their rect collapses to 0 when
  // off-screen) — one item means a single page, two means a spread (spine
  // in the middle). For a single page, react-pageflip can render it in
  // either the "left" or "right" slot depending on page parity, and the
  // true spine is always on the OUTER edge (away from where a second page
  // would sit) — so left-slot pages get the spine on their right, and
  // right-slot (or unpaired) pages get it on their left. This matches the
  // `.cover-content-row` flip in index.css so the strip and shadow agree.
  const GUTTER_WIDTH = 26
  const gutterLeft =
    bookBox.pageCount === 2
      ? bookBox.left + bookBox.width / 2 - GUTTER_WIDTH / 2
      : bookBox.singleItemIsLeftSlot
        ? bookBox.left + bookBox.width - GUTTER_WIDTH
        : bookBox.left

  useEffect(() => {
    savePieces(pieces)
  }, [pieces])

  useEffect(() => {
    const wrapper = bookWrapperRef.current
    if (!wrapper) return

    function measure() {
      // react-pageflip restructures the DOM continuously while a page is
      // mid-flip (curling page, temporary extra items), which makes the
      // "which .stf__item is visible" signal unreliable for that brief
      // window. Rather than chase it and have the shadow flicker/vanish,
      // freeze at the last good position and only re-measure once the
      // flip settles (see the onChangeState handler below).
      if (isFlippingRef.current) return

      const wrapperRect = wrapper!.getBoundingClientRect()
      const visible = Array.from(
        wrapper!.querySelectorAll<HTMLElement>('.stf__item'),
      ).filter((el) => el.getBoundingClientRect().width > 0)
      if (visible.length === 0) return

      const rects = visible.map((el) => el.getBoundingClientRect())
      const left = Math.min(...rects.map((r) => r.left)) - wrapperRect.left
      const right = Math.max(...rects.map((r) => r.right)) - wrapperRect.left
      setBookBox({
        left,
        width: right - left,
        pageCount: visible.length,
        singleItemIsLeftSlot:
          visible.length === 1 && visible[0].classList.contains('--left'),
      })
    }

    measureRef.current = measure
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
    <div className="flex min-h-screen flex-col items-center bg-[#e6e5eb] px-4 py-6">
      <header className="mb-6 flex w-full max-w-3xl items-center justify-end">
        <button
          onClick={() => setShowNewPiece(true)}
          className="rounded-full bg-[#f2545b] px-4 py-2 text-sm font-medium text-white hover:bg-[#c73f47]"
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
          onChangeState={(e: any) => {
            isFlippingRef.current = e.data !== 'read'
            if (!isFlippingRef.current) measureRef.current()
          }}
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
        {bookBox.width > 0 && <GutterShadow left={gutterLeft} />}
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
