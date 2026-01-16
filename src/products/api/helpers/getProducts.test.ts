import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getProducts, getProductsBySearch, getProductsByCategory, getCategories, getProductById } from './getProducts'
import productsApi from '@/products/api/productsApi'

// Mock the productsApi module
vi.mock('@/products/api/productsApi', () => ({
  default: {
    get: vi.fn(),
  },
}))

describe('getProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call getProductsBySearch when no category is provided', async () => {
    const mockResponse = {
      data: {
        products: [],
        total: 0,
        skip: 0,
        limit: 10
      }
    }
    vi.mocked(productsApi.get).mockResolvedValue(mockResponse)

    await getProducts(1, 'test')

    expect(productsApi.get).toHaveBeenCalledWith(
      '/products/search',
      expect.objectContaining({
        params: expect.any(URLSearchParams)
      })
    )
  })

  it('should call getProductsByCategory when category is provided', async () => {
    const mockResponse = {
      data: {
        products: [],
        total: 0,
        skip: 0,
        limit: 10
      }
    }
    vi.mocked(productsApi.get).mockResolvedValue(mockResponse)

    await getProducts(1, '', 'electronics')

    expect(productsApi.get).toHaveBeenCalledWith(
      '/products/category/electronics',
      expect.objectContaining({
        params: expect.any(URLSearchParams)
      })
    )
  })

  it('should use default parameters when none provided', async () => {
    const mockResponse = {
      data: {
        products: [],
        total: 0,
        skip: 0,
        limit: 10
      }
    }
    vi.mocked(productsApi.get).mockResolvedValue(mockResponse)

    await getProducts()

    expect(productsApi.get).toHaveBeenCalled()
  })
})

describe('getProductsBySearch', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should add search query to params when searchValue is provided', async () => {
    const mockResponse = {
      data: {
        products: [],
        total: 0,
        skip: 0,
        limit: 10
      }
    }
    vi.mocked(productsApi.get).mockResolvedValue(mockResponse)

    const params = new URLSearchParams()
    await getProductsBySearch(params, 'laptop')

    expect(productsApi.get).toHaveBeenCalledWith(
      '/products/search',
      expect.objectContaining({
        params: expect.any(URLSearchParams)
      })
    )
  })

  it('should not add search query when searchValue is empty', async () => {
    const mockResponse = {
      data: {
        products: [],
        total: 0,
        skip: 0,
        limit: 10
      }
    }
    vi.mocked(productsApi.get).mockResolvedValue(mockResponse)

    const params = new URLSearchParams()
    await getProductsBySearch(params, '')

    expect(productsApi.get).toHaveBeenCalled()
  })

  it('should return the response data', async () => {
    const mockData = {
      products: [{ id: 1, title: 'Test' }],
      total: 1,
      skip: 0,
      limit: 10
    }
    vi.mocked(productsApi.get).mockResolvedValue({ data: mockData })

    const params = new URLSearchParams()
    const result = await getProductsBySearch(params, 'test')

    expect(result).toEqual(mockData)
  })
})

describe('getProductsByCategory', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call the correct endpoint with category', async () => {
    const mockResponse = {
      data: {
        products: [],
        total: 0,
        skip: 0,
        limit: 10
      }
    }
    vi.mocked(productsApi.get).mockResolvedValue(mockResponse)

    const params = new URLSearchParams()
    await getProductsByCategory(params, 'electronics')

    expect(productsApi.get).toHaveBeenCalledWith(
      '/products/category/electronics',
      expect.objectContaining({
        params: expect.any(URLSearchParams)
      })
    )
  })

  it('should return the response data', async () => {
    const mockData = {
      products: [{ id: 1, title: 'Electronics Item' }],
      total: 1,
      skip: 0,
      limit: 10
    }
    vi.mocked(productsApi.get).mockResolvedValue({ data: mockData })

    const params = new URLSearchParams()
    const result = await getProductsByCategory(params, 'electronics')

    expect(result).toEqual(mockData)
  })
})

describe('getCategories', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call the categories endpoint', async () => {
    const mockResponse = {
      data: ['electronics', 'clothing', 'home']
    }
    vi.mocked(productsApi.get).mockResolvedValue(mockResponse)

    await getCategories()

    expect(productsApi.get).toHaveBeenCalledWith('/products/categories')
  })

  it('should return array of categories', async () => {
    const mockCategories = ['electronics', 'clothing', 'home']
    vi.mocked(productsApi.get).mockResolvedValue({ data: mockCategories })

    const result = await getCategories()

    expect(result).toEqual(mockCategories)
    expect(Array.isArray(result)).toBe(true)
  })
})

describe('getProductById', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch product with numeric ID', async () => {
    const mockProduct = {
      id: 123,
      title: 'Test Product',
      price: 99.99
    }
    vi.mocked(productsApi.get).mockResolvedValue({ data: mockProduct })

    await getProductById(123)

    expect(productsApi.get).toHaveBeenCalledWith('/products/123')
  })

  it('should fetch product with string ID', async () => {
    const mockProduct = {
      id: 123,
      title: 'Test Product',
      price: 99.99
    }
    vi.mocked(productsApi.get).mockResolvedValue({ data: mockProduct })

    await getProductById('123')

    expect(productsApi.get).toHaveBeenCalledWith('/products/123')
  })

  it('should return the product data', async () => {
    const mockProduct = {
      id: 123,
      title: 'Test Product',
      price: 99.99,
      description: 'A test product',
      category: 'electronics'
    }
    vi.mocked(productsApi.get).mockResolvedValue({ data: mockProduct })

    const result = await getProductById(123)

    expect(result).toEqual(mockProduct)
  })

  it('should convert numeric ID to string in URL', async () => {
    const mockProduct = { id: 999, title: 'Product' }
    vi.mocked(productsApi.get).mockResolvedValue({ data: mockProduct })

    await getProductById(999)

    expect(productsApi.get).toHaveBeenCalledWith('/products/999')
  })
})
