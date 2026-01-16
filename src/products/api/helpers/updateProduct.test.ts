import { describe, it, expect, vi, beforeEach } from 'vitest'
import { updateProduct } from './updateProduct'
import productsApi from '@/products/api/productsApi'
import type { ProductFormData } from '@/products/interfaces'

// Mock the productsApi module
vi.mock('@/products/api/productsApi', () => ({
  default: {
    patch: vi.fn(),
  },
}))

describe('updateProduct', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call PATCH endpoint with product data and ID in URL', async () => {
    const mockProductData: ProductFormData & { id: number } = {
      id: 123,
      title: 'Updated Product',
      price: 199.99,
      description: 'Updated description',
      category: 'electronics'
    }

    const mockResponse = {
      data: mockProductData
    }

    vi.mocked(productsApi.patch).mockResolvedValue(mockResponse)

    await updateProduct(mockProductData)

    // Verify ID is in URL and not in body
    expect(productsApi.patch).toHaveBeenCalledWith(
      '/products/123',
      {
        title: 'Updated Product',
        price: 199.99,
        description: 'Updated description',
        category: 'electronics'
      }
    )
    expect(productsApi.patch).toHaveBeenCalledTimes(1)
  })

  it('should exclude ID from request body', async () => {
    const mockProductData: ProductFormData & { id: number } = {
      id: 456,
      title: 'Test Product',
      price: 99.99,
      description: 'Test',
      category: 'clothing'
    }

    vi.mocked(productsApi.patch).mockResolvedValue({ data: mockProductData })

    await updateProduct(mockProductData)

    const callArgs = vi.mocked(productsApi.patch).mock.calls[0]
    const requestBody = callArgs[1]

    // Verify ID is not in the body
    expect(requestBody).not.toHaveProperty('id')
    expect(requestBody).toHaveProperty('title')
    expect(requestBody).toHaveProperty('price')
  })

  it('should return the updated product', async () => {
    const mockProductData: ProductFormData & { id: number } = {
      id: 789,
      title: 'Updated Title',
      price: 299.99,
      description: 'Updated desc',
      category: 'home'
    }

    const mockUpdatedProduct = {
      ...mockProductData,
      updatedAt: '2024-01-01'
    }

    vi.mocked(productsApi.patch).mockResolvedValue({ data: mockUpdatedProduct })

    const result = await updateProduct(mockProductData)

    expect(result).toEqual(mockUpdatedProduct)
    expect(result.id).toBe(789)
    expect(result.title).toBe('Updated Title')
  })

  it('should handle different product IDs correctly', async () => {
    const product1 = {
      id: 1,
      title: 'Product 1',
      price: 10,
      description: 'Desc 1',
      category: 'cat1'
    }

    const product2 = {
      id: 999,
      title: 'Product 999',
      price: 999,
      description: 'Desc 999',
      category: 'cat999'
    }

    vi.mocked(productsApi.patch).mockResolvedValue({ data: product1 })
    await updateProduct(product1)
    expect(productsApi.patch).toHaveBeenCalledWith('/products/1', expect.any(Object))

    vi.mocked(productsApi.patch).mockResolvedValue({ data: product2 })
    await updateProduct(product2)
    expect(productsApi.patch).toHaveBeenCalledWith('/products/999', expect.any(Object))
  })
})
