import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import { useFetch } from 'hooks/useFetch';
import { Deposition } from 'model/profile';
import CommentsList from 'components/CommentsList';
import { ICommentList } from 'model/commentList';
import { useApiOperation } from 'hooks/useApiOperation';
import DepositionForm from '../DepositionForm';

interface Props {
  profileId?: string;
  ownProfile?: boolean;
}

const ProfileDeposition = ({ profileId, ownProfile }: Props): JSX.Element => {
  const [{ data, loadingFetch }, doFetch, fetchData] = useFetch<Deposition[]>(`/deposition/profile/${profileId}`);
  const [loadingDelete, deleteData] = useApiOperation({ operation: 'delete' });
  const [editComment, setEditComment] = useState<ICommentList>();

  const handleRemoveDeposition = async (id?: string) => {
    try {
      await deleteData({ url: `/deposition/${id}` });
    } catch (error) {
      console.error(error);
    } finally {
      fetchData();
    }
  };

  const handleEditComment = useCallback((c: ICommentList) => {
    setEditComment(c);
  }, [editComment]);

  const handleEditCommentSend = useCallback(() => {
    setEditComment(undefined);
  }, [editComment]);

  const listData: ICommentList[] | undefined = useMemo(() => data?.map((item) => ({
    _id: item._id as string,
    id: item.id as string,
    createdBy: item.createdBy,
    createdById: item.depositionUserId,
    comment: item.talk,
  })), [profileId, data]);

  return (
    <Box>
      {
        loadingFetch ? <Spinner size="xl" /> : (
          <>
            <CommentsList
              ownProfile={ownProfile}
              data={listData}
              onRemoveComment={handleRemoveDeposition}
              onEditComment={handleEditComment}
            />
            {
              !ownProfile
            && <DepositionForm profileId={profileId} />
            }
          </>
        )
      }
    </Box>
  );
};

export default ProfileDeposition;
