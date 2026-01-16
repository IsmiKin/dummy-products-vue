import productsApi from '@/products/api/productsApi';
import type { Product } from '@/products/interfaces';
import { ProductSchema } from '@/products/schemas/product.schema';
import { validateApiResponse } from '@/utils/apiValidation';

/**
 * Deletes a product by its ID via the API.
 * 
 * @param id - The ID of the product to delete
 * @returns Promise resolving to the deleted product data
 * 
 * @example
 * const deletedProduct = await deleteProduct(123)
 */
export const deleteProduct = async(id: number): Promise<Product> => {
  const { data } = await productsApi.delete(`products/${id}`);
  return validateApiResponse(ProductSchema, data);
}
