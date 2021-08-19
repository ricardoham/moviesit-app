import React from 'react';
import {
  Box, Heading, Image, List, ListItem,
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
          <ListItem>
            <Box>
              <Image />
              <Heading as="h2">{item.title}</Heading>
              <Heading as="h5">{item.createdBy}</Heading>
            </Box>
          </ListItem>
        ))
      }
    </List>
  </Box>
);

export default ListCard;
