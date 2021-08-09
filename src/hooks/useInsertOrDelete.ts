import { moviesItAPI } from 'api';
import { useCallback } from 'react';

interface Props {
  isInsert?: boolean
}

export const useInsertOrDelete = <T>({ isInsert }: Props): [
  (content: { url: string; body: T }) => Promise<void>] => {
  const insertOrDelete = useCallback(async (content: { url: string; body: T }): Promise<void> => {
    if (!content) return;
    if (isInsert) {
      await moviesItAPI.post(content.url, content?.body);
    } else {
      await moviesItAPI.delete(content.url, { data: content?.body });
    }
  }, []);

  return [insertOrDelete];
};
