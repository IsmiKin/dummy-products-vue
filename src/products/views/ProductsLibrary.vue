<script setup lang="ts">
import ProductsTable from '@/products/components/ProductsTable/ProductsTable.vue'

import { useProducts } from '@/products/composables/useProducts';
import { columns } from '@/products/components/ProductsTable/helpers/columns';

const { products, isLoading, isError, error } = useProducts();

</script>
<template>
  <div>
    <h1 class="text-2xl font-semibold">Products</h1>
    <p v-if="isLoading">Loading...</p>
    <p v-if="isError">Error: {{ error }}</p>
    <ProductsTable :columns="columns" :data="products" />
  </div>
</template>
