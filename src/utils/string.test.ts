import { describe, it, expect } from 'vitest'
import { capitalizeFirstLetter, kebabCaseToTitleCase } from './string'

describe('capitalizeFirstLetter', () => {
  it('should capitalize the first letter of a lowercase string', () => {
    expect(capitalizeFirstLetter('hello')).toBe('Hello')
    expect(capitalizeFirstLetter('world')).toBe('World')
  })

  it('should keep already capitalized strings unchanged', () => {
    expect(capitalizeFirstLetter('Hello')).toBe('Hello')
    expect(capitalizeFirstLetter('World')).toBe('World')
  })

  it('should handle single character strings', () => {
    expect(capitalizeFirstLetter('a')).toBe('A')
    expect(capitalizeFirstLetter('z')).toBe('Z')
  })

  it('should handle empty strings', () => {
    expect(capitalizeFirstLetter('')).toBe('')
  })

  it('should only capitalize the first letter and leave the rest unchanged', () => {
    expect(capitalizeFirstLetter('hELLO')).toBe('HELLO')
    expect(capitalizeFirstLetter('wOrLd')).toBe('WOrLd')
  })

  it('should handle strings with numbers', () => {
    expect(capitalizeFirstLetter('123abc')).toBe('123abc')
  })
})

describe('kebabCaseToTitleCase', () => {
  it('should convert kebab-case to Title Case', () => {
    expect(kebabCaseToTitleCase('hello-world')).toBe('Hello World')
    expect(kebabCaseToTitleCase('product-category')).toBe('Product Category')
  })

  it('should handle single word (no hyphens)', () => {
    expect(kebabCaseToTitleCase('hello')).toBe('Hello')
    expect(kebabCaseToTitleCase('world')).toBe('World')
  })

  it('should handle multiple hyphens', () => {
    expect(kebabCaseToTitleCase('this-is-a-test')).toBe('This Is A Test')
    expect(kebabCaseToTitleCase('foo-bar-baz-qux')).toBe('Foo Bar Baz Qux')
  })

  it('should handle empty strings', () => {
    expect(kebabCaseToTitleCase('')).toBe('')
  })

  it('should handle single character', () => {
    expect(kebabCaseToTitleCase('a')).toBe('A')
  })

  it('should handle already title case strings', () => {
    expect(kebabCaseToTitleCase('Hello-World')).toBe('Hello World')
  })

  it('should handle consecutive hyphens', () => {
    expect(kebabCaseToTitleCase('hello--world')).toBe('Hello  World')
  })
})
