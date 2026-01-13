// import { watchEffect } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { computed } from "vue";

import { getProducts } from "@/products/helpers/getProducts";


export const useProducts = () => {

  const { isLoading, data: response, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    retry: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchInterval: 60 * 1000,
  });

  // watchEffect(() => {
  //   // console.log('isError', isError.value );
  // });

  return {
    // Properties
    isLoading,
    isError,
    error,
    productsResponse: response,

    // Computed
    total: computed(() => response.value?.total),
    skip: computed(() => response.value?.skip),
    limit: computed(() => response.value?.limit),
    products: computed(() => response.value?.products ?? []),
  }
}


