import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createProduct } from './createProduct'
import productsApi from '@/products/api/productsApi'
import type { ProductFormData } from '@/products/interfaces'

// Mock the productsApi module
vi.mock('@/products/api/productsApi', () => ({
  default: {
    post: vi.fn(),
  },
}))

describe('createProduct', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call POST endpoint with product data', async () => {
    const mockProductData: ProductFormData = {
      title: 'New Product',
      price: 99.99,
      description: 'A new product',
      category: 'electronics'
    }

    const mockResponse = {
      data: {
        id: 1,
        ...mockProductData
      }
    }

    vi.mocked(productsApi.post).mockResolvedValue(mockResponse)

    await createProduct(mockProductData)

    expect(productsApi.post).toHaveBeenCalledWith('/products/add', mockProductData)
    expect(productsApi.post).toHaveBeenCalledTimes(1)
  })

  it('should return the created product with ID', async () => {
    const mockProductData: ProductFormData = {
      title: 'Test Product',
      price: 149.99,
      description: 'Test description',
      category: 'clothing'
    }

    const mockCreatedProduct = {
      id: 123,
      ...mockProductData
    }

    vi.mocked(productsApi.post).mockResolvedValue({ data: mockCreatedProduct })

    const result = await createProduct(mockProductData)

    expect(result).toEqual(mockCreatedProduct)
    expect(result.id).toBe(123)
  })

  it('should handle product with all fields', async () => {
    const mockProductData: ProductFormData = {
      title: 'Complete Product',
      price: 299.99,
      description: 'Complete description',
      category: 'home'
    }

    const mockResponse = {
      data: {
        id: 456,
        ...mockProductData,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      }
    }

    vi.mocked(productsApi.post).mockResolvedValue(mockResponse)

    const result = await createProduct(mockProductData)

    expect(result.id).toBeDefined()
    expect(result.title).toBe(mockProductData.title)
    expect(result.price).toBe(mockProductData.price)
  })
})
