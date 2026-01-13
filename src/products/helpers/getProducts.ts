import productsApi from '@/products/api/productsApi';
import type { ProductsListResponse } from '@/products/interfaces';

const entityApiUrl = 'products';

export const getProducts = async(): Promise<ProductsListResponse> => {

    const { data } = await productsApi.get<ProductsListResponse>(`/${entityApiUrl}`);
    console.log(data);
    return data;
}

