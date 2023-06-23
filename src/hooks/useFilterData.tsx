import {useEffect, useState} from 'react';

export function useFilterData<T>(data: T) {
  const [newData, setNewData] = useState<T>();

  const filterData = (field: string, query: string) => {
    if (Array.isArray(data)) {
      setNewData(
        data.filter(d =>
          (d[field][Object.keys(d[field])[0]] as string)
            .toLowerCase()
            .includes(query.toLowerCase()),
        ) as T,
      );
    }
  };

  useEffect(() => {
    if (!data) return;
    setNewData(data);
  }, [data]);

  return {
    newData,
    filterData,
  };
}
