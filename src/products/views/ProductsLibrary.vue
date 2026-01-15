<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IconError404, IconPlus } from '@tabler/icons-vue';

import Button from '@/components/ui/button/Button.vue'

import ProductsTable from '@/products/components/ProductsTable/ProductsTable.vue'
import ProductsTableSkeleton from '@/products/components/ProductsTableSkeleton.vue/ProductsTableSkeleton.vue'
import ProductsTableFilters from '@/products/components/ProductsTableFilters/ProductsTableFilters.vue'
import ProductsInfoSheet from '@/products/components/ProductsInfoSheet/ProductsInfoSheet.vue'
import ProductModal from '@/products/components/ProductModal/ProductModal.vue'

import { useProduct } from '@/products/composables/useProduct';
import { useProducts } from '@/products/composables/useProducts';
import { computeTableColumns } from '@/products/components/ProductsTable/helpers/columns';
import type { ProductBasic } from '../interfaces';

const isProductInfoOpen = ref(false);
const isProductModalOpen = ref(false);
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

const handleCreateProduct = (product: ProductBasic) => {
  console.log(product);
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
    <div class="flex">
      <h1 class="text-2xl font-semibold">Products</h1>
      <Button class="ml-auto" @click="isProductModalOpen = true">
        <IconPlus />
        Add Product
      </Button>
    </div>


    <ProductsTableFilters :categories="categories" :category-selected="categorySelected" :search-value="searchValue"
      @update:search-value="handleSearchChange" @update:category-selected="handleCategoryChange" />
    <ProductsTableSkeleton v-if="isLoadingProducts" />
    <ProductsTable v-else :columns="columns" :data="products" />

    <ProductsInfoSheet :product="currentProduct" :is-open="isProductInfoOpen"
      @update:is-open="isProductInfoOpen = $event" />
    <ProductModal :is-open="isProductModalOpen" :categories="categories" @create-product="handleCreateProduct"
      @update:is-open="isProductModalOpen = $event" />

    <p v-if="isErrorProducts">
      <IconError404 />
      Error: {{ errorProducts }}
    </p>
  </div>
</template>
