import { watch } from "vue";
import { storeToRefs } from "pinia";
import { useQuery } from "@tanstack/vue-query";

import { getCategories } from "@/products/api/helpers/getProducts";
import { useProductsStore } from "@/stores/products";

interface Options {
  autoload?: boolean;
}

export const useCategories = ( options?: Options ) => {

  const { autoload = true } = options || {};

  const store = useProductsStore();

  const { categories, categorySelected } = storeToRefs(store);

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 60 * 6000,
    enabled: autoload,
    retry: 0,
    refetchInterval: 60 * 1000,
  });

  watch(categoriesData, categories => {
    if(categories){
      store.setCategories(categories);
    }
  }, { immediate: true });

  return {
    categories,
    categorySelected,
    setCategorySelected: store.setCategorySelected,
  }
}
