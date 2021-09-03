import React from 'react';
import { Box } from '@chakra-ui/react';
import { Deposition } from 'model/profile';

interface Props {
  data?: Deposition[]
}

const DepositionList = ({ data }: Props): JSX.Element => {
  console.log('aaa');

  return (
    <Box>
      {
        data?.map((item) => (
          <span>{item.talk}</span>
        ))
      }
    </Box>
  );
};

export default DepositionList;
