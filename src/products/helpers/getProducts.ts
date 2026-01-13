import productsApi from '@/products/api/productsApi';
import type { ProductsListResponse } from '@/products/interfaces';

const entityApiUrl = 'products';
export const getProducts = async(): Promise<ProductsListResponse> => {
    // TODO: Remove delay after testing
    const hasDelay = true ? '?delay=1000' : '';
    const { data } = await productsApi.get<ProductsListResponse>(`/${entityApiUrl}${hasDelay}`);
    return data;
}

