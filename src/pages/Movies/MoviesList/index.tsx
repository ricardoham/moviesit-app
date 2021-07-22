import React from 'react';
import { TMDB } from 'model/tmbd';
import ListItems from 'components/List';
import { Box } from '@chakra-ui/react';
import { CloseBar } from 'components/CloseBar';

interface Props {
  result: TMDB[];
  isLoading: boolean;
  onMovieDetails: (id: string) => void;
  onShow: () => void;
}

const MoviesSearchList = ({
  result, isLoading, onMovieDetails, onShow,
}: Props):JSX.Element => (
  <Box>
    <CloseBar onClose={onShow} />
    <ListItems
      data={result || []}
      loading={isLoading}
      onClick={onMovieDetails}
    />
  </Box>
);
export default MoviesSearchList;
