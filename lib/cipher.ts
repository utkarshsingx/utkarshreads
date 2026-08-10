export type CipherMode = "en" | "morse" | "binary"

export const cipherModes: { value: CipherMode; label: string }[] = [
  { value: "en", label: "English" },
  { value: "morse", label: "Morse" },
  { value: "binary", label: "Binary" },
]

const MORSE: Record<string, string> = {
  a: ".-",
  b: "-...",
  c: "-.-.",
  d: "-..",
  e: ".",
  f: "..-.",
  g: "--.",
  h: "....",
  i: "..",
  j: ".---",
  k: "-.-",
  l: ".-..",
  m: "--",
  n: "-.",
  o: "---",
  p: ".--.",
  q: "--.-",
  r: ".-.",
  s: "...",
  t: "-",
  u: "..-",
  v: "...-",
  w: ".--",
  x: "-..-",
  y: "-.--",
  z: "--..",
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "'": ".----.",
  "!": "-.-.--",
  "/": "-..-.",
  "(": "-.--.",
  ")": "-.--.-",
  "&": ".-...",
  ":": "---...",
  ";": "-.-.-.",
  "=": "-...-",
  "+": ".-.-.",
  "-": "-....-",
  _: "..--.-",
  '"': ".-..-.",
  $: "...-..-",
  "@": ".--.-.",
}

/** Split on whitespace, keeping the words only. */
function words(input: string): string[] {
  return input.split(/\s+/).filter(Boolean)
}

/**
 * Standard spacing: one space between letters, " / " between words. Anything
 * without a Morse equivalent (emoji, Devanagari, stray symbols) is passed
 * through so the text does not silently lose characters.
 */
export function toMorse(input: string): string {
  return words(input)
    .map((word) =>
      Array.from(word)
        .map((char) => MORSE[char.toLowerCase()] ?? char)
        .join(" "),
    )
    .join(" / ")
}

/**
 * Each character as its code point in binary — 8 bits for ASCII, 16 for
 * anything above it. Letters separated by a space, words by two.
 */
export function toBinary(input: string): string {
  return words(input)
    .map((word) =>
      Array.from(word)
        .map((char) => {
          const code = char.codePointAt(0) ?? 0
          const width = code > 0xff ? 16 : 8
          return code.toString(2).padStart(width, "0")
        })
        .join(" "),
    )
    .join("  ")
}

/**
 * Encode while preserving the original leading and trailing whitespace, so a
 * text node that only supplied the space between two inline elements does not
 * collapse when it is swapped out.
 */
export function encode(input: string, mode: CipherMode): string {
  if (mode === "en") return input
  if (!input.trim()) return input

  const leading = input.match(/^\s*/)?.[0] ?? ""
  const trailing = input.match(/\s*$/)?.[0] ?? ""
  const body = mode === "morse" ? toMorse(input) : toBinary(input)

  return `${leading}${body}${trailing}`
}
