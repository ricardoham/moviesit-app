import React from 'react';
import {
  Box, Heading, Image, List, ListItem, Text,
} from '@chakra-ui/react';
import { Recommendations } from 'model/recommendations';

interface Props {
  data: Recommendations[];
}

const ListCard = ({ data }: Props): JSX.Element => (
  <Box>
    <List>
      {
        data.map((item) => (
          <ListItem key={item.id} p={3}>
            <Box
              bg="white"
              p={3}
              borderRadius="4px"
            >
              <Image />
              <Box
                display="flex"
                alignItems="center"
                mb="8px"
              >
                <Heading flex={1}>{item.title}</Heading>
                <Text>
                  Feito por
                  {' '}
                  <Text fontWeight="bold">{item.createdBy}</Text>
                </Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Filmes 🎭</Text>
                {
                  item.movies?.map((m) => (
                    <Text pl={2} key={m.movieId.toString()}>{m.title}</Text>
                  ))
                }
              </Box>
              <Text>
                {item.description}
              </Text>
            </Box>
          </ListItem>
        ))
      }
    </List>
  </Box>
);

export default ListCard;
