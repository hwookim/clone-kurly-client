/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

export default function useQuery(
  key = '',
  api = () => new Promise(),
  config = {}
) {
  const { initialData, onSucess = () => {}, onFail = () => {} } = config;
  const [data, setData] = useState(initialData);

  useEffect(() => {
    api()
      .then((result) => {
        setData(result);
        onSucess(result);
      })
      .catch((err) => onFail(err));
  }, [key]);

  return data;
}
