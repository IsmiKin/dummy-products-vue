import { describe, it, expect, vi, beforeEach } from 'vitest'
import { deleteProduct } from './deleteProduct'
import productsApi from '@/products/api/productsApi'

// Mock the productsApi module
vi.mock('@/products/api/productsApi', () => ({
  default: {
    delete: vi.fn(),
  },
}))

describe('deleteProduct', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call DELETE endpoint with product ID', async () => {
    const mockResponse = {
      data: {
        id: 123,
        title: 'Deleted Product',
        isDeleted: true
      }
    }

    vi.mocked(productsApi.delete).mockResolvedValue(mockResponse)

    await deleteProduct(123)

    expect(productsApi.delete).toHaveBeenCalledWith('products/123')
    expect(productsApi.delete).toHaveBeenCalledTimes(1)
  })

  it('should return the deleted product data', async () => {
    const mockDeletedProduct = {
      id: 456,
      title: 'Test Product',
      price: 99.99,
      description: 'Test',
      category: 'electronics'
    }

    vi.mocked(productsApi.delete).mockResolvedValue({ data: mockDeletedProduct })

    const result = await deleteProduct(456)

    expect(result).toEqual(mockDeletedProduct)
    expect(result.id).toBe(456)
  })

  it('should handle different product IDs', async () => {
    const mockResponse1 = { data: { id: 1, title: 'Product 1' } }
    const mockResponse2 = { data: { id: 999, title: 'Product 999' } }

    vi.mocked(productsApi.delete).mockResolvedValue(mockResponse1)
    await deleteProduct(1)
    expect(productsApi.delete).toHaveBeenCalledWith('products/1')

    vi.mocked(productsApi.delete).mockResolvedValue(mockResponse2)
    await deleteProduct(999)
    expect(productsApi.delete).toHaveBeenCalledWith('products/999')
  })

  it('should handle single digit IDs', async () => {
    const mockResponse = { data: { id: 5, title: 'Product 5' } }
    vi.mocked(productsApi.delete).mockResolvedValue(mockResponse)

    await deleteProduct(5)

    expect(productsApi.delete).toHaveBeenCalledWith('products/5')
  })

  it('should handle large IDs', async () => {
    const mockResponse = { data: { id: 999999, title: 'Product 999999' } }
    vi.mocked(productsApi.delete).mockResolvedValue(mockResponse)

    await deleteProduct(999999)

    expect(productsApi.delete).toHaveBeenCalledWith('products/999999')
  })
})
