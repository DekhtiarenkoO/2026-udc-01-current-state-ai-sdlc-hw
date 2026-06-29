"use client"

import { useState, KeyboardEvent, ClipboardEvent } from 'react'
import { mpgToL100km } from '@/utils/mpgConverter'

export function MpgCalculator() {
  const [inputValue, setInputValue] = useState('')

  const hasSeparator = (value: string) => /[.,]/.test(value)

  const decimalsAfterSeparator = (value: string) => {
    const match = value.match(/[.,](\d*)$/)
    return match ? match[1].length : 0
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowHome', 'ArrowEnd', 'Tab']
    if (allowed.includes(e.key)) return

    if (/^\d$/.test(e.key)) {
      if (hasSeparator(inputValue) && decimalsAfterSeparator(inputValue) >= 2) {
        e.preventDefault()
      }
      return
    }

    if (e.key === ',' || e.key === '.') {
      if (hasSeparator(inputValue)) e.preventDefault()
      return
    }

    e.preventDefault()
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text')
    const cleaned = pasted.replace(/[^0-9.,]/g, '')
    const normalized = cleaned.replace(',', '.')

    const parts = normalized.split('.')
    if (parts.length > 2) return

    const truncated = parts.length === 2
      ? `${parts[0]}.${parts[1].slice(0, 2)}`
      : parts[0]

    const current = inputValue
    if (hasSeparator(current) && /[.,]/.test(truncated)) return

    const combined = current + truncated.replace('.', hasSeparator(current) ? '' : ',')
    setInputValue(combined)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const getResult = (): string | null => {
    if (inputValue === '') return null
    const normalized = inputValue.replace(',', '.')
    const mpg = parseFloat(normalized)
    if (isNaN(mpg)) return null
    return mpgToL100km(mpg).toFixed(2)
  }

  const result = getResult()

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <h1 className="text-2xl font-semibold">MPG → L/100km</h1>
      <div className="flex flex-col items-center gap-2">
        <label htmlFor="mpg-input" className="text-sm text-gray-500">
          Enter fuel efficiency (MPG)
        </label>
        <input
          id="mpg-input"
          type="text"
          inputMode="decimal"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder="e.g. 30"
          className="border border-gray-300 rounded-lg px-4 py-2 text-center text-xl w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {result !== null && (
        <div className="flex flex-col items-center gap-1">
          <span className="text-7xl font-bold">{result}</span>
          <span className="text-gray-500 text-sm">L/100km</span>
        </div>
      )}
    </div>
  )
}
