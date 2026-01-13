import type { Product } from "./product";

export interface ProductsListResponse {
    products: Product[];
    total:    number;
    skip:     number;
    limit:    number;
}
