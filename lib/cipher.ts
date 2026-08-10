export type CipherMode =
  | "en"
  | "morse"
  | "binary"
  | "hex"
  | "base64"
  | "rot13"
  | "leet"
  | "nato"

export const cipherModes: { value: CipherMode; label: string }[] = [
  { value: "en", label: "English" },
  { value: "morse", label: "Morse" },
  { value: "binary", label: "Binary" },
  { value: "hex", label: "Hex" },
  { value: "base64", label: "Base64" },
  { value: "rot13", label: "ROT13" },
  { value: "leet", label: "Leetspeak" },
  { value: "nato", label: "NATO" },
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

/** Code points as uppercase hex, the way a memory dump reads. */
export function toHex(input: string): string {
  return words(input)
    .map((word) =>
      Array.from(word)
        .map((char) =>
          (char.codePointAt(0) ?? 0).toString(16).toUpperCase().padStart(2, "0"),
        )
        .join(" "),
    )
    .join("  ")
}

/** UTF-8 then base64, so non-ASCII survives the round trip. */
export function toBase64(input: string): string {
  const bytes = new TextEncoder().encode(input)
  let binary = ""
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary)
}

/** The usenet classic: rotate letters by 13, leave everything else alone. */
export function toRot13(input: string): string {
  return input.replace(/[a-z]/gi, (char) => {
    const base = char <= "Z" ? 65 : 97
    return String.fromCharCode(((char.charCodeAt(0) - base + 13) % 26) + base)
  })
}

const LEET: Record<string, string> = {
  a: "4",
  b: "8",
  e: "3",
  g: "6",
  i: "1",
  l: "1",
  o: "0",
  s: "5",
  t: "7",
  z: "2",
}

/** Still readable, just badly. */
export function toLeet(input: string): string {
  return Array.from(input)
    .map((char) => LEET[char.toLowerCase()] ?? char)
    .join("")
}

const NATO: Record<string, string> = {
  a: "Alfa",
  b: "Bravo",
  c: "Charlie",
  d: "Delta",
  e: "Echo",
  f: "Foxtrot",
  g: "Golf",
  h: "Hotel",
  i: "India",
  j: "Juliett",
  k: "Kilo",
  l: "Lima",
  m: "Mike",
  n: "November",
  o: "Oscar",
  p: "Papa",
  q: "Quebec",
  r: "Romeo",
  s: "Sierra",
  t: "Tango",
  u: "Uniform",
  v: "Victor",
  w: "Whiskey",
  x: "Xray",
  y: "Yankee",
  z: "Zulu",
  "0": "Zero",
  "1": "One",
  "2": "Two",
  "3": "Three",
  "4": "Four",
  "5": "Five",
  "6": "Six",
  "7": "Seven",
  "8": "Eight",
  "9": "Niner",
}

/** Read it aloud over a bad radio. Morse's talkative cousin. */
export function toNato(input: string): string {
  return words(input)
    .map((word) =>
      Array.from(word)
        .map((char) => NATO[char.toLowerCase()] ?? char)
        .join(" "),
    )
    .join(" / ")
}

const TRANSFORMS: Record<Exclude<CipherMode, "en">, (input: string) => string> = {
  morse: toMorse,
  binary: toBinary,
  hex: toHex,
  base64: toBase64,
  rot13: toRot13,
  leet: toLeet,
  nato: toNato,
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

  return `${leading}${TRANSFORMS[mode](input.trim())}${trailing}`
}
