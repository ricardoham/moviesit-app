import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import { useFetch } from 'hooks/useFetch';
import { Deposition } from 'model/profile';
import CommentsList from 'components/CommentsList';
import { ICommentList } from 'model/commentList';
import { useApiOperation } from 'hooks/useApiOperation';
import CommentsForm from 'components/CommentsForm';

interface Props {
  profileId?: string;
  userId?: string;
  userParamsId?: string;
}

const ProfileDeposition = ({ profileId, userId, userParamsId }: Props): JSX.Element => {
  const [{ data, loadingFetch }, doFetch, fetchData] = useFetch<Deposition[]>(`/deposition/profile/${profileId}`);
  const [loadingDelete, deleteData] = useApiOperation({ operation: 'delete' });
  const [comment, setComment] = useState<ICommentList>();

  const handleRemoveDeposition = async (id?: string) => {
    try {
      await deleteData({ url: `/deposition/${id}` });
    } catch (error) {
      console.error(error);
    } finally {
      fetchData();
    }
  };

  console.log('userId', userId);

  const handleEditComment = useCallback((c: ICommentList) => {
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
  })), [profileId, data]);

  console.log('IDFORM', userParamsId);
  // console.log('ownProfile', ownProfile);

  return (
    <Box>
      {
        loadingFetch ? <Spinner size="xl" /> : (
          <>
            <CommentsList
              type="deposition"
              userId={userId}
              data={listData}
              onRemoveComment={handleRemoveDeposition}
              onEditComment={handleEditComment}
            />
            {
              (userParamsId !== userId && userParamsId !== undefined)
            && (
            <CommentsForm
              type="deposition"
              itemId={profileId}
              comments={comment}
              onFetchComments={fetchData}
              onSendEdit={handleEditCommentSend}
            />
            )
            }
          </>
        )
      }
    </Box>
  );
};

export default ProfileDeposition;
