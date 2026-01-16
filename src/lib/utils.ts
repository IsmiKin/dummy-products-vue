import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges multiple class names into a single string, handling Tailwind CSS conflicts.
 * Uses clsx for conditional classes and tailwind-merge to resolve conflicting Tailwind utilities.
 * 
 * @param inputs - Class values to merge (strings, objects, arrays, etc.)
 * @returns A merged string of class names with Tailwind conflicts resolved
 * 
 * @example
 * cn('px-2 py-1', 'px-4') // returns 'py-1 px-4' (px-4 overrides px-2)
 * cn('text-red-500', { 'text-blue-500': true }) // returns 'text-blue-500'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
