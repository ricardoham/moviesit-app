import React, { useMemo } from 'react';
import {
  Box, Button, ButtonGroup, Divider, Heading, IconButton, Text,
} from '@chakra-ui/react';
import { useFetch } from 'hooks/useFetch';
import { Comments } from 'model/comments';
import { IoWarningOutline } from 'react-icons/io5';
import { ICommentList } from 'model/commentList';
import { useHistory } from 'react-router-dom';

interface Props {
  ownProfile?: boolean;
  userId?: string;
  recommendationId?: string;
  data?: ICommentList[];
  onRemoveComment: (id?: string) => void;
  onEditComment: (comment: ICommentList) => void;
}

const CommentsList = ({
  ownProfile, data, recommendationId, userId, onRemoveComment, onEditComment,
}: Props): JSX.Element => {
  console.log(ownProfile);
  const history = useHistory();

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
                  Comentário de:
                </Text>
                <Heading
                  ml={2}
                  size="sm"
                  cursor="pointer"
                  onClick={() => history.push(`/profile/details/${item.createdById}`)}
                >
                  {item.createdBy}
                </Heading>
              </Box>
              {
                (item.createdById === userId)
                  ? (
                    <ButtonGroup>
                      {
                        (!ownProfile || item.userId === userId)
                        && (
                        <Button
                          variant="outline"
                          onClick={() => onEditComment(item)}
                        >
                          Editar
                        </Button>
                        )
                      }
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
