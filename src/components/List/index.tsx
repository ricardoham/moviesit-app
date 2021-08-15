import React from 'react';
import {
  Box, Button, ButtonGroup, Image, List, ListItem, Text,
} from '@chakra-ui/react';
import { TMDBMovieDetail } from 'model/tmbd';

interface Props {
  listType: 'tmdb' | 'movies' | 'persons';
  data: TMDBMovieDetail[];
  loading: boolean;
  onShowDetails: (item?: number | string) => void;
  onRemoveItem?: (item?: number | string) => void;
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
  console.log(loading);

  return (
    <List>
      {
        data.map((item) => (
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
                src={`https://image.tmdb.org/t/p/original/${item.posterPath}`}
                borderRadius="lg"
                width={{ md: 48 }}
              />
            </Box>
            <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }} overflow="hidden">
              <Text fontWeight="bold" fontSize="lg">{item.title}</Text>
              <Text>{item.overview}</Text>
              {
              (listType === 'movies' || listType === 'persons') && (
                <ButtonGroup mt={14}>
                  {
                    listType === 'movies'
                    && (
                    <Button
                      type="button"
                      onClick={() => onAddRecommendation && onAddRecommendation(item.id)}
                    >
                      Adicionar em recomendação
                    </Button>
                    )
                  }
                  <Button type="button" onClick={() => onShowDetails(item.movieId)}>Ver mais detalhes</Button>
                  <Button type="button" onClick={() => onRemoveItem && onRemoveItem(item.id)}>Remover</Button>
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
