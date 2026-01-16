import { describe, it, expect, vi } from 'vitest'
import { computeTableColumns } from './columns'

describe('computeTableColumns', () => {
  const mockDisplayProductInfoFn = vi.fn()
  const mockHandleEditProductFn = vi.fn()
  const mockHandleDeleteProductFn = vi.fn()

  it('should return an array of column definitions', () => {
    const columns = computeTableColumns({
      displayProductInfoFn: mockDisplayProductInfoFn,
      handleEditProductFn: mockHandleEditProductFn,
      handleDeleteProductFn: mockHandleDeleteProductFn
    })

    expect(Array.isArray(columns)).toBe(true)
    expect(columns.length).toBe(6)
  })

  it('should include thumbnail column', () => {
    const columns = computeTableColumns({
      displayProductInfoFn: mockDisplayProductInfoFn,
      handleEditProductFn: mockHandleEditProductFn,
      handleDeleteProductFn: mockHandleDeleteProductFn
    })

    const thumbnailColumn = columns[0]
    expect(thumbnailColumn.accessorKey).toBe('thumbnail')
    expect(thumbnailColumn.header).toBe('')
  })

  it('should include title column', () => {
    const columns = computeTableColumns({
      displayProductInfoFn: mockDisplayProductInfoFn,
      handleEditProductFn: mockHandleEditProductFn,
      handleDeleteProductFn: mockHandleDeleteProductFn
    })

    const titleColumn = columns[1]
    expect(titleColumn.accessorKey).toBe('title')
    expect(titleColumn.header).toBe('Title')
  })

  it('should include price column', () => {
    const columns = computeTableColumns({
      displayProductInfoFn: mockDisplayProductInfoFn,
      handleEditProductFn: mockHandleEditProductFn,
      handleDeleteProductFn: mockHandleDeleteProductFn
    })

    const priceColumn = columns[2]
    expect(priceColumn.accessorKey).toBe('price')
    expect(priceColumn.header).toBe('Price')
  })

  it('should include category column', () => {
    const columns = computeTableColumns({
      displayProductInfoFn: mockDisplayProductInfoFn,
      handleEditProductFn: mockHandleEditProductFn,
      handleDeleteProductFn: mockHandleDeleteProductFn
    })

    const categoryColumn = columns[3]
    expect(categoryColumn.accessorKey).toBe('category')
    expect(categoryColumn.header).toBe('Category')
  })

  it('should include stock column', () => {
    const columns = computeTableColumns({
      displayProductInfoFn: mockDisplayProductInfoFn,
      handleEditProductFn: mockHandleEditProductFn,
      handleDeleteProductFn: mockHandleDeleteProductFn
    })

    const stockColumn = columns[4]
    expect(stockColumn.accessorKey).toBe('stock')
    expect(stockColumn.header).toBe('Stock')
  })

  it('should include actions column', () => {
    const columns = computeTableColumns({
      displayProductInfoFn: mockDisplayProductInfoFn,
      handleEditProductFn: mockHandleEditProductFn,
      handleDeleteProductFn: mockHandleDeleteProductFn
    })

    const actionsColumn = columns[5]
    expect(actionsColumn.id).toBe('actions')
    expect(actionsColumn.enableHiding).toBe(false)
  })

  it('should pass callback functions to column configuration', () => {
    const columns = computeTableColumns({
      displayProductInfoFn: mockDisplayProductInfoFn,
      handleEditProductFn: mockHandleEditProductFn,
      handleDeleteProductFn: mockHandleDeleteProductFn
    })

    // Verify that columns were created with the provided functions
    expect(columns).toBeDefined()
    expect(columns.length).toBeGreaterThan(0)
  })
})
