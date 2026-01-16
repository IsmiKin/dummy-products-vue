import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import TablePagination from './TablePagination.vue';
import { Button } from '@/components/ui/button';

vi.mock('@/shared/constants/appConfigSettings', () => ({
  APP_CONFIG_SETTINGS: {
    PRODUCTS_LIST_DEFAULT_LIMIT: 10
  }
}));

describe('TablePagination', () => {
  const createMockTable = (pageIndex = 0, pageCount = 5, rowCount = 50) => ({
    getRowCount: vi.fn(() => rowCount),
    getPageCount: vi.fn(() => pageCount),
    getState: vi.fn(() => ({
      pagination: {
        pageIndex,
        pageSize: 10,
      },
    })),
    getCanPreviousPage: vi.fn(() => pageIndex > 0),
    getCanNextPage: vi.fn(() => pageIndex < pageCount - 1),
    setPageIndex: vi.fn(),
    previousPage: vi.fn(),
    nextPage: vi.fn(),
  });

  it('should render correctly', () => {
    const table = createMockTable();
    const wrapper = mount(TablePagination, {
      props: {
        table,
      },
    });

    expect(wrapper.text()).toContain('Showing 1 - 10 of 50 products');
    expect(wrapper.text()).toContain('Page 1 of 5');
  });

  it('should disable previous buttons on first page', () => {
    const table = createMockTable(0);
    const wrapper = mount(TablePagination, {
      props: {
        table,
      },
    });

    const buttons = wrapper.findAllComponents(Button);
    // Button order: First, Prev, Next, Last
    expect(buttons[0].attributes('disabled')).toBeDefined();
    expect(buttons[1].attributes('disabled')).toBeDefined();
    expect(buttons[2].attributes('disabled')).toBeUndefined();
    expect(buttons[3].attributes('disabled')).toBeUndefined();
  });

  it('should disable next buttons on last page', () => {
    const table = createMockTable(4);
    const wrapper = mount(TablePagination, {
      props: {
        table,
      },
    });

    const buttons = wrapper.findAllComponents(Button);
    expect(buttons[0].attributes('disabled')).toBeUndefined();
    expect(buttons[1].attributes('disabled')).toBeUndefined();
    expect(buttons[2].attributes('disabled')).toBeDefined();
    expect(buttons[3].attributes('disabled')).toBeDefined();
  });

  it('should call table navigation methods', async () => {
    const table = createMockTable(2);
    const wrapper = mount(TablePagination, {
      props: {
        table,
      },
    });

    const buttons = wrapper.findAllComponents(Button);

    await buttons[0].trigger('click');
    expect(table.setPageIndex).toHaveBeenCalledWith(0);

    await buttons[1].trigger('click');
    expect(table.previousPage).toHaveBeenCalled();

    await buttons[2].trigger('click');
    expect(table.nextPage).toHaveBeenCalled();

    await buttons[3].trigger('click');
    expect(table.setPageIndex).toHaveBeenCalledWith(4);
  });
});
