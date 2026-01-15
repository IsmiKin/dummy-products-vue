import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { Product } from '@/products/interfaces/product';
import type { ProductsCategories } from '@/products/interfaces';

import { APP_CONFIG_SETTINGS } from '@/shared/constants/appConfigSettings';

const productsDefaultLimit = APP_CONFIG_SETTINGS.PRODUCTS_LIST_DEFAULT_LIMIT;

export const useProductsStore = defineStore('products', () => {

    const currentPage = ref<number>(1);
    const total = ref<number>(5);
    const products = ref<Product[]>([]);
    const searchValue = ref<string>('');
    const categories = ref<ProductsCategories>([]);
    const categorySelected = ref<string>('');

    return {
        // State
        currentPage,
        total,
        products,
        searchValue,
        categories,
        categorySelected,

        // Getters
        totalPages: computed(() => Math.ceil(total.value / productsDefaultLimit)),
        currentProductPosition: computed(() => (currentPage.value - 1) * productsDefaultLimit),

        // Actions
        setProducts(newProducts: Product[]) {
            products.value = newProducts;
        },
        appendProducts(newProducts: Product[]) {
            products.value.push(...newProducts);
        },
        setPage(page: number = 1) {
            if (currentPage.value === page) return;
            if (page <= 0) return;

            currentPage.value = page;
        },
        setTotal(newTotal: number) {
            total.value = newTotal;
        },
        setSearchValue(newSearchValue: string = '') {
            searchValue.value = newSearchValue;
        },
        setCategorySelected(newCategorySelected: string = '') {
            categorySelected.value = newCategorySelected;
        },
        setCategories(newCategories: ProductsCategories = []) {
            categories.value = newCategories;
        }

    }
});
