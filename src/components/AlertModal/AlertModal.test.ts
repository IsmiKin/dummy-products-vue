import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AlertModal from './AlertModal.vue';

// Mock UI components to avoid Radix/Teleport issues
vi.mock('@/components/ui/alert-dialog', () => ({
  AlertDialog: {
    props: ['open'],
    template: '<div v-if="open"><slot /></div>'
  },
  AlertDialogContent: { template: '<div><slot /></div>' },
  AlertDialogHeader: { template: '<div><slot /></div>' },
  AlertDialogTitle: { template: '<div><slot /></div>' },
  AlertDialogDescription: { template: '<div><slot /></div>' },
  AlertDialogFooter: { template: '<div><slot /></div>' },
  AlertDialogCancel: { template: '<button class="cancel-btn"><slot /></button>' },
  AlertDialogAction: { template: '<button class="action-btn"><slot /></button>' },
}));

vi.mock('@/components/ui/alert', () => ({
  Alert: { template: '<div><slot /></div>' },
  AlertTitle: { template: '<div><slot /></div>' },
  AlertDescription: { template: '<div class="alert-desc"><slot /></div>' },
}));

describe('AlertModal', () => {
  it('should render message correctly', () => {
    const wrapper = mount(AlertModal, {
      props: {
        open: true,
        customMessage: 'Test Message',
        typeAction: 'destructive',
        submitFn: vi.fn(),
      },
    });

    expect(wrapper.text()).toContain('Test Message');
    expect(wrapper.text()).toContain('Are you absolutely sure?');
  });

  it('should call submitFn when Continue is clicked', async () => {
    const submitFn = vi.fn();
    const wrapper = mount(AlertModal, {
      props: {
        open: true,
        customMessage: 'Test Message',
        typeAction: 'destructive',
        submitFn,
      },
    });

    const actionButton = wrapper.find('.action-btn');
    expect(actionButton.exists()).toBe(true);
    await actionButton.trigger('click');
    expect(submitFn).toHaveBeenCalled();
  });

  it('should emit update:open false when Cancel is clicked', async () => {
    const wrapper = mount(AlertModal, {
      props: {
        open: true,
        customMessage: 'Test Message',
        typeAction: 'destructive',
        submitFn: vi.fn(),
      },
    });

    const cancelButton = wrapper.find('.cancel-btn');
    expect(cancelButton.exists()).toBe(true);
    await cancelButton.trigger('click');
    expect(wrapper.emitted('update:open')).toBeTruthy();
    expect(wrapper.emitted('update:open')?.[0]).toEqual([false]);
  });
});
