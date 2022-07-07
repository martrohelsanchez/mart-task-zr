import { DECIMAL_OFFSET } from '../constants/offsets';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

export function formatToCurrency(amount: number) {
  return formatter.format(amount);
}

export function formatToFinancial(price: number) {
  return price / DECIMAL_OFFSET;
}

export function toIntMoney(price: string | number) {
  const numPrice = Number(price);

  const roundedToNearestHundredth = Math.ceil(numPrice * 100) / 100;

  return roundedToNearestHundredth * DECIMAL_OFFSET;
}
