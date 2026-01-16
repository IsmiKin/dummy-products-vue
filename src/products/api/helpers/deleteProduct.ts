import productsApi from '@/products/api/productsApi';
import type { Product } from '@/products/interfaces';

export const deleteProduct = async(id: number): Promise<Product> => {
  const { data } = await productsApi.delete(`products/${id}`);
  return data;
}