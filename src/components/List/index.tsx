import React, { useState } from 'react';
import {
  Box, Button, ButtonGroup, Image, List, ListItem, Text, Heading,
} from '@chakra-ui/react';
import { ListModel } from 'model/list';

interface Props {
  listType: 'tmdb' | 'movies' | 'persons';
  data?: ListModel[];
  loading: boolean;
  onShowDetails: (item?: number | string) => void;
  onRemoveItem?: (id?:string) => Promise<void>;
  onAddRecommendation?: (item?: number | string) => void;
}

const ListItems = ({
  data,
  loading,
  listType,
  onShowDetails,
  onAddRecommendation,
  onRemoveItem,
}: Props): JSX.Element => {
  const [list, setList] = useState(data);
  const [isLoading, setLoading] = useState(false);

  return (
    <List>
      {
        list?.map((item) => (
          <ListItem
            key={item.id}
            m={4}
            p={2}
            display={{ md: 'flex' }}
            bg="white"
            onClick={listType === 'tmdb' ? () => onShowDetails(item.id) : undefined}
            cursor={listType === 'tmdb' ? 'pointer' : 'auto'}
            boxShadow="0 4px 8px 0 rgba(0,0,0,0.2)"
          >
            <Box flexShrink={0}>
              <Image
                src={`https://image.tmdb.org/t/p/original/${item.poster}`}
                borderRadius="lg"
                width={{ md: 48 }}
              />
            </Box>
            <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }} overflow="hidden" display="flex" flexFlow="column">
              <Box>
                <Text fontWeight="bold" fontSize="lg">{item.header}</Text>
                <Text>{item.overview}</Text>
              </Box>
              {
              (listType === 'movies' || listType === 'persons') && (
                <ButtonGroup mt="auto" p={2}>
                  <Button
                    type="button"
                    variant="outline"
                    colorScheme="blue"
                    disabled={isLoading}
                    onClick={() => onShowDetails(item.itemId)}
                  >
                    Ver mais detalhes
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    colorScheme="red"
                    disabled={isLoading}
                    onClick={() => onRemoveItem && onRemoveItem(item._id)}
                  >
                    Remover
                  </Button>
                </ButtonGroup>
              )
            }
            </Box>
          </ListItem>
        ))
      }
    </List>
  );
};

export default ListItems;
