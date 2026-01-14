import productsApi from '@/products/api/productsApi';
import type { ProductsListResponse } from '@/products/interfaces';

const entityApiUrl = 'products';

// TODO: Integrate zod
const productsDefaultLimit = 10;

export const getProducts = async(page: number = 1): Promise<ProductsListResponse> => {
    // TODO: Remove delay after testing
    const hasDelay = true ? '&delay=1000' : '';

    const { data } = await productsApi.get<ProductsListResponse>(`/${entityApiUrl}?page=${page}&limit=${productsDefaultLimit}${hasDelay}`);
    return data;
}

