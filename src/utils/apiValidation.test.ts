import { describe, it, expect, vi, afterEach } from 'vitest';
import { z } from 'zod';
import { validateApiResponse } from './apiValidation';

describe('validateApiResponse', () => {
  const consoleLogSpy = vi.spyOn(console, 'log');

  afterEach(() => {
    consoleLogSpy.mockClear();
  });

  it('should return data when validation succeeds', () => {
    const schema = z.object({ name: z.string() });
    const data = { name: 'test' };

    const result = validateApiResponse(schema, data);

    expect(result).toEqual(data);
    expect(consoleLogSpy).not.toHaveBeenCalled();
  });

  it('should return data and log error when validation fails', () => {
    const schema = z.object({ name: z.string() });
    const data = { name: 123 }; // Invalid type

    const result = validateApiResponse(schema, data);

    expect(result).toEqual(data); // Should return original data
    expect(consoleLogSpy).toHaveBeenCalledWith('API Validation Error:', expect.any(Object));
  });

  it('should return original data without transformation even if schema transforms it', () => {
    const schema = z.object({ date: z.coerce.date() });
    const dateString = '2023-01-01T00:00:00Z';
    const data = { date: dateString };

    const result = validateApiResponse(schema, data);

    // Schema would transform string to Date, but we expect original string
    expect(result.date).toBe(dateString);
    expect(typeof result.date).toBe('string');
  });
});
