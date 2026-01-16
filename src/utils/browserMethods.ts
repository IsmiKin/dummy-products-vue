/**
 * Copies a numeric ID to the system clipboard using the browser's Clipboard API.
 * 
 * @param id - The numeric ID to copy to clipboard
 * 
 * @example
 * copyFromBrowser(12345) // Copies "12345" to clipboard
 * 
 * @remarks
 * This function requires the Clipboard API to be available in the browser.
 * It may require user permission in some browsers.
 */
export const copyFromBrowser = (id: number) => {
  navigator.clipboard.writeText(id.toString());  
}