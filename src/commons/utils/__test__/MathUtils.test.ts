/* eslint-disable no-magic-numbers */
import { calculateMedian } from '../MathUtils';

describe('calculateMedian', () => {
  it.each([
    {
      input: [3, 2, 5, 1, 4],
      expectedOutput: 3,
    },
    {
      input: [],
      expectedOutput: 0,
    },
    {
      input: [1, 2],
      expectedOutput: 1.5,
    },
    {
      input: [1, 3, 4, 2],
      expectedOutput: 2.5,
    },
  ])('should return correct median', ({ input, expectedOutput }) => {
    const result = calculateMedian(input);

    expect(result).toBe(expectedOutput);
  });
});
