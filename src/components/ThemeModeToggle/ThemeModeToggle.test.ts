import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ThemeModeToggle from './ThemeModeToggle.vue';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

// Mock UI components
vi.mock('@/components/ui/button', () => ({
  Button: { template: '<button><slot /></button>' }
}));

vi.mock('@/components/ui/dropdown-menu', () => ({
  DropdownMenu: { template: '<div><slot /></div>' },
  DropdownMenuTrigger: { template: '<div><slot /></div>' },
  DropdownMenuContent: { template: '<div><slot /></div>' },
  DropdownMenuItem: {
    template: '<div class="menu-item" @click="$emit(\'click\')"><slot /></div>',
    emits: ['click']
  },
}));

// Mock @vueuse/core
const { mockMode } = vi.hoisted(() => {
  return { mockMode: { value: 'auto', __v_isRef: true } };
});

vi.mock('@vueuse/core', () => ({
  useColorMode: () => mockMode
}));

describe('ThemeModeToggle', () => {
  it('should render toggle button', () => {
    const wrapper = mount(ThemeModeToggle);
    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.find('.sr-only').text()).toBe('Toggle theme');
  });

  it('should change mode to light', async () => {
    const wrapper = mount(ThemeModeToggle);
    const items = wrapper.findAll('.menu-item');
    // Order: Light, Dark, System
    await items[0].trigger('click');
    expect(mockMode.value).toBe('light');
  });

  it('should change mode to dark', async () => {
    const wrapper = mount(ThemeModeToggle);
    const items = wrapper.findAll('.menu-item');
    await items[1].trigger('click');
    expect(mockMode.value).toBe('dark');
  });

  it('should change mode to auto', async () => {
    const wrapper = mount(ThemeModeToggle);
    const items = wrapper.findAll('.menu-item');
    await items[2].trigger('click');
    expect(mockMode.value).toBe('auto');
  });
});
