import { type Ref, computed } from "vue";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { getProductById } from "@/products/api/helpers/getProducts";

export const useProduct = (productId?: Ref<number | string>) => {

  const queryClient = useQueryClient();

  const { isLoading, data, isError, error } = useQuery({
      queryKey: ['product', { id: productId }],
      queryFn: () => getProductById(productId?.value ?? 0),
      staleTime: 60 * 1000,
      enabled: computed(() => !!productId?.value),
      retry: 0,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchInterval: 60 * 1000,
    });

  const prefetchProductInfo = (id: number) => {
    queryClient.prefetchQuery({
      queryKey: ['product', { id }],
      queryFn: () => getProductById(id),
      staleTime: 60 * 1000,
    });
  }

  return {

    // Properties
    isLoading,
    data,
    isError,
    error,

    // Actions
    prefetchProductInfo

  }
}
