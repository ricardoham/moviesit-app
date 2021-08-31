import { moviesItAPI } from 'api';
import { useCallback, useState } from 'react';

interface Props {
  operation: 'insert' | 'edit' | 'delete'
}

export const useApiOperation = <T>({ operation }: Props): [
  boolean,
  (content: { url: string; body?: T }) => Promise<void>] => {
  const [loading, setLoading] = useState(false);

  const insertOrEditOrDelete = useCallback(async (
    content: { url: string; body?: T },
  ): Promise<void> => {
    setLoading(true);
    if (!content) return;
    try {
      if (operation === 'insert') {
        await moviesItAPI.post(content.url, content?.body);
      }
      if (operation === 'edit') {
        await moviesItAPI.put(content.url, content?.body);
      }
      if (operation === 'delete') {
        await moviesItAPI.delete(content.url);
      }
    } catch (err) {
      setLoading(false);
      throw err;
    }
    setLoading(false);
  }, []);

  return [loading, insertOrEditOrDelete];
};
