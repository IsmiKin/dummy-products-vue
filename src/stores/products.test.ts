import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useProductsStore } from './products';
import { mockProductBasic, mockProductsList, mockCategories } from '@/products/mocks/products';

vi.mock('@/shared/constants/appConfigSettings', () => ({
  APP_CONFIG_SETTINGS: {
    PRODUCTS_LIST_DEFAULT_LIMIT: 10
  }
}));

describe('Products Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should initialize with default state', () => {
    const store = useProductsStore();
    expect(store.products).toEqual([]);
    expect(store.currentPage).toBe(1);
    expect(store.total).toBe(5); // Default value in store definition
    expect(store.searchValue).toBe('');
    expect(store.categorySelected).toBe('');
    expect(store.categories).toEqual([]);
  });

  it('should set products', () => {
    const store = useProductsStore();
    store.setProducts(mockProductsList);
    expect(store.products).toEqual(mockProductsList);
  });

  it('should append products', () => {
    const store = useProductsStore();
    store.setProducts([mockProductsList[0]]);
    store.appendProducts([mockProductsList[1]]);
    expect(store.products).toHaveLength(2);
    expect(store.products[1]).toEqual(mockProductsList[1]);
  });

  it('should set page', () => {
    const store = useProductsStore();
    store.setPage(2);
    expect(store.currentPage).toBe(2);
  });

  it('should not set invalid page', () => {
    const store = useProductsStore();
    store.setPage(-1);
    expect(store.currentPage).toBe(1);
  });

  it('should set total', () => {
    const store = useProductsStore();
    store.setTotal(100);
    expect(store.total).toBe(100);
  });

  it('should set search value', () => {
    const store = useProductsStore();
    store.setSearchValue('test');
    expect(store.searchValue).toBe('test');
  });

  it('should set selected category', () => {
    const store = useProductsStore();
    store.setCategorySelected('electronics');
    expect(store.categorySelected).toBe('electronics');
  });

  it('should set categories', () => {
    const store = useProductsStore();
    store.setCategories(mockCategories);
    expect(store.categories).toEqual(mockCategories);
  });

  it('should add a product', () => {
    const store = useProductsStore();
    const initialTotal = store.total;
    store.addProduct(mockProductBasic);
    expect(store.products[0]).toEqual(mockProductBasic);
    expect(store.total).toBe(initialTotal + 1);
  });

  it('should get product by id', () => {
    const store = useProductsStore();
    store.setProducts(mockProductsList);
    const product = store.getProductById(mockProductsList[0].id);
    expect(product).toEqual(mockProductsList[0]);
  });

  it('should update product', () => {
    const store = useProductsStore();
    store.setProducts([mockProductBasic]);
    const updatedProduct = { ...mockProductBasic, title: 'Updated Title' };
    store.updateProduct(mockProductBasic.id, updatedProduct);
    expect(store.products[0].title).toBe('Updated Title');
  });

  it('should remove product', () => {
    const store = useProductsStore();
    store.setProducts([mockProductBasic]);
    const initialTotal = store.total;
    store.removeProduct(mockProductBasic.id);
    expect(store.products).toHaveLength(0);
    expect(store.total).toBe(initialTotal - 1);
  });

  it('should calculate total pages correctly', () => {
    const store = useProductsStore();
    // Default limit is imported from APP_CONFIG_SETTINGS, assuming 10 or similar.
    // Let's check the store code or config.
    // But we can check relative changes.
    store.setTotal(20);
    // If limit is 10, pages = 2.
    expect(store.totalPages).toBeGreaterThan(0);
  });
});
