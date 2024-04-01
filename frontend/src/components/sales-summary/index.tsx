import { useEffect, useMemo, useState } from 'react';
import { buildSalesByGenderChart } from '../../helpers';
import { PieChartConfig, SalesByGender } from '../../types';
import { buildFilterParams, makeRequest } from '../../utils/request';
import { FilterData } from '../filter';
import PieChartCard from '../pie-chart-card';
import { sumSalesSummary } from '../pie-chart-card/helpers';
import './styles.css';
import { formatPrice } from '../../utils/formatters';

type Props = {
  filterData?: FilterData;
};

function SalesSummary({ filterData }: Props) {
  const [totalSum, setTotalSum] = useState(0);

  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  const [salesByGender, setSalesByGender] = useState<PieChartConfig>();

  useEffect(() => {
    makeRequest
      .get<SalesByGender[]>('/sales/by-gender', { params })
      .then((response) => {
        const newSalesByGender = buildSalesByGenderChart(response.data);
        setSalesByGender(newSalesByGender);
        const newTotalSum = sumSalesSummary(response.data);
        setTotalSum(newTotalSum);
      })
      .catch(() => {
        console.log('Error fetching sales by gender');
      });
  }, [params]);

  return (
    <div className="sales-summary-container base-card">
      <div className="sales-summary-data">
        <h1 className="sales-summary-total">{formatPrice(totalSum)} </h1>
        <span className="sales-summary-label">Total de vendas</span>
      </div>
      <div className="sales-summary-chart-container">
        <div className="sales-summary-chart">
          <PieChartCard
            name="Gênero"
            labels={salesByGender?.labels}
            series={salesByGender?.series}
          />
        </div>
      </div>
    </div>
  );
}

export default SalesSummary;
