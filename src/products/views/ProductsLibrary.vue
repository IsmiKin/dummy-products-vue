<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IconError404, IconPlus } from '@tabler/icons-vue';

import Button from '@/components/ui/button/Button.vue'

import ProductsTable from '@/products/components/ProductsTable/ProductsTable.vue'
import ProductsTableSkeleton from '@/products/components/ProductsTableSkeleton.vue/ProductsTableSkeleton.vue'
import ProductsTableFilters from '@/products/components/ProductsTableFilters/ProductsTableFilters.vue'
import ProductsInfoSheet from '@/products/components/ProductsInfoSheet/ProductsInfoSheet.vue'
import ProductModal from '@/products/components/ProductModal/ProductModal.vue'
import AlertModal from '@/components/AlertModal/AlertModal.vue'

import { useProduct } from '@/products/composables/useProduct';
import { useProducts } from '@/products/composables/useProducts';
import { computeTableColumns } from '@/products/components/ProductsTable/helpers/columns';
import type { ProductFormData } from '@/products/interfaces';

const isProductInfoOpen = ref(false);
const isProductModalOpen = ref(false);
const productId = ref<string | number>('');
const isAlertModalOpen = ref(false);
const alertModalMessage = ref('');
const alertModalType = ref<'destructive' | 'default'>('default');
const alertModalSubmitFn = ref(() => { });

const { data: currentProduct } = useProduct(productId);

const {
  products,
  isLoading: isLoadingProducts,
  isError: isErrorProducts,
  error: errorProducts,
  goToPage,
  categories,
  categorySelected,
  setCategorySelected,
  searchValue,
  setSearchValue,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById
} = useProducts();

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

const handleEditProduct = (id: number) => {
  isProductModalOpen.value = true;
  productId.value = id;
}

const handleCreateProduct = async (formData: ProductFormData) => {
  // Transform form data to ProductBasic format
  const product = {
    title: formData.title,
    price: formData.price,
    description: formData.description || '',
    category: formData.category,
    thumbnail: formData.thumbnail || 'https://placehold.co/400x300?text=No+Image',
  };

  await createProduct(product);
}

const handleUpdateProduct = (formData: ProductFormData & { id: number }) => {
  // Transform form data to ProductBasic format
  const product = {
    id: formData.id,
    title: formData.title,
    price: formData.price,
    description: formData.description || '',
    category: formData.category,
    thumbnail: currentProduct.value?.thumbnail || '',
  };

  updateProduct(product);
}

const handleDeleteProduct = (id: number) => {
  isAlertModalOpen.value = true;
  const product = getProductById(id);
  alertModalMessage.value = `Are you sure you want to delete product "${product?.title}"?`;
  alertModalType.value = 'destructive';
  alertModalSubmitFn.value = () => {
    deleteProduct(id)
    isAlertModalOpen.value = false;
  };
}

const handleModalClose = (isOpen: boolean) => {
  isProductModalOpen.value = isOpen;
  if (!isOpen) {
    // Reset productId when modal closes to prevent showing old data
    productId.value = '';
  }
}

const columns = computeTableColumns({
  displayProductInfoFn: displayProductInfo,
  handleEditProductFn: handleEditProduct,
  handleDeleteProductFn: handleDeleteProduct,
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
      @update:is-open="isProductInfoOpen = $event" @edit-product="handleEditProduct" />
    <ProductModal :is-open="isProductModalOpen" :categories="categories" :product="currentProduct"
      @create-product="handleCreateProduct" @update-product="handleUpdateProduct" @update:is-open="handleModalClose" />
    <AlertModal :open="isAlertModalOpen" :custom-message="alertModalMessage" :submit-fn="alertModalSubmitFn"
      @update:open="isAlertModalOpen = $event" :type-action="alertModalType" />
    <p v-if="isErrorProducts">
      <IconError404 />
      Error: {{ errorProducts }}
    </p>
  </div>
</template>
