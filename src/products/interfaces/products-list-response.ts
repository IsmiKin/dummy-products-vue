import type { Product } from "./product";

type REQUIRED_PRODUCTS_FIELDS = 'id' | 'title' | 'price' | 'description' | 'category' | 'images';

export type ProductBasic = Pick<Product, REQUIRED_PRODUCTS_FIELDS>;

export interface ProductsListResponse {
    products: ProductBasic[];
    total:    number;
    skip:     number;
    limit:    number;
}
