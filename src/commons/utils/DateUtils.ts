import moment, { Moment } from 'moment';

import { FULL_MONTH_DATE } from '../constants/dateFormat';

type DateParam = string | Date | undefined | null;

export function parseDate(dateParam: DateParam): null | Date {
  const date = new Date(dateParam as string);

  return dateParam && isFinite((date as unknown) as number) ? date : null;
}

export function getYears(initialDate: Date, endDate: Date): number[] {
  if (!initialDate || !endDate) {
    return [];
  }

  const initialYear = new Date(initialDate).getFullYear();
  const endYear = new Date(endDate).getFullYear();
  const yearDifference = endYear - initialYear;

  return [...Array(yearDifference + 1).keys()].map(
    (index) => initialYear + index
  );
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}

export function convertMomentDateRangeToDate(
  dateRange: [Moment, Moment]
): [Date, Date] {
  const dateCreatedFrom = dateRange[0].toDate();
  const dateCreatedTo = dateRange[1].toDate();

  return [dateCreatedFrom, dateCreatedTo];
}

export function convertStringDateRangeToDate(
  dateRange: [string, string]
): [Date, Date] {
  const dateCreatedFrom = new Date(dateRange[0]);
  const dateCreatedTo = new Date(dateRange[1]);

  return [dateCreatedFrom, dateCreatedTo];
}

export function convertStringDateRangeToMoment(
  dateRange: [string, string]
): [Moment, Moment] {
  const dateCreatedFrom = moment(new Date(dateRange[0]));
  const dateCreatedTo = moment(new Date(dateRange[1]));

  return [dateCreatedFrom, dateCreatedTo];
}

export function formatDate(
  date?: Date | string,
  format: string = FULL_MONTH_DATE
) {
  if (!date) {
    return '';
  }

  return moment(new Date(date)).format(format);
}
