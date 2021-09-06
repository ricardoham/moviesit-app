import React, { useMemo } from 'react';
import {
  Box, Button, ButtonGroup, Divider, Heading, IconButton, Text,
} from '@chakra-ui/react';
import { useFetch } from 'hooks/useFetch';
import { Comments } from 'model/comments';
import { IoWarningOutline } from 'react-icons/io5';
import { useAuth0 } from '@auth0/auth0-react';

interface Props {
  userId?: string;
  recommendationId?: string;
  data?: Comments[];
  onRemoveComment: (id?: string) => void;
  onEditComment: (comment: Comments) => void;
}

const CommentsList = ({
  data, recommendationId, userId, onRemoveComment, onEditComment,
}: Props): JSX.Element => {
  const { user } = useAuth0();

  return (
    <Box
      overflowY="auto"
      height="300px"
    >
      {
        data?.map((item) => (
          <Box key={item.id} display="flex" flexFlow="column">
            <Box display="flex" alignItems="center">
              <Box flex="1" display="flex" alignItems="center">
                <Text>
                  Comentado por:
                </Text>
                <Heading ml={2} size="sm">
                  {item.createdBy}
                </Heading>
              </Box>
              {
                (item.userId === user?.sub)
                  ? (
                    <ButtonGroup>
                      <Button
                        variant="outline"
                        onClick={() => onEditComment(item)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => onRemoveComment(item._id)}
                      >
                        Remover
                      </Button>
                    </ButtonGroup>
                  )
                  : <IconButton variant="ghost" aria-label="Reportar Usuario" size="md" fontSize="25px" icon={<IoWarningOutline />} />
              }
            </Box>
            <Text>{item.comment}</Text>
          </Box>
        ))
      }
    </Box>
  );
};

export default CommentsList;
