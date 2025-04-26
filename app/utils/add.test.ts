import { add } from './add';

describe('Add Numbers - Basic Additions', () => {
  it.each([
    ['', 0],
    ['23', 23],
    ['2,3', 5],
    ['1\n2,3\n4', 10],
    ['1\n2\n3\n4', 10],
    ['//;\n1;2\n3\n4', 10],
  ])('should correctly add numbers for input "%s" and return "%s"', (input, expectedSum) => {
    const result: any = add(input);
    expect(result.sum).toBe(expectedSum);
  });
});

describe('Add Numbers - Handling Negatives', () => {
  it.each([
    ['1,-2', 'Negative numbers not allowed: -2'],
    ['1,-2,3,-4', 'Negative numbers not allowed: -2, -4'],
  ])('should throw error for input "%s" as "%s"', (input, errorMessage) => {
    expect(() => add(input)).toThrow(errorMessage);
  });
});

describe('Add Numbers - Handling NaNs', () => {
  it.each([
    ['1,2,3,4,abc', 10, ['abc']],
    ['1\n2,3\n4,abc', 10, ['abc']],
    ['1\n2\n3\n4,abc', 10, ['abc']],
    ['//;\n1;2\n3\n4,abc', 6, ['4,abc']],
    ['//;\n1;2\n3\n4,abc\ndef', 6, ['4,abc', 'def']],
  ])(
    'should ignore NaNs and sum valid numbers for input "%s" returning sum %d and NaNs "%s"',
    (input, expectedSum, expectedNaNs) => {
      const result: any = add(input);
      expect(result.sum).toBe(expectedSum);
      expect(result.naNs).toEqual(expectedNaNs);
    }
  );
});

describe('Add Numbers - Other edge cases', () => {
  it.each([
    ['should handle multiple character delimiter', '//***\n1***2***3', 6],
    ['should handle delimiter that looks like number', '//4\n14\n24', 3],
    ['should ignore trailing delimiters', '1,2,3,', 6],
    [
      'should treat invalid custom delimiter without newline as 0 sum',
      '//;1;2',
      0,
    ],
    ['should handle consecutive delimiters gracefully', '1,,2', 3],
  ])('%s', (_, input, expectedSum) => {
    const result: any = add(input);
    expect(result.sum).toBe(expectedSum);
  });
});
