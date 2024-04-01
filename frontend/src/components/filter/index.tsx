import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { makeRequest } from '../../utils/request';
import './styles.css';
import { SalesByStore } from '../../types';

export type FilterData = {
  stores?: SalesByStore;
};

type Props = {
  onSubmitFilter: (data: FilterData) => void;
};

function Filter({ onSubmitFilter }: Props) {
  const [selectStore, setSelectStore] = useState<SalesByStore[]>([]);

  const { setValue, getValues, control } = useForm<FilterData>();

  const handleChangeStore = (value: SalesByStore) => {
    setValue('stores', value);

    const obj: FilterData = {
      stores: getValues('stores')
    };

    onSubmitFilter(obj);
  };

  useEffect(() => {
    makeRequest
      .get<SalesByStore[]>('/stores')
      .then((response) => {
        setSelectStore(response.data);
      })
      .catch(() => {
        console.log('Error fetching sales by store');
      });
  }, []);

  return (
    <div className="filter-container base-card">
      <form>
        <div className="filter-store-container">
          <Controller
            name="stores"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={selectStore}
                isClearable
                placeholder="Selecione a loja"
                classNamePrefix="sales-store-filter-select"
                onChange={(value) => handleChangeStore(value as SalesByStore)}
                getOptionLabel={(store: SalesByStore) => store.name}
                getOptionValue={(store: SalesByStore) => String(store.id)}
              />
            )}
          />
        </div>
      </form>
    </div>
  );
}

export default Filter;
