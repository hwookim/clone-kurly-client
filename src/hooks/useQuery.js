/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

export default function useQuery(
  key = '',
  api = () => new Promise(),
  config = {}
) {
  const { initialData, onSuccess = () => {}, onFail = () => {} } = config;
  const [data, setData] = useState(initialData);

  useEffect(() => {
    api()
      .then((result) => {
        setData(result);
        onSuccess(result);
      })
      .catch((err) => onFail(err));
  }, [key]);

  return data;
}
