<script setup lang="ts">
import { computed } from 'vue';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import type { ProductsCategories } from '@/products/interfaces';

const props = defineProps<{
  searchValue: string;
  categorySelected: string;
  categories: ProductsCategories;
}>();

const emit = defineEmits<{
  (e: 'update:search-value', value: string): void;
  (e: 'update:category-selected', value: string): void;
}>();

const searchModel = computed({
  get: () => props.searchValue,
  set: (value) => emit('update:search-value', value),
});

const categoryModel = computed({
  get: () => props.categorySelected,
  set: (value) => emit('update:category-selected', value),
});
</script>

<template>
  <div class="flex items-center justify-between py-4">
    <Input v-model="searchModel" placeholder="Filter anything...(product name, description, price, etc.)"
      class="max-w-sm" />
    <Select v-model="categoryModel">
      <SelectTrigger class="w-[180px]">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          <SelectItem v-for="category in categories" :key="category.slug" :value="category.name">
            {{ category.name }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>
