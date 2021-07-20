import React from 'react';
import { Button, Image, Text } from '@chakra-ui/react';
import { CloseBar } from 'components/CloseBar';
import { useHistory, useParams } from 'react-router-dom';
import { useFetch } from 'hooks/useFetch';
import { TMDB } from 'model/tmbd';

interface Props {
  onClose: () => void;
}

// TODO implement a modal instead to persist search data

const MoviesDetails = ({ onClose }: Props): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [{ data, isLoading, isError }] = useFetch<TMDB>(`/tmdb/${id}`);

  const history = useHistory();
  return (
    <div>
      <CloseBar onClose={() => history.push('/movies')} />
      <Image
        src={`https://image.tmdb.org/t/p/original/${data?.posterPath}`}
        borderRadius="lg"
        w={[200, 250, 300]}
      />
      <Text>{data?.title}</Text>
      <Text>{data?.overview}</Text>
      <Button />
    </div>
  );
};

export default MoviesDetails;
