import { add } from './add';

describe('Add Numbers', () => {
  it('should return 0 when blank string is passed', () => {
    const result = add('');
    expect(result).toBe(0);
  });

  it('should return same number when single number string is passed', () => {
    const result = add('23');
    expect(result).toBe(23);
  });

  it('should return addition of 2 numbers when a comma separared string of 2 numbers is passed', () => {
    const result = add('2,3');
    expect(result).toBe(5);
  });

  it('should return addition of numbers when a comma/line separared string of numbers is passed', () => {
    const result = add('1\n2,3\n4');
    expect(result).toBe(10);
  });

  it('should return addition of numbers when only a line separared string of numbers is passed', () => {
    const result = add('1\n2\n3\n4');
    expect(result).toBe(10);
  });

  it('should support passing custom delimiter', () => {
    const result = add('//;\n1;2\n3\n4');
    expect(result).toBe(10);
  });

  test('should throw exception for single or multiple negative numbers', () => {
    expect(() => add('1,-2')).toThrow('Negative numbers not allowed: -2');
    expect(() => add('1,-2,3,-4')).toThrow(
      'Negative numbers not allowed: -2, -4'
    );
  });
});
