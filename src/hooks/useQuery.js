/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

export default function useQuery(
  key = '',
  api = () => new Promise(),
  config = {}
) {
  const { initialData, onSuccess = () => {} } = config;
  const [data, setData] = useState(initialData);

  useEffect(() => {
    api().then((result) => {
      setData(result.data || result);
      onSuccess(result);
    });
  }, [key]);

  return data;
}
