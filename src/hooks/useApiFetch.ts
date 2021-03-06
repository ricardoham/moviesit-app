import React, {
  useEffect, useReducer, useState,
} from 'react';
import { moviesItAPI } from 'api';
import { TMDB, TMDBMovieDetail, TMDBResults } from 'model/tmbd';

type State = {
  isLoading: boolean,
  isError: boolean,
  result: TMDBMovieDetail[],
  page: number,
  totalPages: number;
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
        result: action.payload.results,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
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
  initialUrl?: string,
  currentPage?: number,
): [State, React.Dispatch<React.SetStateAction<string>>] => {
  const [url, setUrl] = useState('');
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    result: [],
    page: 1,
    totalPages: 0,
  });

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      if (!url) return;
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
  }, [url, currentPage]);

  return [state, setUrl];
};
