import React, { useState } from 'react';
import {
  Box, Button, ButtonGroup, Image, List, ListItem, Text,
} from '@chakra-ui/react';
import { ListModel } from 'model/list';
import { Movies } from 'model/recommendations';

interface Props {
  listType: 'tmdb' | 'movies' | 'persons';
  data?: ListModel[];
  loading: boolean;
  onShowDetails?: (item?: number | string) => void;
  onRemoveItem?: (item?: number | string) => Promise<void>;
  onAddRecommendation?: (item?: number | string) => void;
  onSelectMovies?: (movie: Movies) => void;
}

const ListSearch = ({
  data,
  loading,
  listType,
  onShowDetails,
  onAddRecommendation,
  onRemoveItem,
  onSelectMovies,
}: Props): JSX.Element => {
  const [list, setList] = useState(data);
  const [isLoading, setLoading] = useState(false);

  const handleRemoveItem = async (itemId?: number | string) => {
    setLoading(true);
    try {
      if (itemId && onRemoveItem) {
        await onRemoveItem(itemId);
        const newList = list?.filter((l) => l.id !== itemId);
        setList(newList);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

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
            onClick={() => onSelectMovies
              && onSelectMovies({ movieId: item.id, title: item.header, genres: item.genres })}
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
                  {
                    listType === 'movies'
                    && (
                    <Button
                      type="button"
                      disabled={isLoading}
                      onClick={() => onAddRecommendation && onAddRecommendation(item.id)}
                    >
                      Adicionar em recomendação
                    </Button>
                    )
                  }
                  <Button
                    type="button"
                    disabled={isLoading}
                    onClick={() => onShowDetails && onShowDetails(item.tmdbId)}
                  >
                    Ver mais detalhes

                  </Button>
                  <Button
                    type="button"
                    disabled={isLoading}
                    isLoading={isLoading}
                    onClick={() => handleRemoveItem(item.id)}
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

export default ListSearch;
