import { formatToFinancial, toIntMoney } from '../MoneyUtilts';

describe('formatToFinancial', () => {
  it.each([
    {
      input: 0,
      expectedOutput: 0,
    },
    {
      input: 123,
      expectedOutput: 1.23,
    },
    {
      input: 8210,
      expectedOutput: 82.1,
    },
  ])(
    'should move the decimal point 2 places to the left',
    ({ input, expectedOutput }) => {
      const result = formatToFinancial(input);

      expect(result).toBe(expectedOutput);
    }
  );
});

describe('toIntMoney', () => {
  it.each([
    {
      input: 0,
      expectedOutput: 0,
    },
    {
      input: 100,
      expectedOutput: 10000,
    },
    {
      input: 1.23,
      expectedOutput: 123,
    },
    {
      input: 82.1,
      expectedOutput: 8210,
    },
    {
      input: 1234.567,
      expectedOutput: 123457,
    },
    {
      input: 1234.561,
      expectedOutput: 123457,
    },
    {
      input: 987.65432,
      expectedOutput: 98766,
    },
  ])(
    'should move the decimal point 2 places to the right',
    ({ input, expectedOutput }) => {
      const result = toIntMoney(input);

      expect(result).toBe(expectedOutput);
    }
  );
});
