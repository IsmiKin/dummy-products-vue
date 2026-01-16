import productsApi from '@/products/api/productsApi';
import type { ProductFormData, Product } from '@/products/interfaces';
import { ProductSchema } from '@/products/schemas/product.schema';
import { validateApiResponse } from '@/utils/apiValidation';

const entityApiUrl = 'products';

/**
 * Creates a new product via the API.
 * 
 * @param product - The product data to create (without ID)
 * @returns Promise resolving to the newly created product with assigned ID
 * 
 * @example
 * const newProduct = await createProduct({
 *   title: 'New Product',
 *   price: 99.99,
 *   description: 'Product description',
 *   category: 'electronics'
 * })
 */
export const createProduct = async(product: ProductFormData): Promise<Product> => {  
  const { data } = await productsApi.post(`/${entityApiUrl}/add`, product);
  return validateApiResponse(ProductSchema, data);
}
