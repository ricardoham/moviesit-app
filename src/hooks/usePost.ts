import { moviesItAPI } from 'api';
import React, { useEffect, useState } from 'react';

interface State<T> {
  isLoading: boolean,
  error: {
    isError: boolean,
    message?: string,
  },
  data?: T,
}

export const usePost = <T>(
  urlSlug?: string,
): [State<T>,
    React.Dispatch<React.SetStateAction<{ url: string; body: T | undefined; }>>] => {
  const [content, setBody] = useState({ url: urlSlug || '', body: undefined } as any);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    isError: false,
    message: undefined,
  });
  console.log('Content', content);

  useEffect(() => {
    const postData = async () => {
      setError({ isError: false, message: undefined });
      setIsLoading(true);

      try {
        await moviesItAPI.post(content.url, content.body);
      } catch (e) {
        setError({ isError: true, message: e.message });
      }
      setIsLoading(false);
    };

    postData();
  }, [content]);

  return [{ isLoading, error }, setBody];
};
