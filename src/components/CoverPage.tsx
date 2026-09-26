import { forwardRef } from 'react'

export const CoverPage = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div
      ref={ref}
      className="flex h-full w-full flex-col items-center justify-center border border-stone-400 bg-gradient-to-br from-stone-700 to-stone-900 p-8 text-center text-stone-50"
    >
      <span className="text-4xl">🏺</span>
      <h1 className="mt-4 font-serif text-2xl tracking-wide sm:text-3xl">
        My Pottery Sketchbook
      </h1>
      <p className="mt-3 text-sm text-stone-300">
        Sketches, clay bodies, firings &amp; glazes
      </p>
    </div>
  )
})

CoverPage.displayName = 'CoverPage'
