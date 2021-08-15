import React from 'react';
import { TMDB, TMDBMovieDetail } from 'model/tmbd';
import ListItems from 'components/List';
import { Box } from '@chakra-ui/react';
import { CloseBar } from 'components/CloseBar';

interface Props {
  result: TMDBMovieDetail[];
  isLoading: boolean;
  onMovieDetails: (item?: number | string) => void;
  onShow: () => void;
}

const MoviesSearchList = ({
  result, isLoading, onMovieDetails, onShow,
}: Props):JSX.Element => (
  <Box>
    <CloseBar onClose={onShow} />
    <ListItems
      data={result || []}
      listType="tmdb"
      loading={isLoading}
      onShowDetails={onMovieDetails}
    />
  </Box>
);
export default MoviesSearchList;
