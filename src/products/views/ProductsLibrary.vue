<script setup lang="ts">
// import ProductsTable from '@/products/components/ProductsTable/ProductsTable.vue'

import { useProducts } from '@/products/composables/useProducts';

const { products, total, isLoading, isError, error } = useProducts();
</script>
<template>
  <div>
    <h1 class="text-2xl font-semibold">Products</h1>
    <p v-if="isLoading">Loading...</p>
    <ul v-else>
      {{ total }}
      <li v-for="product in products" :key="product.id">
        {{ product.title }}
      </li>
    </ul>
    <p v-if="isError">Error: {{ error }}</p>
    <!-- <ProductsTable />  -->
  </div>
</template>
