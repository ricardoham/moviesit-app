import React, { Suspense, useEffect } from 'react';
import { moviesItAPI } from 'api';

const MoviesContainer = (): JSX.Element => {
  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await moviesItAPI.get('/tmdb');
      } catch (err) {
        console.error(err);
      }
    };
    getMovie();
  }, []);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>} />
    </div>
  );
};

export default MoviesContainer;
