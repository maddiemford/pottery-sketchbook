interface GutterShadowProps {
  left: number
}

/** Shadow for the spine's gutter, positioned by the caller via a measured
 * pixel `left` since react-pageflip's rendered width isn't known until
 * after layout. */
export function GutterShadow({ left }: GutterShadowProps) {
  return (
    <div
      className="gutter-shadow pointer-events-none absolute inset-y-0 z-[9999]"
      style={{ left }}
    />
  )
}
