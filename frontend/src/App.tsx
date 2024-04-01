import { useState } from 'react';
import './App.css';
import Filter, { FilterData } from './components/filter';
import Header from './components/header';
import SalesSummary from './components/sales-summary';

function App() {
  const [filterData, setFilterData] = useState<FilterData>();

  const onFilterChange = (filter: FilterData) => {
    setFilterData(filter);
  };
  return (
    <>
      <Header />
      <div className="app-container">
        <Filter onSubmitFilter={onFilterChange} />
        <div className="sales-overview-container">
          <SalesSummary filterData={filterData} />
        </div>
      </div>
    </>
  );
}

export default App;
