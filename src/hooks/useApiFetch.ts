import React, {
  useEffect, useReducer, useState,
} from 'react';
import { moviesItAPI } from 'api';
import { TMDBResults } from 'model/tmbd';

type State = {
  isLoading: boolean,
  isError: boolean,
  payload?: TMDBResults | []
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
        payload: action.payload,
      };
    case 'FETCH_MOVIES_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
        payload: [],
        error: action.error,
      };
    default:
      return state;
  }
};

export const useApiFetch = (): [State, React.Dispatch<React.SetStateAction<string>>] => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    payload: [],
  });
  const [queryUrl, setQueryUrl] = useState('');

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: 'FETCH_MOVIES' });

      try {
        const result = await moviesItAPI.get(`/tmdb?name=${queryUrl}&page=1`);
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
  }, [queryUrl]);

  return [state, setQueryUrl];
};
