import React from 'react';
import {
  Box, Button, ButtonGroup, Heading, Image, List, ListItem, Text,
} from '@chakra-ui/react';
import { Recommendations } from 'model/recommendations';
import { useHistory } from 'react-router-dom';
import { IListCard } from 'model/listCard';
import { localDate } from 'utils/localDate';

interface Props {
  isLoading?: boolean;
  data: IListCard[];
  ownRecommendation?: boolean;
  onEditCardItem?: (recommendation: Recommendations) => void;
  onRemoveCardItem?: (id?: string) => void;
}

const ListCard = ({
  isLoading, data, ownRecommendation, onEditCardItem, onRemoveCardItem,
}: Props): JSX.Element => {
  const history = useHistory();
  return (
    <Box>
      <List>
        {
        data.map((item) => (
          <ListItem
            key={item?.id}
            p={3}
          >
            <Box
              bg="white"
              p={3}
              borderRadius="4px"
            >
              <span>{item?.dueDate}</span>
              <Box
                display="flex"
                alignItems="center"
                mb="8px"
              >
                <Heading flex={1}>{item?.title}</Heading>
                {
                  !ownRecommendation
                  && (
                  <Box>
                    <Text>Feito por</Text>
                    {' '}
                    <Text
                      cursor="pointer"
                      fontWeight="bold"
                      onClick={() => history.push(`/profile/details/${item.userId}`)}
                    >
                      {item.createdBy}
                    </Text>
                  </Box>
                  )
                }
              </Box>
              <Box>
                <Text fontWeight="bold">Filmes 🎭</Text>
                {
                  item.movie?.title
                  || item.movies?.map((m) => (
                    <Text pl={2} key={m.movieId}>{m.title}</Text>
                  ))
                }
              </Box>
              <Box>
                <Text fontWeight="bold">{`${item.movie ? 'Comentários' : 'Descrição'} 📝`}</Text>
                <Text>
                  {item.description}
                </Text>
                { item.movie
                  && (
                  <>
                    <Text fontWeight="bold">Data para assistir 📅</Text>
                    <Text>
                      {
                       localDate(item.dueDate)
                      }
                    </Text>
                  </>
                  )}
              </Box>
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
                  <ButtonGroup spacing={4} mt={8}>
                    {
                      !item.movie
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

                    <Button
                      colorScheme="teal"
                      variant="outline"
                      onClick={() => onEditCardItem && onEditCardItem(item)}
                    >
                      Editar
                    </Button>
                    <Button
                      isLoading={isLoading}
                      colorScheme="red"
                      variant="outline"
                      onClick={() => onRemoveCardItem && onRemoveCardItem(item._id)}
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
