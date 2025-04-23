const defaultDelimiter = ',';
const add = (numStr: string) => {
  if (!numStr) return 0;
  if (!numStr.matchAll(new RegExp(String.raw`/${defaultDelimiter}/`, 'g')))
    return parseInt(numStr);
  const result = numStr
    .replaceAll(/\n/g, defaultDelimiter)
    .split(defaultDelimiter)
    .reduce((sum: number, current: string) => {
      return !isNaN(parseInt(current)) ? sum + parseInt(current) : sum;
    }, 0);

  return result;
};

export { add };
