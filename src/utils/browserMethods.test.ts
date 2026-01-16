import { describe, it, expect, vi, beforeEach } from 'vitest'
import { copyFromBrowser } from './browserMethods'

describe('copyFromBrowser', () => {
  beforeEach(() => {
    // Mock the clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(),
      },
    })
  })

  it('should copy numeric ID to clipboard as string', () => {
    const id = 12345
    copyFromBrowser(id)

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('12345')
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1)
  })

  it('should handle single digit numbers', () => {
    copyFromBrowser(5)

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('5')
  })

  it('should handle large numbers', () => {
    copyFromBrowser(999999999)

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('999999999')
  })

  it('should handle zero', () => {
    copyFromBrowser(0)

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('0')
  })

  it('should handle negative numbers', () => {
    copyFromBrowser(-123)

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('-123')
  })
})
