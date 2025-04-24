const defaultDelimiter = ',';
const add = (numStr: string) => {
  if (!numStr) return 0;
  if (!numStr.matchAll(new RegExp(String.raw`/${defaultDelimiter}/`, 'g')))
    return parseInt(numStr);

  let delimiter = defaultDelimiter;
  let isDefaultDelimiter = true;
  let input = numStr;

  if (numStr.startsWith('//')) {
    const parts = numStr.split('\n');
    const customDelimiter = parts[0].slice(2);
    delimiter = customDelimiter; // custom delimiter
    isDefaultDelimiter = false;
    // console.log('parts', parts);
    parts.shift(); // remove the first part - the custom delimiter
    // console.log('parts.shift()', parts);
    input = parts.join(delimiter);
    // console.log('input', input);
  }

  

  const numbers = input.replaceAll(/\n/g, delimiter).split(delimiter);
  const negativeNumbers = numbers.filter((num: string) => parseInt(num) < 0);

  // console.log(
  //   `delimiter: " ${delimiter} ", isDefaultDelimiter: ${
  //     isDefaultDelimiter ? 'Y' : 'N'
  //   }, numbers: ${numbers}, negativeNumbers: ${
  //     (negativeNumbers?.length > 0 && negativeNumbers) || 'N/A'
  //   }`
  // );

  if (negativeNumbers.length > 0) {
    throw new Error(
      `Negative numbers not allowed: ${negativeNumbers.join(', ')}`
    );
  }

  const result = numbers.reduce((sum: number, current: string) => {
    return !isNaN(parseInt(current)) ? sum + parseInt(current) : sum;
  }, 0);

  return result;
};

export { add };
