<script setup lang="ts">
import ProductsTable from '@/products/components/ProductsTable/ProductsTable.vue'

import { useProducts } from '@/products/composables/useProducts';
import { columns } from '@/products/components/ProductsTable/helpers/columns';
import { IconLoader, IconError404 } from '@tabler/icons-vue';

const { products, isLoading, isError, error } = useProducts();

</script>
<template>
  <div class="flex flex-col gap-4">

    <h1 class="text-2xl font-semibold">Products</h1>

    <div v-if="isLoading" class="self-center">
      <!-- TODO: Add table skeleton -->
      <IconLoader class="animate-spin" />
      Loading...
    </div>

    <ProductsTable v-if="products.length > 0" :columns="columns" :data="products" />

    <p v-if="isError">
      <IconError404 />
      Error: {{ error }}
    </p>
  </div>
</template>
