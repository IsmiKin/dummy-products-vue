import productsApi from '@/products/api/productsApi';
import type { Product, ProductsListResponse } from '@/products/interfaces';
import type { ProductsCategories } from '@/products/interfaces';

import { APP_CONFIG_SETTINGS } from '@/shared/constants/appConfigSettings';

const entityApiUrl = 'products';

// TODO: Integrate zod
const PRODUCTS_DEFAULT_LIMIT = APP_CONFIG_SETTINGS.PRODUCTS_LIST_DEFAULT_LIMIT;
const REQUIRED_PRODUCTS_FIELDS = ['id', 'thumbnail', 'title', 'price', 'category', 'stock'];

/**
 * Fetches products from the API with optional filtering by search query or category.
 * Automatically routes to the appropriate endpoint based on whether a category is specified.
 * 
 * @param position - The starting position for pagination (default: 1)
 * @param searchValue - Optional search query to filter products (default: '')
 * @param category - Optional category to filter products (default: '')
 * @returns Promise resolving to a paginated list of products
 * 
 * @example
 * // Get all products from position 1
 * const products = await getProducts()
 * 
 * // Search for products
 * const searchResults = await getProducts(1, 'laptop')
 * 
 * // Get products by category
 * const categoryProducts = await getProducts(1, '', 'electronics')
 */
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

/**
 * Fetches products filtered by a search query.
 * 
 * @param params - URL search parameters including pagination and field selection
 * @param searchValue - Search query to filter products (default: '')
 * @returns Promise resolving to a paginated list of products matching the search
 * 
 * @remarks
 * If searchValue is empty, returns all products without filtering.
 */
export const getProductsBySearch = async(params: URLSearchParams, searchValue: string = ''): Promise<ProductsListResponse> => {
    if(searchValue) {
        params.set('q', searchValue);
    }

    const { data } = await productsApi.get<ProductsListResponse>(`/${entityApiUrl}/search`, { params });
    return data;
}

/**
 * Fetches products filtered by a specific category.
 * 
 * @param params - URL search parameters including pagination and field selection
 * @param category - Category name to filter products by
 * @returns Promise resolving to a paginated list of products in the specified category
 */
export const getProductsByCategory = async(params: URLSearchParams, category: string): Promise<ProductsListResponse> => {
    const { data } = await productsApi.get<ProductsListResponse>(`/${entityApiUrl}/category/${category}`, { params });
    return data;
}

/**
 * Fetches all available product categories from the API.
 * 
 * @returns Promise resolving to an array of category names
 * 
 * @example
 * const categories = await getCategories()
 * // Returns: ['electronics', 'clothing', 'home', ...]
 */
export const getCategories = async(): Promise<ProductsCategories> => {
    const { data } = await productsApi.get<ProductsCategories>(`/${entityApiUrl}/categories`);
    return data;
}

/**
 * Fetches a single product by its unique identifier.
 * 
 * @param id - The product ID (string or number)
 * @returns Promise resolving to the complete product details
 * 
 * @example
 * const product = await getProductById(123)
 * const productByString = await getProductById('123')
 */
export const getProductById = async(id: string | number): Promise<Product> => {
    const idString = id.toString();    

    const { data } = await productsApi.get<Product>(`/${entityApiUrl}/${idString}`);
    return data;
}
