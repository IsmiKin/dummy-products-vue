import { storeToRefs } from "pinia";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { watch } from "vue";
import { toast } from "vue-sonner";

import { getProducts, getCategories } from "@/products/api/helpers/getProducts";
import { createProduct as createProductApi } from "@/products/api/helpers/createProduct";
import { updateProduct as updateProductApi } from "@/products/api/helpers/updateProduct";
import { deleteProduct as deleteProductApi } from "@/products/api/helpers/deleteProduct";
import { useProductsStore } from "@/stores/products";

import { APP_CONFIG_SETTINGS } from '@/shared/constants/appConfigSettings';
import type { ProductBasic, ProductFormData } from "../interfaces";

const productsDefaultLimit = APP_CONFIG_SETTINGS.PRODUCTS_LIST_DEFAULT_LIMIT;

interface Options {
  autoload?: boolean;
}

export const useProducts = ( options?: Options ) => {

  const store = useProductsStore();
  const {
    currentPage,
    currentProductPosition,
    products,
    total,
    totalPages,
    searchValue,
    categories,
    categorySelected,
  } = storeToRefs(store);

  const { autoload = true } = options || {};

  const queryClient = useQueryClient();

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['products', { page: currentPage, search: searchValue, category: categorySelected }],
    queryFn: () => getProducts(currentProductPosition.value, searchValue.value, categorySelected.value),
    staleTime: 60 * 1000,
    enabled: autoload,
    retry: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchInterval: 60 * 1000,
  });

  // TODO: Move into another composable
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 60 * 6000,
    enabled: autoload,
    retry: 0,
    refetchInterval: 60 * 1000,
  });

  const prefetchPage = (page: number) => {
    queryClient.prefetchQuery({
      queryKey: ['products', { page, search: searchValue.value, category: categorySelected.value }],
      queryFn: () => getProducts(page * productsDefaultLimit, searchValue.value, categorySelected.value),
      staleTime: 1000 * 15,
    });
  }

  const createProduct = async(product: ProductFormData) => {
    // NOTE: This is an "optimistic update", it requires a rollback strategy
    // and an update on the "id" because is given by the server
    let newProduct: ProductBasic;
    const tempId = Date.now();
    const enrichedProduct = {
      ...product,
      thumbnail: product.thumbnail || 'https://placehold.co/400x300?text=No+Image',
    };

    const productWithThumbnail: ProductBasic = {
      id: tempId,
      ...enrichedProduct,
    };
    
    store.addProduct(productWithThumbnail);
    
    const productPayload: ProductFormData = enrichedProduct;
    
    try {
      newProduct = await createProductApi(productPayload);
      store.updateProduct(newProduct.id, newProduct);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred while creating the product',
        variant: 'destructive',
      })
      store.removeProduct(tempId);
      console.error(error);
      throw error;
    }

    return newProduct;
  }

  const updateProduct = async(product: ProductFormData & { id: number }) => {
    // NOTE: This is an "optimistic update", it requires a rollback strategy    
    let newProduct: ProductBasic;
    
    // Store original product for rollback, but don't include it in the API payload
    const originalProduct = store.getProductById(product.id);    
    
    const enrichedProduct = {
      ...product,
      thumbnail: product.thumbnail || 'https://placehold.co/400x300?text=No+Image',
    };
    
    // Update store optimistically
    store.updateProduct(product.id, enrichedProduct);
    
    try {      
      newProduct = await updateProductApi(enrichedProduct);      
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred while updating the product',
        variant: 'destructive',
      })
      
      // Only rollback if we have the original product
      if (originalProduct) {
        store.updateProduct(product.id, originalProduct);
      }
      
      console.error(error);
      throw error;
    }

    return newProduct;

  }

  const deleteProduct = async(id: number) => {
    // NOTE: This is an "optimistic update", it requires a rollback strategy    
    let deletedProduct: ProductBasic;
    
    // Store original product for rollback, but don't include it in the API payload
    const originalProduct = store.getProductById(id);    
    
    // Update store optimistically
    store.removeProduct(id);
    
    try {      
      deletedProduct = await deleteProductApi(id);      
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred while deleting the product',
        variant: 'destructive',
      })
      
      // Only rollback if we have the original product
      if (originalProduct) {
        store.addProduct(originalProduct);
      }
      
      console.error(error);
      throw error;
    }

    return deletedProduct;

  }

  watch(data, products => {
    if(products){
      store.setProducts(products.products);
      store.setTotal(products.total);
    }

    if(currentPage.value < totalPages.value){
      prefetchPage(currentPage.value + 1);
    }
  }, { immediate: true });

  watch(categoriesData, categories => {
    if(categories){
      store.setCategories(categories);
    }
  }, { immediate: true });

  return {
    // Properties
    isLoading,
    isError,
    error,
    products,
    total,
    currentPage,
    searchValue,
    categorySelected,
    categories,

    // Methods
    goToPage: store.setPage,
    setSearchValue: store.setSearchValue,
    setCategorySelected: store.setCategorySelected,
    createProduct,
    getProductById: store.getProductById,
    updateProduct,
    deleteProduct,

    // Computed
  }
}


