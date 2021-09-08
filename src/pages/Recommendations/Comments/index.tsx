import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react';
import {
  Box, Divider, Heading, useToast,
} from '@chakra-ui/react';
import { useFetch } from 'hooks/useFetch';
import { Recommendations } from 'model/recommendations';
import { useApiOperation } from 'hooks/useApiOperation';
import { Comments } from 'model/comments';
import CommentsList from 'components/CommentsList';
import { ICommentList } from 'model/commentList';
import { useAuth0 } from '@auth0/auth0-react';
import CommentsForm from 'components/CommentsForm';
import useIsMounted from 'hooks/useMount';

interface Props {
  recommendationId?: string;
}

const RecommendationComments = ({ recommendationId }: Props): JSX.Element => {
  const { user } = useAuth0();
  const [{ data, loadingFetch }, doFetch, fetchData] = useFetch<Comments[]>();
  const [loadingDelete, deleteData] = useApiOperation({ operation: 'delete' });
  const [loadingPost, insertData] = useApiOperation({ operation: 'insert' });
  const isMounted = useIsMounted();
  const [comment, setComment] = useState<Comments>();
  const toast = useToast();

  const handleRemoveComment = async (id?: string) => {
    try {
      await deleteData({ url: `/comments/${id}` });
    } catch (error) {
      toast({
        title: 'Error inesperado',
        status: 'error',
        isClosable: true,
        position: 'top',
      });
    } finally {
      fetchData();
    }
  };

  const handleReportComment = async (commentReport: Comments) => {
    try {
      const reportComment = {
        userId: user?.sub,
        userReportName: user?.name,
        userReportedId: commentReport.userId,
        commentedItemId: commentReport._id,
        commentCreatedBy: commentReport.createdBy,
        commentCreatedAt: commentReport.createdAt,
        comment: commentReport.comment,
      };

      await insertData({ url: '/bancomment', body: reportComment });
    } catch (error) {
      toast({
        title: 'Error inesperado',
        status: 'error',
        isClosable: true,
        position: 'top',
      });
    }
  };

  useEffect(() => {
    if (isMounted()) doFetch(`/comments/recommendation/${recommendationId}`);
  }, [isMounted]);

  const handleEditComment = useCallback((c: Comments) => {
    setComment(c);
  }, [comment]);

  const handleEditCommentSend = useCallback(() => {
    setComment(undefined);
  }, [comment]);

  const listData: ICommentList[] | undefined = useMemo(() => data?.map((item) => ({
    _id: item._id as string,
    id: item.id as string,
    commentedItemId: item.commentedItemId,
    createdBy: item.createdBy,
    createdById: item.userId,
    createdAt: item.createdAt,
    comment: item.comment,
  })), [recommendationId, data]);

  return (
    <Box mt={4}>
      <Heading size="md" mb={4}>Comentarios</Heading>
      <CommentsList
        type="comment"
        data={listData}
        userId={user?.sub}
        onRemoveComment={handleRemoveComment}
        onEditComment={handleEditComment}
        onReportComment={handleReportComment}
      />
      <Divider />
      <Heading size="md">Novo comentário</Heading>
      <CommentsForm
        type="comment"
        comments={comment}
        itemId={recommendationId}
        onFetchComments={fetchData}
        onSendEdit={handleEditCommentSend}
      />
    </Box>
  );
};

export default RecommendationComments;
