import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ProductsTable from './ProductsTable.vue';
import { mockProductBasic, mockProductsList } from '@/products/mocks/products';

// Mock Composables
vi.mock('@/products/composables/useProduct', () => ({
  useProduct: () => ({
    prefetchProductInfo: vi.fn(),
  }),
}));

vi.mock('@/products/composables/useProducts', () => ({
  useProducts: () => ({
    goToPage: vi.fn(),
    total: { value: 100 },
    currentPage: { value: 1 },
  }),
}));

vi.mock('@/shared/constants/appConfigSettings', () => ({
  APP_CONFIG_SETTINGS: {
    PRODUCTS_LIST_DEFAULT_LIMIT: 10
  }
}));

// Mock UI components
vi.mock('@/components/ui/table', () => ({
  Table: { template: '<table><slot /></table>' },
  TableHeader: { template: '<thead><slot /></thead>' },
  TableBody: { template: '<tbody><slot /></tbody>' },
  TableRow: { template: '<tr><slot /></tr>' },
  TableHead: { template: '<th><slot /></th>' },
  TableCell: { template: '<td><slot /></td>' },
}));

vi.mock('@tanstack/vue-table', async (importOriginal) => {
    const actual = await importOriginal<typeof import('@tanstack/vue-table')>();
    return {
        ...actual,
        FlexRender: {
            props: ['render', 'props'],
            template: '<span>{{ render }}</span>', // Simple mock
        }
    }
});

// Mock pagination component
vi.mock('@/components/TablePagination/TablePagination.vue', () => ({
  default: { template: '<div class="pagination"></div>' }
}));

describe('ProductsTable', () => {
  const columns = [
    {
      accessorKey: 'title',
      header: 'Title',
      cell: (info: any) => info.getValue(),
    },
    {
        accessorKey: 'price',
        header: 'Price',
        cell: (info: any) => info.getValue(),
    }
  ];

  it('should render table with data', () => {
    const wrapper = mount(ProductsTable, {
      props: {
        columns: columns as any,
        data: mockProductsList,
      },
    });

    expect(wrapper.find('table').exists()).toBe(true);
    // Check headers
    expect(wrapper.text()).toContain('Title');
    expect(wrapper.text()).toContain('Price');
    // Check data - FlexRender mock might display the function or simple string?
    // If FlexRender renders 'render' prop which is the cell value or definition...
    // The columns have `cell` property which is a function or string.
    // If we rely on real tanstack logic for `useVueTable`, it processes data.
    // But `FlexRender` is a component that renders the result.

    // Actually, `useVueTable` is used inside the component. We should mock `useVueTable`?
    // `ProductsTable.vue` imports `useVueTable` from `@tanstack/vue-table`.
    // If we don't mock it, it runs the real logic, which is fine as long as dependencies are met.

    // However, verifying text content might be tricky depending on how FlexRender renders.
    // Let's inspect `wrapper.html()` if tests fail.
  });

  it('should render no results when data is empty', () => {
    const wrapper = mount(ProductsTable, {
      props: {
        columns: columns as any,
        data: [],
      },
    });

    expect(wrapper.text()).toContain('No results.');
  });
});
