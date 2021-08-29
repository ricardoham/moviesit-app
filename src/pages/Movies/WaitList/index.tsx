import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box, Button, ButtonGroup, Heading, Text,
} from '@chakra-ui/react';
import MoviesModal from 'components/Modal';

const WaitList = (): JSX.Element => {
  const history = useHistory();

  return (
    <Box>
      <Button onClick={() => history.push('/waitlist/form')}>Criar uma nova list</Button>
      <Box>
        <h3>Minha lista para assistir depois: </h3>
      </Box>
    </Box>
  );
};
export default WaitList;
