import { moviesItAPI } from 'api';
import React, { useCallback, useEffect, useState } from 'react';

interface State<T> {
  loadingFetch: boolean,
  errorFetch: boolean,
  data?: T,
}

export const useFetch = <T>(
  urlSlug?: string,
): [State<T>, React.Dispatch<React.SetStateAction<string | undefined>>, () => Promise<void>] => {
  const [data, setData] = useState();
  const [url, setUrl] = useState(urlSlug);
  const [loadingFetch, setIsLoading] = useState(false);
  const [errorFetch, setIsError] = useState(false);

  const fetchData = useCallback(async (): Promise<void> => {
    setIsError(false);
    setIsLoading(true);

    try {
      const result = await moviesItAPI.get(url || '');
      setData(result.data);
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  }, [url]);

  useEffect(() => {
    if (!url) {
      setData(undefined);
      return;
    }
    fetchData();
  }, [url]);

  return [{ data, loadingFetch, errorFetch }, setUrl, fetchData];
};
