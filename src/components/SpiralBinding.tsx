interface SpiralBindingProps {
  left: number
}

/** Metal coil binding, positioned by the caller via a measured pixel `left`
 * since react-pageflip's rendered width isn't known until after layout. */
export function SpiralBinding({ left }: SpiralBindingProps) {
  return (
    <div
      className="spiral-binding pointer-events-none absolute inset-y-0 z-[9999]"
      style={{ left }}
    />
  )
}
