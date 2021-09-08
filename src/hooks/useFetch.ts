import { moviesItAPI } from 'api';
import React, { useCallback, useEffect, useState } from 'react';

interface State<T> {
  loadingFetch: boolean,
  errorFetch: boolean,
  data?: T,
  statusCode?: number;
}

export const useFetch = <T>(
  urlSlug?: string,
): [State<T>, React.Dispatch<React.SetStateAction<string | undefined>>, () => Promise<void>] => {
  const [data, setData] = useState();
  const [statusCode, setStatusCode] = useState<number>();
  const [url, setUrl] = useState(urlSlug);
  const [loadingFetch, setIsLoading] = useState(false);
  const [errorFetch, setIsError] = useState(false);

  const fetchData = useCallback(async (): Promise<void> => {
    setIsError(false);
    setIsLoading(true);
    try {
      const result = await moviesItAPI.get(url || '');
      setData(result.data);
      setStatusCode(result.status);
    } catch (error) {
      console.error(error);
      setIsError(true);
    }

    setIsLoading(false);
  }, [url]);

  useEffect(() => {
    if (!url) {
      setData(undefined);
      setStatusCode(undefined);
      return;
    }
    fetchData();
  }, [url]);

  return [{
    data,
    loadingFetch,
    errorFetch,
    statusCode,
  }, setUrl, fetchData];
};
