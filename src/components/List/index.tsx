import React, { useState } from 'react';
import {
  Box, Button, ButtonGroup, Image, List, ListItem, Text,
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

  // const handleRemoveItem = async (itemId?: number | string) => {
  //   setLoading(true);
  //   try {
  //     if (itemId && onRemoveItem) {
  //       await onRemoveItem(itemId);
  //       const newList = list?.filter((l) => l.id !== itemId);
  //       setList(newList);
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  //   setLoading(false);
  // };

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
          >
            <Box flexShrink={0}>
              <Image
                src={`https://image.tmdb.org/t/p/original/${item.poster}`}
                borderRadius="lg"
                width={{ md: 48 }}
              />
            </Box>
            <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }} overflow="hidden">
              <Text fontWeight="bold" fontSize="lg">{item.header}</Text>
              <Text>{item.overview}</Text>
              {
              (listType === 'movies' || listType === 'persons') && (
                <ButtonGroup mt={14}>
                  <Button
                    type="button"
                    disabled={isLoading}
                    onClick={() => onShowDetails(item.movieId)}
                  >
                    Ver mais detalhes

                  </Button>
                  <Button
                    type="button"
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
