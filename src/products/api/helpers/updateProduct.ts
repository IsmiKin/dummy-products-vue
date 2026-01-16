import productsApi from '@/products/api/productsApi';
import type { ProductFormData, Product } from '@/products/interfaces';
import { ProductSchema } from '@/products/schemas/product.schema';
import { validateApiResponse } from '@/utils/apiValidation';

const entityApiUrl = 'products';

/**
 * Updates an existing product via the API.
 * 
 * @param product - The product data to update, including the ID
 * @returns Promise resolving to the updated product
 * 
 * @example
 * const updatedProduct = await updateProduct({
 *   id: 123,
 *   title: 'Updated Product',
 *   price: 149.99,
 *   description: 'Updated description',
 *   category: 'electronics'
 * })
 * 
 * @remarks
 * The ID is extracted from the product object and used in the URL path.
 * The ID is not included in the request body.
 */
export const updateProduct = async(product: ProductFormData & { id: number }): Promise<Product> => {
  // Remove id from the body since it's in the URL
  const { id, ...productData } = product;
  
  const { data } = await productsApi.patch(`/${entityApiUrl}/${id}`, productData);
  return validateApiResponse(ProductSchema, data);
}
