import TextInputLengths from 'src/commons/constants/textInputLengths';

import { NON_DIGIT_EXCEPT_PERIOD } from '../constants/regex';

export function toTrimmedString(str: string | undefined) {
  return str?.trim() || '';
}

export function zeroPad(num: number, size: number) {
  let newNum = num.toString();

  while (newNum.length < size) {
    newNum = '0' + num;
  }

  return newNum;
}

export function generateSearchTagsFromString(str: string): string[] {
  const trimmedStr = str.trim();
  const minimumCharacters = TextInputLengths.SEARCH.MIN;
  const strLower = trimmedStr.toLowerCase() || '';
  const splitted = strLower.split(' ').filter(Boolean);
  const keywords: string[] = [];

  splitted.forEach((word) => {
    for (let i = minimumCharacters; i <= word.length; i += 1) {
      const keyword = word.substring(0, i);

      keywords.push(keyword);
    }
  });

  return [...new Set(keywords)].filter(Boolean);
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function removeNonDigitExceptPeriod(text: string) {
  return text.replace(NON_DIGIT_EXCEPT_PERIOD, '');
}

export function toTitleCase(string: string) {
  return string
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((word) => capitalizeFirstLetter(word))
    .join(' ');
}

export function separateByWords(string: string) {
  return string.trim().split(' ').filter(Boolean);
}
