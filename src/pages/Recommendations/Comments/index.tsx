import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react';
import {
  Box, Divider, Heading, Text,
} from '@chakra-ui/react';
import { useFetch } from 'hooks/useFetch';
import { Recommendations } from 'model/recommendations';
import { useApiOperation } from 'hooks/useApiOperation';
import { Comments } from 'model/comments';
import CommentsList from 'components/CommentsList';
import { ICommentList } from 'model/commentList';
import { useAuth0 } from '@auth0/auth0-react';
import CommentsForm from '../CommentsForm';

interface Props {
  recommendationId?: string;
}

const RecommendationComments = ({ recommendationId }: Props): JSX.Element => {
  const { user } = useAuth0();
  const [{ data, loadingFetch }, doFetch, fetchData] = useFetch<Comments[]>(`/comments/recommendation/${recommendationId}`);
  const [loadingDelete, deleteData] = useApiOperation({ operation: 'delete' });
  const [comment, setComment] = useState<Comments>();

  const handleRemoveComment = async (id?: string) => {
    try {
      await deleteData({ url: `/comments/${id}` });
    } catch (error) {
      console.error(error);
    } finally {
      fetchData();
    }
  };

  const handleEditComment = useCallback((c: Comments) => {
    setComment(c);
  }, [comment]);

  const handleEditCommentSend = useCallback(() => {
    setComment(undefined);
  }, [comment]);

  const listData: ICommentList[] | undefined = useMemo(() => data?.map((item) => ({
    _id: item._id as string,
    id: item.id as string,
    createdBy: item.createdBy,
    createdById: item.userId,
    comment: item.comment,
  })), [recommendationId, data]);

  return (
    <Box mt={4}>
      <Heading size="md" mb={4}>Comentarios</Heading>
      <CommentsList
        data={listData}
        userId={user?.sub}
        recommendationId={recommendationId}
        onRemoveComment={handleRemoveComment}
        onEditComment={handleEditComment}
      />
      <Divider />
      <Heading size="md">Novo comentário</Heading>
      <CommentsForm
        comments={comment}
        recommendationId={recommendationId}
        onFetchComments={fetchData}
        onSendEdit={handleEditCommentSend}
      />
    </Box>
  );
};

export default RecommendationComments;
