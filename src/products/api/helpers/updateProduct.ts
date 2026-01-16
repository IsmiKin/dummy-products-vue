import productsApi from '@/products/api/productsApi';
import type { ProductFormData, Product } from '@/products/interfaces';

// TODO: Integrate zod

const entityApiUrl = 'products';

export const updateProduct = async(product: ProductFormData & { id: number }): Promise<Product> => {
  // Remove id from the body since it's in the URL
  const { id, ...productData } = product;
  
  const { data } = await productsApi.patch(`/${entityApiUrl}/${id}`, productData);
  return data;
}
