// import { watchEffect } from "vue";
// import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { watch } from "vue";

import { getProducts } from "@/products/api/helpers/getProducts";
import { useProductsStore } from "@/stores/products";

interface Options {
  autoload?: boolean;
}
// TODO: DELETE ME, FOR DEBUGGIN
// This code is only for TypeScript
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__:
      import("@tanstack/query-core").QueryClient;
  }
}

export const useProducts = ( options?: Options ) => {

  const store = useProductsStore();
  const { currentPage, products, total } = storeToRefs( store );

  const { autoload = true } = options || {};

  const queryClient = useQueryClient();

  // This code is for all users
  window.__TANSTACK_QUERY_CLIENT__ = queryClient;

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['products?page=', currentPage],
    queryFn: () => getProducts(currentPage.value),
    staleTime: 60 * 1000,
    enabled: autoload,
    retry: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchInterval: 60 * 1000,
  });

  const goToPage = (page: number) => {
    if(currentPage.value < page)
      prefetchPage(page + 1);
    else
      prefetchPage(page - 1);

    store.setPage(page);
  }

  const prefetchPage = (page: number) => queryClient.prefetchQuery({
    queryKey: ['products?page=', page],
    queryFn: () => getProducts(page),
  });

  // TODO: Verify it's not first page
  if(currentPage.value > 1)
    prefetchPage(currentPage.value - 1);

  // TODO: Verify it's not last page
  if(currentPage.value < total.value)
    prefetchPage(currentPage.value + 1);


  watch(data, productsResponse => {
    console.log('productsResponse', productsResponse);
    if(productsResponse){
      store.setProducts(productsResponse.products);
      store.setTotal(productsResponse.total);
    }
  });

  return {
    // Properties
    isLoading,
    isError,
    error,
    products,
    total,

    // Methods
    goToPage,

    // Computed
    // products: computed(() => response.value?.products ?? []),
  }
}


