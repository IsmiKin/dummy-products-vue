import { type ZodSchema } from 'zod';

/**
 * Validates data against a Zod schema.
 * If validation fails, logs the error to the console and returns the original data.
 * This function returns the original data to ensure that any fields missing from the schema
 * or type transformations (like Date coercion) do not alter the runtime behavior of the application.
 *
 * @param schema - The Zod schema to validate against
 * @param data - The data to validate
 * @returns The original data
 */
export const validateApiResponse = <T>(schema: ZodSchema<T>, data: unknown): T => {
  const result = schema.safeParse(data);

  if (!result.success) {
    console.log('API Validation Error:', result.error.format());
  }

  // Always return original data to prevent runtime changes (stripping fields, type coercion)
  return data as T;
};
