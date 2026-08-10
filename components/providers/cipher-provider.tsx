"use client"

import type React from "react"
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import type { CipherMode } from "@/lib/cipher"
import { encode } from "@/lib/cipher"

const STORAGE_KEY = "utkarshreads-language"

/** Subtrees whose text must stay readable, or that are not prose at all. */
const SKIP_SELECTOR = "script,style,noscript,svg,code,pre,[data-cipher-skip]"

interface CipherContextValue {
  mode: CipherMode
  setMode: (mode: CipherMode) => void
}

const CipherContext = createContext<CipherContextValue | undefined>(undefined)

export function CipherProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<CipherMode>("en")

  // The English source for every text node we have touched. Weak so nodes
  // dropped by React are collected with it.
  const originals = useRef<WeakMap<Text, string>>(new WeakMap())
  const observer = useRef<MutationObserver | null>(null)
  const modeRef = useRef<CipherMode>(mode)

  modeRef.current = mode

  const collect = useCallback(() => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT
        const parent = (node as Text).parentElement
        if (!parent || parent.closest(SKIP_SELECTOR)) return NodeFilter.FILTER_REJECT
        return NodeFilter.FILTER_ACCEPT
      },
    })

    const nodes: Text[] = []
    while (walker.nextNode()) nodes.push(walker.currentNode as Text)
    return nodes
  }, [])

  const apply = useCallback(
    (next: CipherMode) => {
      // Detach first so our own writes do not come back through the observer.
      observer.current?.disconnect()

      for (const node of collect()) {
        if (!originals.current.has(node)) {
          originals.current.set(node, node.nodeValue ?? "")
        }
        const source = originals.current.get(node) ?? ""
        const encoded = encode(source, next)
        if (node.nodeValue !== encoded) node.nodeValue = encoded
      }

      document.documentElement.classList.toggle("cipher-active", next !== "en")

      if (observer.current) {
        observer.current.takeRecords()
        observer.current.observe(document.body, {
          childList: true,
          subtree: true,
          characterData: true,
        })
      }
    },
    [collect],
  )

  // Restore the last choice once the DOM exists. Deliberately not done during
  // render: the server always sends English, so hydration stays clean.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as CipherMode | null
    if (stored === "morse" || stored === "binary") setMode(stored)
  }, [])

  useEffect(() => {
    observer.current = new MutationObserver((records) => {
      // Anything arriving here is React's work, not ours — we detach while
      // writing. A changed text node means its English source moved on, so
      // adopt the new value before re-encoding.
      for (const record of records) {
        if (record.type === "characterData" && record.target.nodeType === Node.TEXT_NODE) {
          originals.current.set(record.target as Text, record.target.nodeValue ?? "")
        }
      }
      if (modeRef.current !== "en") apply(modeRef.current)
    })

    apply(mode)

    return () => {
      observer.current?.disconnect()
      observer.current = null
    }
  }, [mode, apply])

  const change = useCallback((next: CipherMode) => {
    window.localStorage.setItem(STORAGE_KEY, next)
    setMode(next)
  }, [])

  return (
    <CipherContext.Provider value={{ mode, setMode: change }}>{children}</CipherContext.Provider>
  )
}

export function useCipher() {
  const context = useContext(CipherContext)
  if (context === undefined) {
    throw new Error("useCipher must be used within a CipherProvider")
  }
  return context
}
