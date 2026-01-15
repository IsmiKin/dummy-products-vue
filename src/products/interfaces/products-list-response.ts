import type { Product } from "./product";

type REQUIRED_PRODUCTS_FIELDS = 'id' | 'title' | 'price' | 'description' | 'category' | 'images';

type ProductTruncated = Pick<Product, REQUIRED_PRODUCTS_FIELDS>;

export interface ProductsListResponse {
    products: ProductTruncated[];
    total:    number;
    skip:     number;
    limit:    number;
}
