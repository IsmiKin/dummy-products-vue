/**
 * Capitalizes the first letter of a string while keeping the rest unchanged.
 * 
 * @param str - The string to capitalize
 * @returns The string with the first letter capitalized
 * 
 * @example
 * capitalizeFirstLetter('hello') // returns 'Hello'
 * capitalizeFirstLetter('world') // returns 'World'
 */
export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts a kebab-case string to Title Case format.
 * Replaces hyphens with spaces and capitalizes the first letter of each word.
 * 
 * @param str - The kebab-case string to convert
 * @returns The string converted to Title Case
 * 
 * @example
 * kebabCaseToTitleCase('hello-world') // returns 'Hello World'
 * kebabCaseToTitleCase('product-category') // returns 'Product Category'
 */
export const kebabCaseToTitleCase = (str: string) => {
  return str.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}
