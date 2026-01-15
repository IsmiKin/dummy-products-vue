<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IconError404 } from '@tabler/icons-vue';

import ProductsTable from '@/products/components/ProductsTable/ProductsTable.vue'
import ProductsTableSkeleton from '@/products/components/ProductsTableSkeleton.vue/ProductsTableSkeleton.vue'
import ProductsTableFilters from '@/products/components/ProductsTableFilters/ProductsTableFilters.vue'
import ProductsInfoSheet from '@/products/components/ProductsInfoSheet.vue/ProductsInfoSheet.vue'

import { useProducts } from '@/products/composables/useProducts';
import { computeTableColumns } from '@/products/components/ProductsTable/helpers/columns';
import type { Product } from '@/products/interfaces';

const { products, isLoading, isError, error, goToPage, categories, categorySelected, setCategorySelected, searchValue, setSearchValue, getProductById } = useProducts();

const currentProduct = ref<Product | null>(null);
const isProductInfoOpen = ref(false);

const resetStatus = () => {
  goToPage(1);
  setSearchValue();
  setCategorySelected();
}

const handleCategoryChange = (category: string) => {
  if (categorySelected.value !== category) {
    goToPage(1);
  }
  setCategorySelected(category);
}

const handleSearchChange = (search: string) => {
  if (searchValue.value !== search) {
    goToPage(1);
  }
  setSearchValue(search);
}

const displayProductInfo = async (id: number) => {
  currentProduct.value = await getProductById(id);
  isProductInfoOpen.value = true;
}

const columns = computeTableColumns({
  displayProductInfoFn: displayProductInfo
});

onMounted(() => {
  resetStatus();
})

</script>
<template>
  <div class="flex flex-col gap-4">

    <h1 class="text-2xl font-semibold">Products</h1>

    <ProductsTableFilters :categories="categories" :category-selected="categorySelected" :search-value="searchValue"
      @update:search-value="handleSearchChange" @update:category-selected="handleCategoryChange" />
    <ProductsTableSkeleton v-if="isLoading" />
    <ProductsTable v-else :columns="columns" :data="products" />

    <ProductsInfoSheet :is-open="isProductInfoOpen" @update:is-open="isProductInfoOpen = $event" />
    <p v-if="isError">
      <IconError404 />
      Error: {{ error }}
    </p>
  </div>
</template>
