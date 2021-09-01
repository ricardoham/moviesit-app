import React from 'react';
import {
  Box, Button, ButtonGroup, Heading, Image, List, ListItem, Text,
} from '@chakra-ui/react';
import { Recommendations } from 'model/recommendations';
import { useHistory } from 'react-router-dom';

interface Props {
  isLoading?: boolean;
  data: Recommendations[];
  ownRecommendation?: boolean;
  onEditRecommendation?: (recommendation: Recommendations) => void;
  onRemoveRecommendation?: (id?: string) => void;
}

const ListCard = ({
  isLoading, data, ownRecommendation, onEditRecommendation, onRemoveRecommendation,
}: Props): JSX.Element => {
  const history = useHistory();
  return (
    <Box>
      <List>
        {
        data.map((item) => (
          <ListItem
            key={item.id}
            p={3}
          >
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
                {
                  !ownRecommendation
                  && (
                  <Box>
                    <Text>Feito por</Text>
                    {' '}
                    <Text fontWeight="bold">{item.createdBy}</Text>
                  </Box>
                  )
                }
              </Box>
              <Box>
                <Text fontWeight="bold">Filmes 🎭</Text>
                {
                  item.movies?.map((m) => (
                    <Text pl={2} key={m.movieId}>{m.title}</Text>
                  ))
                }
              </Box>
              <Text>
                {item.description}
              </Text>
              {
              !ownRecommendation
              && (
              <Button
                variant="outline"
                colorScheme="blue"
                onClick={() => history.push('/recommendations/details', { recommendation: item })}
              >
                Ver detalhes
              </Button>
              )
               }
              {
                ownRecommendation && (
                  <ButtonGroup spacing={4} space mt={8}>
                    <Button
                      variant="outline"
                      colorScheme="blue"
                      onClick={() => history.push('/recommendations/details', { recommendation: item })}
                    >
                      Ver detalhes
                    </Button>
                    <Button
                      colorScheme="teal"
                      variant="outline"
                      onClick={() => onEditRecommendation && onEditRecommendation(item)}
                    >
                      Editar
                    </Button>
                    <Button
                      isLoading={isLoading}
                      colorScheme="red"
                      variant="outline"
                      onClick={() => onRemoveRecommendation && onRemoveRecommendation(item._id)}
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
    </Box>
  );
};

export default ListCard;
