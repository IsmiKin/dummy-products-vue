export const copyFromBrowser = (id: number) => {
  navigator.clipboard.writeText(id.toString());  
}