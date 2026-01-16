import productsApi from '@/products/api/productsApi';
import type { ProductFormData, Product } from '@/products/interfaces';

// TODO: Integrate zod

const entityApiUrl = 'products';

export const createProduct = async(product: ProductFormData): Promise<Product> => {  
  const { data } = await productsApi.post(`/${entityApiUrl}/add`, product);
  return data;
}
