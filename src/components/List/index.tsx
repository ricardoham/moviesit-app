import React from 'react';
import {
  Box, Image, List, ListItem, Text,
} from '@chakra-ui/react';
import { TMDB } from 'model/tmbd';

interface Props {
  data: TMDB[];
  loading: boolean;
}

const ListItems = ({ data, loading }: Props): JSX.Element => {
  console.log(loading);

  return (
    <List>
      {
        data.map((item) => (
          <ListItem key={item.id} m={4} p={2} display={{ md: 'flex' }} bg="white">
            <Box flexShrink={0}>
              <Image
                src={`https://image.tmdb.org/t/p/original/${item.posterPath}`}
                borderRadius="lg"
                width={{ md: 48 }}
              />
            </Box>
            <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }} overflow="hidden">
              <Text fontWeight="bold" fontSize="lg">{item.title}</Text>
              <Text>{item.overview}</Text>
            </Box>
          </ListItem>
        ))
      }
    </List>
  );
};

export default ListItems;
