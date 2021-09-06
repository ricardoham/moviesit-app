import React from 'react';
import {
  Box, List, ListItem, Text, Button, ButtonGroup, Spinner,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { useFetch } from 'hooks/useFetch';
import { CommentReport } from 'model/comments';
import { useApiOperation } from 'hooks/useApiOperation';

const CommentsReported = ():JSX.Element => {
  const [{ data, loadingFetch }, doFetch, fetchData] = useFetch<CommentReport[]>('/bancomment');
  const [loadingDelete, deleteData] = useApiOperation({ operation: 'delete' });
  const history = useHistory();

  const handleRemoveComment = async (commentId?: string, banId?: string) => {
    try {
      await deleteData({ url: `/comments/${commentId}` });
      await deleteData({ url: `/bancomment/${banId}` });
    } catch (error) {
      console.error(error);
    } finally {
      fetchData();
    }
  };

  return (
    <Box>
      {
        loadingFetch ? <Spinner />

          : (
            <List>
              {
        data?.map((item) => (
          <ListItem key={item.id}>
            <Text fontWeight="bold">
              Reportado por
            </Text>
            <Text>
              {item.userReportName}
            </Text>
            <Box>
              <Text fontWeight="bold">
                Detalhes:
              </Text>
              <Text>
                Comentário feito por:
                {item.commentCreatedBy}
              </Text>
              <Text>
                Comentário:
                {item.comment}
              </Text>
              <Box>
                <ButtonGroup>
                  <Button
                    onClick={() => handleRemoveComment(item.commentedItemId, item._id)}
                  >
                    Excluir comentário
                  </Button>
                </ButtonGroup>
              </Box>
            </Box>
          </ListItem>
        ))
        }
            </List>
          )
       }
    </Box>
  );
};

export default CommentsReported;
