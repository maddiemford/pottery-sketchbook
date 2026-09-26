const PALETTE = [
  '#f2545b', // lobster pink
  '#4b4a67', // vintage grape, matches the spine
  '#537a5a', // fern
  '#312509', // deep walnut
  '#8f8fa0', // pale slate, darkened for contrast with the text
  '#c73f47', // darker pink
  '#3a3950', // darker grape
]

const FONTS = [
  'Anton',
  'Permanent Marker',
  'Special Elite',
  'Caveat',
  'Bangers',
]

function hash(input: string): number {
  let h = 0
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0
  }
  return h
}

interface ScrapbookTitleProps {
  text: string
  className?: string
}

function Letter({ char, seedKey }: { char: string; seedKey: string }) {
  const seed = hash(seedKey)
  const color = PALETTE[seed % PALETTE.length]
  const font = FONTS[Math.floor(seed / PALETTE.length) % FONTS.length]
  const rotation = (seed % 17) - 8
  const translateY = (Math.floor(seed / 17) % 7) - 3

  return (
    <span
      className="mx-[1px] my-[3px] inline-flex items-center justify-center rounded-sm px-1 py-0.5 text-lg leading-none shadow-md sm:px-1.5 sm:text-2xl"
      style={{
        backgroundColor: color,
        color: '#f3ede1',
        fontFamily: `'${font}', cursive`,
        transform: `rotate(${rotation}deg) translateY(${translateY}px)`,
      }}
    >
      {char.toUpperCase()}
    </span>
  )
}

/** Renders text as ransom-note-style cutout letters: each one a different
 * scrap of "paper" with its own color, font, and slight tilt. Styling is
 * seeded from the character + position so it's stable across re-renders
 * instead of reshuffling on every render. Wraps whole words onto new lines
 * rather than breaking mid-word. */
export function ScrapbookTitle({ text, className = '' }: ScrapbookTitleProps) {
  const words = text.split(' ')

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {words.map((word, wordIndex) => (
        <div key={wordIndex} className="flex flex-wrap justify-center">
          {word.split('').map((char, i) => (
            <Letter key={i} char={char} seedKey={`${wordIndex}-${char}${i}`} />
          ))}
        </div>
      ))}
    </div>
  )
}
