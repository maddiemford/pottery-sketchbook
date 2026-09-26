import { forwardRef } from 'react'

export const CoverPage = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div
      ref={ref}
      className="h-full w-full border border-stone-400 bg-[#c6b58e]"
    >
      {/* react-pageflip forces `display:block` inline on the ref'd root,
          so the flex row layout has to live one level in. */}
      <div className="cover-content-row flex h-full w-full">
        <div className="h-full w-8 flex-shrink-0 bg-gradient-to-r from-[#a8492f] to-[#c1583c] sm:w-10" />
        <div className="flex flex-1 flex-col items-center justify-center p-6 text-center text-stone-800 sm:p-8">
          <h1 className="font-serif text-2xl tracking-wide sm:text-3xl">
            My Pottery Sketchbook
          </h1>
          <p className="mt-3 text-sm text-stone-600">
            Sketches, clay bodies, firings &amp; glazes
          </p>
        </div>
      </div>
    </div>
  )
})

CoverPage.displayName = 'CoverPage'
