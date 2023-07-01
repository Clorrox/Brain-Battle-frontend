import {useState} from 'react';

export function useFilterData<T>(data: T[]) {
  const [newData, setNewData] = useState<T[]>(data);

  const filterData = (field: keyof T, query: string) => {
    setNewData(
      data.filter(d =>
        (d[field] as string).toLowerCase().includes(query.toLowerCase()),
      ),
    );
  };

  return {
    newData,
    filterData,
  };
}
