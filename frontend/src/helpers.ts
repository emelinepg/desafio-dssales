import { Gender, SalesByGender } from './types';
import { formatGender } from './utils/formatters';

export const buildSalesByGenderChart = (sales: SalesByGender[]) => {
  const labels = sales.map((sale) => formatGender(sale.gender as Gender));
  const series = sales.map((sale) => sale.sum);

  return {
    labels,
    series
  };
};
