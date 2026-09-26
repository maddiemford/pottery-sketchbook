import { forwardRef } from 'react'

interface PageShellProps {
  children: React.ReactNode
  pageNumber?: number
  className?: string
}

export const PageShell = forwardRef<HTMLDivElement, PageShellProps>(
  ({ children, pageNumber, className = '' }, ref) => {
    return (
      <div
        ref={ref}
        className={`paper-page flex h-full w-full flex-col overflow-y-auto border border-stone-300 p-5 shadow-inner sm:p-8 ${className}`}
      >
        <div className="flex-1">{children}</div>
        {pageNumber !== undefined && (
          <div className="mt-4 text-center text-xs text-stone-400">
            {pageNumber}
          </div>
        )}
      </div>
    )
  },
)

PageShell.displayName = 'PageShell'
