import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ProductModal from './ProductModal.vue';
import { mockCategories, mockProduct } from '@/products/mocks/products';

// Mock UI components
vi.mock('@/components/ui/dialog', () => ({
  Dialog: { template: '<div v-if="open"><slot /></div>', props: ['open'] },
  DialogContent: { template: '<div><slot /></div>' },
  DialogHeader: { template: '<div><slot /></div>' },
  DialogTitle: { template: '<div><slot /></div>' },
  DialogDescription: { template: '<div><slot /></div>' },
  DialogFooter: { template: '<div><slot /></div>' },
}));

vi.mock('@/components/ui/button', () => ({
  Button: { template: '<button type="submit"><slot /></button>' }
}));

vi.mock('@/components/ui/input', () => ({
  Input: {
    props: ['modelValue'],
    template: '<input :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" @blur="$emit(\'blur\')" class="mock-input" />'
  }
}));

vi.mock('@/components/ui/textarea', () => ({
  Textarea: {
    props: ['modelValue'],
    template: '<textarea :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" @blur="$emit(\'blur\')" class="mock-textarea" />'
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
  SelectItem: {
    props: ['value'],
    template: '<div class="mock-select-item" @click="$parent.$emit(\'change\', value)"><slot /></div>'
  },
}));

vi.mock('@/components/ui/field', () => ({
  Field: { template: '<div><slot /></div>' },
  FieldGroup: { template: '<div><slot /></div>' },
  FieldLabel: { template: '<label><slot /></label>' },
  FieldError: { template: '<div class="error"><slot /></div>' },
}));

describe('ProductModal', () => {
  it('should render create form correctly', () => {
    const wrapper = mount(ProductModal, {
      props: {
        isOpen: true,
        categories: mockCategories,
      },
    });

    expect(wrapper.text()).toContain('Create a new Product');
    expect(wrapper.find('input.mock-input').exists()).toBe(true);
  });

  it('should render edit form with values', () => {
    const wrapper = mount(ProductModal, {
      props: {
        isOpen: true,
        categories: mockCategories,
        product: mockProduct,
      },
    });

    expect(wrapper.text()).toContain('Edit Product');
    const inputs = wrapper.findAll('input.mock-input');
    // Assuming title is first
    const titleInput = inputs[0];
    // We can check if value prop matches.
    // Note: DOM element value property might not be set by :value in JSDOM immediately or accessible via wrapper.element.value
    // But `wrapper.props('modelValue')` is not available on HTML element wrapper.
    // `titleInput.element.value` should work.
    expect(titleInput.element.value).toBe(mockProduct.title);
  });

  it('should validate and emit create-product on submit', async () => {
    const wrapper = mount(ProductModal, {
      props: {
        isOpen: true,
        categories: mockCategories,
      },
    });

    // Fill form
    const inputs = wrapper.findAll('.mock-input');
    // Title
    await inputs[0].setValue('New Product');
    // Brand
    await inputs[1].setValue('Brand X');
    // Price
    await inputs[2].setValue(99.99);
    // Stock
    await inputs[3].setValue(10);
    // Discount
    await inputs[4].setValue(5);

    // Description (textarea)
    await wrapper.find('.mock-textarea').setValue('Desc');

    // Category (Select)
    // We need to trigger change on Select.
    // Assuming MockSelect pattern works
    wrapper.findComponent({ name: 'MockSelect' }).vm.$emit('update:modelValue', 'electronics');

    // Submit
    await wrapper.find('form').trigger('submit');

    // flush promises for validation
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(wrapper.emitted('create-product')).toBeTruthy();
    const emittedData = wrapper.emitted('create-product')?.[0][0] as any;
    expect(emittedData.title).toBe('New Product');
    expect(emittedData.price).toBe(99.99);
  });
});
