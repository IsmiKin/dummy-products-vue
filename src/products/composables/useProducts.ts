import { storeToRefs } from "pinia";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { watch } from "vue";

import { getProducts } from "@/products/api/helpers/getProducts";
import { useProductsStore } from "@/stores/products";

import { APP_CONFIG_SETTINGS } from '@/shared/constants/appConfigSettings';

const productsDefaultLimit = APP_CONFIG_SETTINGS.PRODUCTS_LIST_DEFAULT_LIMIT;

interface Options {
  autoload?: boolean;
}

export const useProducts = ( options?: Options ) => {

  const store = useProductsStore();
  const { currentPage, currentProductPosition, products, total, totalPages } = storeToRefs( store );

  const { autoload = true } = options || {};

  const queryClient = useQueryClient();

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['products', { page: currentPage }],
    queryFn: () => getProducts(currentProductPosition.value),
    staleTime: 60 * 1000,
    enabled: autoload,
    retry: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchInterval: 60 * 1000,
  });


  const goToPage = (page: number) => {
    store.setPage(page);
  }

  const prefetchPage = (page: number) => queryClient.prefetchQuery({
    queryKey: ['products', { page }],
    queryFn: () => getProducts(page * productsDefaultLimit),
    staleTime: 1000 * 15,
  });



  watch(data, products => {
    if(products){
      store.setProducts(products.products);
      store.setTotal(products.total);
    }

    if(currentPage.value < totalPages.value){
      console.log('prefetching page', currentPage.value + 1);
      prefetchPage(currentPage.value + 1);
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

    // Methods
    goToPage,

    // Computed
  }
}


