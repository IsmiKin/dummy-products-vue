import { storeToRefs } from "pinia";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { watch } from "vue";

import { getProducts, getCategories } from "@/products/api/helpers/getProducts";
import { useProductsStore } from "@/stores/products";

import { APP_CONFIG_SETTINGS } from '@/shared/constants/appConfigSettings';

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
    categorySelected
  } = storeToRefs(store);

  const { autoload = true } = options || {};

  const queryClient = useQueryClient();

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['products', { page: currentPage, search: searchValue }],
    queryFn: () => getProducts(currentProductPosition.value, searchValue.value),
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

  // TODO: Move into another composable
  const goToPage = (page: number) => {
    store.setPage(page);
  }

  const prefetchPage = (page: number) => queryClient.prefetchQuery({
    queryKey: ['products', { page, search: searchValue }],
    queryFn: () => getProducts(page * productsDefaultLimit, searchValue.value),
    staleTime: 1000 * 15,
  });

  const resetSearch = () => {
    store.setSearchValue('');
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
    goToPage,
    resetSearch,
    setSearchValue: store.setSearchValue,
    setCategorySelected: store.setCategorySelected,

    // Computed
  }
}


