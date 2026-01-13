<script setup lang="ts">
import { IconError404 } from '@tabler/icons-vue';

import ProductsTable from '@/products/components/ProductsTable/ProductsTable.vue'
import ProductsTableSkeleton from '@/products/components/ProductsTable/ProductsTableSkeleton.vue'

import { useProducts } from '@/products/composables/useProducts';
import { columns } from '@/products/components/ProductsTable/helpers/columns';
const { products, isLoading, isError, error } = useProducts();

</script>
<template>
  <div class="flex flex-col gap-4">

    <h1 class="text-2xl font-semibold">Products</h1>

    <ProductsTableSkeleton v-if="isLoading" />

    <ProductsTable v-if="products.length > 0" :columns="columns" :data="products" />

    <p v-if="isError">
      <IconError404 />
      Error: {{ error }}
    </p>
  </div>
</template>
