import type { Product, ProductBasic, ProductsCategories } from '@/products/interfaces';

export const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  description: 'This is a test product',
  category: 'electronics',
  price: 99.99,
  discountPercentage: 10,
  rating: 4.5,
  stock: 50,
  tags: ['electronics', 'test'],
  brand: 'TestBrand',
  sku: 'TEST-SKU-1',
  weight: 1,
  dimensions: { width: 10, height: 10, depth: 10 },
  warrantyInformation: '1 year',
  shippingInformation: 'Ships in 1 day',
  availabilityStatus: 'In Stock',
  reviews: [],
  returnPolicy: '30 days',
  minimumOrderQuantity: 1,
  meta: {
    createdAt: new Date(),
    updatedAt: new Date(),
    barcode: '123456789',
    qrCode: 'qr-code'
  },
  thumbnail: 'https://example.com/thumbnail.jpg',
  images: ['https://example.com/image1.jpg']
};

export const mockProductBasic: ProductBasic = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  category: 'electronics',
  thumbnail: 'https://example.com/thumbnail.jpg'
};

export const mockProductsList: ProductBasic[] = [
  mockProductBasic,
  {
    id: 2,
    title: 'Test Product 2',
    price: 149.99,
    category: 'clothing',
    thumbnail: 'https://example.com/thumbnail2.jpg'
  }
];

export const mockCategories: ProductsCategories = [
  { slug: 'electronics', name: 'Electronics', url: 'url-1' },
  { slug: 'clothing', name: 'Clothing', url: 'url-2' }
];
