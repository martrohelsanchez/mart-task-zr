// @ts-ignore
import excel from 'node-excel-export';

import { Give, TAX_DEDUCTIBLE_STATUS } from 'src/commons/types';
import { insertDecimal } from 'src/commons/utils/MathUtils';
import { capitalizeFirstLetter } from 'src/commons/utils/StringUtils';

type MakeHeadingsParams = {
  status: string;
  taxYear: number;
};

function makeHeadings(params: MakeHeadingsParams) {
  const { status, taxYear } = params;

  return [[`Your ${taxYear} Tax-Deductible Gives`], [`Status: ${status}`], []];
}

function makeSpecifications() {
  return {
    col1: {
      displayName: 'Date',
      headerStyle: {},
      width: 120,
    },
    col2: {
      displayName: 'Recipient',
      headerStyle: {},
      width: 120,
    },
    col3: {
      displayName: 'Contributed',
      headerStyle: {},
      cellStyle: {
        numFmt: '$0.00',
      },
      width: 120,
    },
    col4: {
      displayName: 'Tax Deductible',
      headerStyle: {},
      width: 120,
    },
  };
}

function makeDataSets(gives: Give[]) {
  let totalContributed = 0;

  const givesData = gives.map((give) => {
    if (give.amount) {
      totalContributed += give.amount;
    }

    return {
      col1: give.giveDate,
      // col2: give.recipient?.name,
      col3: +insertDecimal(give.amount as number),
      col4: capitalizeFirstLetter(give.taxDeductible as string),
    };
  });

  return [
    ...givesData,
    {
      col1: 'TOTAL',
      col2: '',
      col3: +insertDecimal(totalContributed),
      col4: '',
    },
  ];
}

export function buildGiveSheets(
  gives: Give[],
  taxDeductibleStatus: TAX_DEDUCTIBLE_STATUS
) {
  const data = makeDataSets(gives);
  const specification = makeSpecifications();
  const heading = makeHeadings({
    status: taxDeductibleStatus,
    taxYear: new Date(gives[0].giveDate as Date).getFullYear(),
  });

  return excel.buildExport([
    {
      data,
      heading,
      specification,
      name: 'Tax-Deductible',
      merges: [],
    },
  ]);
}
