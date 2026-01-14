import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Product } from '@/products/interfaces/product';

export const useProductsStore = defineStore('products', () => {

    const currentPage = ref<number>(1);
    const total = ref<number>(5);
    const products = ref<Product[]>([]);

    return {
        // State
        currentPage,
        total,
        products,

        // Getters

        // Actions
        setProducts(newProducts: Product[]) {
            products.value = newProducts;
        },
        setPage(page: number) {
            if (currentPage.value === page) return;
            if (page <= 0) return;

            currentPage.value = page;
        },
        setTotal(newTotal: number) {
            total.value = newTotal;
        }

    }
});
