import productsApi from '@/products/api/productsApi';
import type { ProductsListResponse } from '@/products/interfaces';

import { APP_CONFIG_SETTINGS } from '@/shared/constants/appConfigSettings';

const entityApiUrl = 'products';

// TODO: Integrate zod
const productsDefaultLimit = APP_CONFIG_SETTINGS.PRODUCTS_LIST_DEFAULT_LIMIT;

export const getProducts = async(position: number = 1): Promise<ProductsListResponse> => {

    const params = new URLSearchParams();
    params.set('skip', position.toString());
    params.set('limit', productsDefaultLimit.toString());

    // TODO: Remove delay after testing
    params.set('delay', '1000');

    const { data } = await productsApi.get<ProductsListResponse>(`/${entityApiUrl}`, { params });
    return data;
}

