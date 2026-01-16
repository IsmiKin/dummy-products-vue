import productsApi from '@/products/api/productsApi';
import type { Product, ProductsListResponse } from '@/products/interfaces';
import type { ProductsCategories } from '@/products/interfaces';

import { APP_CONFIG_SETTINGS } from '@/shared/constants/appConfigSettings';

const entityApiUrl = 'products';

// TODO: Integrate zod
const PRODUCTS_DEFAULT_LIMIT = APP_CONFIG_SETTINGS.PRODUCTS_LIST_DEFAULT_LIMIT;
const REQUIRED_PRODUCTS_FIELDS = ['id', 'thumbnail', 'title', 'price', 'category', 'stock'];

export const getProducts = async(position: number = 1, searchValue: string = '', category: string = '') => {
  const commonParams = {
    select: REQUIRED_PRODUCTS_FIELDS.join(','),
    skip: position.toString(),
    limit: PRODUCTS_DEFAULT_LIMIT.toString(),
  }

  const params = new URLSearchParams(commonParams);

  if(category){
    return getProductsByCategory(params, category);
  }

  return getProductsBySearch(params, searchValue);

}

export const getProductsBySearch = async(params: URLSearchParams, searchValue: string = ''): Promise<ProductsListResponse> => {
    if(searchValue) {
        params.set('q', searchValue);
    }

    const { data } = await productsApi.get<ProductsListResponse>(`/${entityApiUrl}/search`, { params });
    return data;
}

export const getProductsByCategory = async(params: URLSearchParams, category: string): Promise<ProductsListResponse> => {
    const { data } = await productsApi.get<ProductsListResponse>(`/${entityApiUrl}/category/${category}`, { params });
    return data;
}

export const getCategories = async(): Promise<ProductsCategories> => {
    const { data } = await productsApi.get<ProductsCategories>(`/${entityApiUrl}/categories`);
    return data;
}

export const getProductById = async(id: string | number): Promise<Product> => {
    const idString = id.toString();    

    const { data } = await productsApi.get<Product>(`/${entityApiUrl}/${idString}`);
    return data;
}
