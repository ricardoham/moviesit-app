import { moviesItAPI } from 'api';
import React, { useEffect, useState } from 'react';

interface State<T> {
  isLoading: boolean,
  isError: boolean,
  data?: T,
}

export const useFetch = <T>(
  urlSlug: string,
): [State<T>, React.Dispatch<React.SetStateAction<string>>] => {
  const [data, setData] = useState();
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await moviesItAPI(urlSlug || url);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};
