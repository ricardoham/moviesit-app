import React, {
  useEffect, useReducer, useState,
} from 'react';
import { moviesItAPI } from 'api';
import { TMDB, TMDBResults } from 'model/tmbd';

type State = {
  isLoading: boolean,
  isError: boolean,
  result: TMDB[],
  page: number,
  error?: string,
};

type Action =
  | { type: 'FETCH_MOVIES' }
  | { type: 'FETCH_MOVIES_SUCCESS', payload: TMDBResults }
  | { type: 'FETCH_MOVIES_FAILURE', error: string, isError: boolean };

const dataFetchReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_MOVIES':
      return {
        ...state,
        isLoading: true,
      };
    case 'FETCH_MOVIES_SUCCESS':
      return {
        ...state,
        isLoading: false,
        result: state.result?.concat(action.payload.results),
        page: action.payload.page,
      };
    case 'FETCH_MOVIES_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
        result: [],
        error: action.error,
      };
    default:
      return state;
  }
};

export const useApiFetch = (
  initialUrl: string,
): [State, React.Dispatch<React.SetStateAction<string>>] => {
  const [url, setUrl] = useState(initialUrl);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    result: [],
    page: 1,
  });
  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: 'FETCH_MOVIES' });

      try {
        const result = await moviesItAPI.get(url);
        if (!didCancel) {
          dispatch({
            type: 'FETCH_MOVIES_SUCCESS',
            payload: result.data,
          });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_MOVIES_FAILURE', isError: true, error: error.message });
        }
      }
    };
    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url]);

  return [state, setUrl];
};
