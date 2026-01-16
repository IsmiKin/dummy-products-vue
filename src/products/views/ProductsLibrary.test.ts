import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ProductsLibrary from './ProductsLibrary.vue';
import { mockProductsList, mockCategories, mockProduct } from '@/products/mocks/products';

// Mock Composables
const mockUseProducts = {
  products: { value: mockProductsList, __v_isRef: true },
  isLoading: { value: false, __v_isRef: true },
  isError: { value: false, __v_isRef: true },
  error: { value: null, __v_isRef: true },
  goToPage: vi.fn(),
  searchValue: { value: '', __v_isRef: true },
  setSearchValue: vi.fn(),
  createProduct: vi.fn(),
  updateProduct: vi.fn(),
  deleteProduct: vi.fn(),
  getProductById: vi.fn().mockReturnValue(mockProduct),
};

const mockUseCategories = {
  categories: { value: mockCategories, __v_isRef: true },
  categorySelected: { value: '', __v_isRef: true },
  setCategorySelected: vi.fn(),
};

const mockUseProduct = {
  data: { value: mockProduct, __v_isRef: true },
};

vi.mock('@/products/composables/useProducts', () => ({
  useProducts: () => mockUseProducts
}));

vi.mock('@/products/composables/useCategories', () => ({
  useCategories: () => mockUseCategories
}));

vi.mock('@/products/composables/useProduct', () => ({
  useProduct: () => mockUseProduct
}));

vi.mock('@/shared/constants/appConfigSettings', () => ({
  APP_CONFIG_SETTINGS: {
    PRODUCTS_LIST_DEFAULT_LIMIT: 10
  }
}));

// Mock Child Components
vi.mock('@/products/components/ProductsTable/ProductsTable.vue', () => ({
  default: { template: '<div class="mock-table"></div>', props: ['data', 'columns'] }
}));

vi.mock('@/products/components/ProductsTableSkeleton.vue/ProductsTableSkeleton.vue', () => ({
  default: { template: '<div class="mock-skeleton"></div>' }
}));

vi.mock('@/products/components/ProductsTableFilters/ProductsTableFilters.vue', () => ({
  default: {
    template: '<div class="mock-filters"></div>',
    props: ['categories', 'categorySelected', 'searchValue'],
    emits: ['update:search-value', 'update:category-selected']
  }
}));

vi.mock('@/products/components/ProductsInfoSheet/ProductsInfoSheet.vue', () => ({
  default: { template: '<div class="mock-sheet"></div>', props: ['product', 'isOpen'], emits: ['update:isOpen', 'edit-product'] }
}));

vi.mock('@/products/components/ProductModal/ProductModal.vue', () => ({
  default: { template: '<div class="mock-product-modal"></div>', props: ['isOpen', 'product', 'categories'], emits: ['create-product', 'update-product', 'update:isOpen'] }
}));

vi.mock('@/components/AlertModal/AlertModal.vue', () => ({
  default: { template: '<div class="mock-alert-modal"></div>', props: ['open'], emits: ['update:open'] }
}));

vi.mock('@/components/ui/button/Button.vue', () => ({
  default: { template: '<button>Add Product</button>' }
}));

describe('ProductsLibrary', () => {
  it('should render correctly', () => {
    const wrapper = mount(ProductsLibrary);
    expect(wrapper.find('h1').text()).toBe('Products');
    expect(wrapper.find('.mock-filters').exists()).toBe(true);
    expect(wrapper.find('.mock-table').exists()).toBe(true);
  });

  it('should show skeleton when loading', async () => {
    mockUseProducts.isLoading.value = true;
    const wrapper = mount(ProductsLibrary);
    expect(wrapper.find('.mock-skeleton').exists()).toBe(true);
    expect(wrapper.find('.mock-table').exists()).toBe(false);
    mockUseProducts.isLoading.value = false; // Reset
  });

  it('should handle search change', async () => {
    const wrapper = mount(ProductsLibrary);
    const filters = wrapper.findComponent('.mock-filters');

    // Test event handling
    filters.vm.$emit('update:search-value', 'test search');
    expect(mockUseProducts.setSearchValue).toHaveBeenCalledWith('test search');
    expect(mockUseProducts.goToPage).toHaveBeenCalledWith(1); // Should reset page
  });

  it('should handle category change', async () => {
    const wrapper = mount(ProductsLibrary);
    const filters = wrapper.findComponent('.mock-filters');

    filters.vm.$emit('update:category-selected', 'clothing');
    expect(mockUseCategories.setCategorySelected).toHaveBeenCalledWith('clothing');
    expect(mockUseProducts.goToPage).toHaveBeenCalledWith(1);
  });
});
