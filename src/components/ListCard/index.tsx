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
  fromMyRecommendations?: boolean;
  onEditCardItem?: (recommendation: Recommendations) => void;
  onRemoveCardItem?: (id?: string) => void;
}

const ListCard = ({
  isLoading, data, ownRecommendation, onEditCardItem, onRemoveCardItem, fromMyRecommendations,
}: Props): JSX.Element => {
  const history = useHistory();
  return (
    <Box>
      <List>
        {
        data.map((item) => (
          <ListItem
            key={item?.id}
            m={[2, 4]}
            p={[0, 2]}
            boxShadow="0 4px 8px 0 rgba(0,0,0,0.2)"
          >
            <Box
              bg="white"
              p={3}
              borderRadius="4px"
            >
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
                onClick={() => history.push('/recommendations/details', { recommendation: item, isMine: fromMyRecommendations })}
              >
                Ver detalhes
              </Button>
              )
               }
              {
                ownRecommendation && (
                  <ButtonGroup spacing={4} mt={8} display="flex">
                    {
                      !item.movie
                      && (
                      <Button
                        isTruncated
                        variant="outline"
                        colorScheme="blue"
                        onClick={() => history.push('/recommendations/details', { recommendation: item, isMine: fromMyRecommendations })}
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
