/**
 * checks if string is valid, i.e. contains characters
 * @param val
 * @returns boolean
 */

export const isStringValid = (val?: string): boolean => {
  return val ? val.trim().length > 0 : false;
};
