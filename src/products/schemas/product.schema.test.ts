import { describe, it, expect } from 'vitest';
import { ProductSchema, ProductBasicSchema, ProductsCategoriesSchema } from './product.schema';
import { mockProduct, mockCategories } from '@/products/mocks/products';

describe('Product Schemas', () => {
  it('should validate a correct full product', () => {
    const result = ProductSchema.safeParse(mockProduct);
    expect(result.success).toBe(true);
  });

  it('should validate a correct basic product (including stock)', () => {
    const basicProductWithStock = {
      id: 1,
      title: 'Test Product',
      price: 99.99,
      category: 'electronics',
      thumbnail: 'https://example.com/thumbnail.jpg',
      stock: 50 // Added stock
    };
    const result = ProductBasicSchema.safeParse(basicProductWithStock);
    expect(result.success).toBe(true);
  });

  it('should validate categories list', () => {
    const result = ProductsCategoriesSchema.safeParse(mockCategories);
    expect(result.success).toBe(true);
  });

  it('should fail on invalid product data', () => {
    const invalidProduct = { ...mockProduct, price: 'not-a-number' };
    const result = ProductSchema.safeParse(invalidProduct);
    expect(result.success).toBe(false);
  });

  it('should handle string dates correctly', () => {
    const productWithStrings = {
      ...mockProduct,
      meta: {
        ...mockProduct.meta,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
      },
      reviews: [{
        rating: 5,
        comment: 'Great',
        date: '2023-01-01T00:00:00Z',
        reviewerName: 'John',
        reviewerEmail: 'john@example.com'
      }]
    };
    const result = ProductSchema.safeParse(productWithStrings);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.meta.createdAt).toBeInstanceOf(Date);
    }
  });
});
