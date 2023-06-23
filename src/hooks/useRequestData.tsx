/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import {useEffect, useState} from 'react';

export function useRequestData<T>(url: string, defaultValue?: T) {
  const [data, setData] = useState<T>(defaultValue!);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    setIsLoading(true);
    try {
      const {data: response} = await axios.get<T>(url);
      setData(response);
      setIsLoading(false);
    } catch (err) {
      setError('Error al obtener los datos');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [url]);

  return {
    data,
    error,
    isLoading,
  };
}
