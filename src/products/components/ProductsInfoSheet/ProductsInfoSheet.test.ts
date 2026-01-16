import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ProductsInfoSheet from './ProductsInfoSheet.vue';
import { mockProduct } from '@/products/mocks/products';

// Mock UI components
vi.mock('@/components/ui/sheet', () => ({
  Sheet: {
    props: ['open'],
    template: '<div v-if="open"><slot /></div>'
  },
  SheetContent: { template: '<div><slot /></div>' },
  SheetHeader: { template: '<div><slot /></div>' },
  SheetTitle: { template: '<div><slot /></div>' },
  SheetDescription: { template: '<div><slot /></div>' },
  SheetFooter: { template: '<div><slot /></div>' },
  SheetClose: { template: '<button @click="$emit(\'click\')"><slot /></button>' },
}));

vi.mock('@/components/ui/button', () => ({
  Button: { template: '<button @click="$emit(\'click\')"><slot /></button>' },
  buttonVariants: () => 'btn-variant-class'
}));

vi.mock('@/components/ui/button/Button.vue', () => ({
  default: { template: '<button @click="$emit(\'click\')"><slot /></button>' }
}));

vi.mock('@/components/ui/badge/Badge.vue', () => ({
  default: { template: '<span><slot /></span>' }
}));

vi.mock('@/components/ui/card', () => ({
  Card: { template: '<div><slot /></div>' },
  CardHeader: { template: '<div><slot /></div>' },
  CardTitle: { template: '<div><slot /></div>' },
  CardDescription: { template: '<div><slot /></div>' },
}));

describe('ProductsInfoSheet', () => {
  it('should render product info when open', () => {
    const wrapper = mount(ProductsInfoSheet, {
      props: {
        product: mockProduct,
        isOpen: true,
      },
    });

    expect(wrapper.text()).toContain(mockProduct.title);
    expect(wrapper.text()).toContain(mockProduct.description);
    expect(wrapper.text()).toContain(mockProduct.price.toString());
  });

  it('should not render content when closed', () => {
    const wrapper = mount(ProductsInfoSheet, {
      props: {
        product: mockProduct,
        isOpen: false,
      },
    });

    // With our mock, Sheet renders <div v-if="open">.
    // If open is false, it should be empty or comments.
    expect(wrapper.text()).not.toContain(mockProduct.title);
  });

  it('should emit edit-product when edit button clicked', async () => {
    const wrapper = mount(ProductsInfoSheet, {
      props: {
        product: mockProduct,
        isOpen: true,
      },
    });

    // There are multiple buttons. The Edit button has "Edit" text.
    const buttons = wrapper.findAll('button');
    const editButton = buttons.find(b => b.text().includes('Edit'));

    expect(editButton?.exists()).toBe(true);
    await editButton?.trigger('click');

    expect(wrapper.emitted('edit-product')).toBeTruthy();
    expect(wrapper.emitted('edit-product')?.[0]).toEqual([mockProduct.id]);

    // It also closes the sheet
    expect(wrapper.emitted('update:isOpen')).toBeTruthy();
    expect(wrapper.emitted('update:isOpen')?.[0]).toEqual([false]);
  });
});
