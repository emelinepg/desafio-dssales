export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type SalesByGender = {
  gender: string;
  sum: number;
};

export type SalesSummaryData = {
  sum?: number;
  min: number;
  max: number;
  avg: number;
  count: number;
};

export type SalesByStore = {
  id: number;
  name: string;
};

export type FilterData = {
  stores?: SalesByStore;
};

export type PieChartConfig = {
  labels: string[];
  series: number[];
};
