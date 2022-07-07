import { sortArrayByAscending } from './ArrayUtils';

export function insertDecimal(num = 0) {
  return (num / 100).toFixed(2);
}

export function calculatePercentage(rate: number, base: number) {
  return base * rate;
}

export function calculateRate(base: number, percentage: number) {
  return percentage / base;
}

export function calculateBase(rate: number, percentage: number) {
  return percentage / rate;
}

export function convertMicrosecondToMillisecond(microsecond: number) {
  return microsecond / 1000;
}

export function roundFloat(num: number, fractionDigits = 2) {
  return Number(num.toFixed(fractionDigits));
}

export function getRandomNumber(max: number) {
  return Math.floor(Math.random() * max);
}

export function convertCardinalToOrdinalNumber(cardinalNumber: number) {
  switch (cardinalNumber) {
    case 1:
      return '1st';
    case 2:
      return '2nd';
    // eslint-disable-next-line no-magic-numbers
    case 3:
      return '3rd';
    default:
      return `${cardinalNumber}th`;
  }
}

export function calculateMedian(numbers: number[]) {
  const sortedNumbers = sortArrayByAscending(numbers);
  const isEven = sortedNumbers.length % 2 === 0;
  const middleElement = sortedNumbers.length / 2;

  if (numbers.length === 0) {
    return 0;
  }

  if (isEven) {
    const totalMiddle =
      sortedNumbers[middleElement] + sortedNumbers[middleElement - 1];

    return totalMiddle / 2;
  } else {
    return sortedNumbers[Math.floor(middleElement)];
  }
}
