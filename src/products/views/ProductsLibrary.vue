<script setup lang="ts">
import { onMounted } from 'vue';
import { IconError404 } from '@tabler/icons-vue';

import ProductsTable from '@/products/components/ProductsTable/ProductsTable.vue'
import ProductsTableSkeleton from '@/products/components/ProductsTableSkeleton.vue/ProductsTableSkeleton.vue'
import ProductsTableFilters from '@/products/components/ProductsTableFilters/ProductsTableFilters.vue'

import { useProducts } from '@/products/composables/useProducts';
import { columns } from '@/products/components/ProductsTable/helpers/columns';

const { products, isLoading, isError, error, goToPage, categories, categorySelected, setCategorySelected, searchValue, setSearchValue } = useProducts();

const resetStatus = () => {
  goToPage(1);
  setSearchValue();
  setCategorySelected();
}

onMounted(() => {
  resetStatus();
})

</script>
<template>
  <div class="flex flex-col gap-4">

    <h1 class="text-2xl font-semibold">Products</h1>

    <ProductsTableFilters :categories="categories" :category-selected="categorySelected" :search-value="searchValue"
      @update:search-value="setSearchValue" @update:category-selected="setCategorySelected" />
    <ProductsTableSkeleton v-if="isLoading" />
    <ProductsTable v-else :columns="columns" :data="products" />

    <p v-if="isError">
      <IconError404 />
      Error: {{ error }}
    </p>
  </div>
</template>
