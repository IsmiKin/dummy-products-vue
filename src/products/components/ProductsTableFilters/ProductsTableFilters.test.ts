import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ProductsTableFilters from './ProductsTableFilters.vue';
import { mockCategories } from '@/products/mocks/products';

// Mock UI components
vi.mock('@/components/ui/input', () => ({
  Input: {
    props: ['modelValue'],
    template: '<input :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" class="mock-input" />'
  }
}));

vi.mock('@/components/ui/select', () => ({
  Select: {
    name: 'MockSelect',
    props: ['modelValue'],
    template: '<div class="mock-select" @change="$emit(\'update:modelValue\', $event)"><slot /></div>',
    emits: ['update:modelValue']
  },
  SelectTrigger: { template: '<div><slot /></div>' },
  SelectValue: { template: '<div></div>' },
  SelectContent: { template: '<div><slot /></div>' },
  SelectGroup: { template: '<div><slot /></div>' },
  SelectLabel: { template: '<div><slot /></div>' },
  SelectItem: {
    props: ['value'],
    template: '<div class="mock-select-item" @click="$parent.$emit(\'change\', value)"><slot /></div>'
  }
}));

describe('ProductsTableFilters', () => {
  it('should render correctly', () => {
    const wrapper = mount(ProductsTableFilters, {
      props: {
        searchValue: '',
        categorySelected: '',
        categories: mockCategories,
      },
    });

    expect(wrapper.find('.mock-input').exists()).toBe(true);
    expect(wrapper.find('.mock-select').exists()).toBe(true);
  });

  it('should emit update:search-value when input changes', async () => {
    const wrapper = mount(ProductsTableFilters, {
      props: {
        searchValue: '',
        categorySelected: 'electronics',
        categories: mockCategories,
      },
    });

    const input = wrapper.find('.mock-input');
    await input.setValue('test');

    expect(wrapper.emitted('update:search-value')).toBeTruthy();
    expect(wrapper.emitted('update:search-value')?.[0]).toEqual(['test']);

    // Should also clear category
    expect(wrapper.emitted('update:category-selected')).toBeTruthy();
    expect(wrapper.emitted('update:category-selected')?.[0]).toEqual(['']);
  });

  it('should emit update:category-selected when select changes', async () => {
    const wrapper = mount(ProductsTableFilters, {
      props: {
        searchValue: 'test',
        categorySelected: '',
        categories: mockCategories,
      },
    });

    wrapper.findComponent({ name: 'MockSelect' }).vm.$emit('update:modelValue', 'clothing');

    expect(wrapper.emitted('update:category-selected')).toBeTruthy();
    expect(wrapper.emitted('update:category-selected')?.[0]).toEqual(['clothing']);

    // Should also clear search
    expect(wrapper.emitted('update:search-value')).toBeTruthy();
    expect(wrapper.emitted('update:search-value')?.[0]).toEqual(['']);
  });
});
