import { Give, Indexable, RecipientStatYear } from 'src/commons/types';

export function getTotalGiveAmount(gives: Give[] | undefined) {
  return (
    gives?.reduce((total, give) => {
      if (typeof give.amount === 'number') {
        return give.amount + total;
      }

      return total;
    }, 0) ?? 0
  );
}

type GroupedGives = Indexable<Give[]>;

export function groupGivesByYear(gives: Give[]) {
  const givesGroupedByYear: GroupedGives = {};

  gives.forEach((give) => {
    const giveDateYear = give.giveDate?.getFullYear() as number;

    if (!giveDateYear) {
      return undefined;
    }

    const giveYearGroup = givesGroupedByYear[giveDateYear];

    if (giveYearGroup) {
      giveYearGroup.push(give);
    }

    if (!giveYearGroup) {
      givesGroupedByYear[giveDateYear] = [give];
    }
  });

  givesGroupedByYear[RecipientStatYear.ALL_TIME] = gives;

  return givesGroupedByYear;
}
