import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Divider, Heading, Text,
} from '@chakra-ui/react';
import { useFetch } from 'hooks/useFetch';
import { Recommendations } from 'model/recommendations';
import { useApiOperation } from 'hooks/useApiOperation';
import { Comments } from 'model/comments';
import CommentsForm from '../CommentsForm';
import CommentsList from '../CommentsList';

interface Props {
  recommendationId?: string;
}

const RecommendationComments = ({ recommendationId }: Props): JSX.Element => {
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

  return (
    <Box mt={4}>
      <Heading size="md" mb={4}>Comentarios</Heading>
      <CommentsList
        data={data}
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
