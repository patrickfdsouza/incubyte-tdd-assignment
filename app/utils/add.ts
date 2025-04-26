const defaultDelimiter = ',';

export interface AddResult {
  sum: number;
  naNs: string[];
  delimiter: string;
  isDefaultDelimiter: boolean;
  numbers: string[];
}

const add = (numStr: string): AddResult => {
  if (!numStr) {
    return {
      sum: 0,
      naNs: [],
      delimiter: 'NA',
      isDefaultDelimiter: true,
      numbers: [],
    };
  }

  let delimiter = defaultDelimiter;
  let input = numStr;
  let isDefaultDelimiter = true;

  if (input.startsWith('//')) {
    const [delimiterLine, ...rest] = input.split('\n');
    delimiter = delimiterLine.slice(2);
    input = rest.join(delimiter);
    isDefaultDelimiter = false;
  }

  const numbers = input.replaceAll('\n', delimiter).split(delimiter);
  const negatives = numbers.filter((num) => Number(num) < 0);

  if (negatives.length > 0) {
    throw new Error(`Negative numbers not allowed: ${negatives.join(', ')}`);
  }

  const naNs: string[] = [];
  const sum = numbers.reduce((acc, curr) => {
    const n = Number(curr);
    if (isNaN(n)) {
      naNs.push(curr);
      return acc;
    }
    return acc + n;
  }, 0);

  return { sum, naNs, delimiter, isDefaultDelimiter, numbers };
};

export { add };
