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
    <Box bg="white">
      {
        loadingFetch ? <Spinner m={8} />
          : (
            <>
              {
                !data?.length
                  ? (
                    <Box m={8}>
                      <Text>Não há comentários reportados no momento</Text>
                    </Box>
                  )
                  : (
                    <List>
                      {
                data?.map((item) => (
                  <ListItem key={item.id}>
                    <Text fontWeight="bold" mt={4}>
                      Reportado por
                    </Text>
                    <Text>
                      {item.userReportName}
                    </Text>
                    <Box>
                      <Text fontWeight="bold" mt={4}>
                        Detalhes
                      </Text>
                      <Text>
                        {`Comentário feito por: ${item.commentCreatedBy}`}
                      </Text>
                      <Text>
                        {`Comentário: ${item.comment}`}
                      </Text>
                      <ButtonGroup mt={4}>
                        <Button
                          colorScheme="red"
                          onClick={() => handleRemoveComment(item.commentedItemId, item._id)}
                        >
                          Excluir comentário
                        </Button>
                      </ButtonGroup>
                    </Box>
                  </ListItem>
                ))
              }
                    </List>
                  )
                }
            </>

          )
       }
    </Box>
  );
};

export default CommentsReported;
