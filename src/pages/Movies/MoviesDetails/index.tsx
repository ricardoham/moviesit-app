import React from 'react';
import { Button, Image, Text } from '@chakra-ui/react';
import { CloseBar } from 'components/CloseBar';
import { useHistory } from 'react-router-dom';

interface Props {
  onClose: () => void;
}

const MoviesDetails = (): JSX.Element => {
  const history = useHistory();
  return (
    <div>
      <CloseBar onClose={() => history.push('/movies')} />
      <Image />
      <Text />
      <Text />
      <Button />
    </div>
  );
};

export default MoviesDetails;
