
// TODO: Add JSDOCS
export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const kebabCaseToTitleCase = (str: string) => {
  return str.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}
