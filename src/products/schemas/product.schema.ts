import { z } from 'zod';

export const DimensionsSchema = z.object({
  width: z.number(),
  height: z.number(),
  depth: z.number(),
});

export const MetaSchema = z.object({
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  barcode: z.string(),
  qrCode: z.string(),
});

export const ReviewSchema = z.object({
  rating: z.number(),
  comment: z.string(),
  date: z.coerce.date(),
  reviewerName: z.string(),
  reviewerEmail: z.string(),
});

export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  tags: z.array(z.string()),
  brand: z.string(),
  sku: z.string(),
  weight: z.number(),
  dimensions: DimensionsSchema,
  warrantyInformation: z.string(),
  shippingInformation: z.string(),
  availabilityStatus: z.string(),
  reviews: z.array(ReviewSchema),
  returnPolicy: z.string(),
  minimumOrderQuantity: z.number(),
  meta: MetaSchema,
  thumbnail: z.string(),
  images: z.array(z.string()),
});

export const ProductBasicSchema = ProductSchema.pick({
  id: true,
  title: true,
  price: true,
  category: true,
  thumbnail: true,
  stock: true,
});

export const ProductsListResponseSchema = z.object({
  products: z.array(ProductBasicSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export const ProductCategorySchema = z.object({
  slug: z.string(),
  name: z.string(),
  url: z.string(),
});

export const ProductsCategoriesSchema = z.array(ProductCategorySchema);
