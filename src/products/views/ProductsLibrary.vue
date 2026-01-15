<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IconError404 } from '@tabler/icons-vue';

import ProductsTable from '@/products/components/ProductsTable/ProductsTable.vue'
import ProductsTableSkeleton from '@/products/components/ProductsTableSkeleton.vue/ProductsTableSkeleton.vue'
import ProductsTableFilters from '@/products/components/ProductsTableFilters/ProductsTableFilters.vue'
import ProductsInfoSheet from '@/products/components/ProductsInfoSheet.vue/ProductsInfoSheet.vue'

import { useProduct } from '@/products/composables/useProduct';
import { useProducts } from '@/products/composables/useProducts';
import { computeTableColumns } from '@/products/components/ProductsTable/helpers/columns';

const isProductInfoOpen = ref(false);
const productId = ref<string | number>('');

const { data: currentProduct } = useProduct(productId);

const { products, isLoading: isLoadingProducts, isError: isErrorProducts, error: errorProducts, goToPage, categories, categorySelected, setCategorySelected, searchValue, setSearchValue } = useProducts();

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

const displayProductInfo = (id: number) => {
  isProductInfoOpen.value = true;
  productId.value = id;
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
    <ProductsTableSkeleton v-if="isLoadingProducts" />
    <ProductsTable v-else :columns="columns" :data="products" />
    <ProductsInfoSheet :product="currentProduct" :is-open="isProductInfoOpen"
      @update:is-open="isProductInfoOpen = $event" />
    <p v-if="isErrorProducts">
      <IconError404 />
      Error: {{ errorProducts }}
    </p>
  </div>
</template>
