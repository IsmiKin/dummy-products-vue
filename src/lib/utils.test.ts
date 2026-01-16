import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('should merge multiple class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('should handle Tailwind CSS conflicts (later class wins)', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('should handle conditional classes with objects', () => {
    expect(cn('foo', { bar: true, baz: false })).toBe('foo bar')
    expect(cn({ 'text-red-500': true, 'text-blue-500': false })).toBe('text-red-500')
  })

  it('should handle array inputs', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar')
    expect(cn(['px-2', 'py-1'], 'px-4')).toBe('py-1 px-4')
  })

  it('should handle undefined and null values', () => {
    expect(cn('foo', undefined, 'bar')).toBe('foo bar')
    expect(cn('foo', null, 'bar')).toBe('foo bar')
  })

  it('should handle empty inputs', () => {
    expect(cn()).toBe('')
    expect(cn('')).toBe('')
  })

  it('should handle complex Tailwind conflicts', () => {
    expect(cn('p-4', 'px-2')).toBe('p-4 px-2')
    expect(cn('px-2', 'p-4')).toBe('p-4')
  })

  it('should handle mixed conditional and static classes', () => {
    const isActive = true
    const isDisabled = false
    expect(cn('base-class', { active: isActive, disabled: isDisabled })).toBe('base-class active')
  })

  it('should handle nested arrays', () => {
    expect(cn(['foo', ['bar', 'baz']])).toBe('foo bar baz')
  })
})
