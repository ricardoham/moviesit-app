import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  Box, Spinner, Heading, useToast, Text,
} from '@chakra-ui/react';
import { useFetch } from 'hooks/useFetch';
import { Deposition } from 'model/profile';
import CommentsList from 'components/CommentsList';
import { ICommentList } from 'model/commentList';
import { useApiOperation } from 'hooks/useApiOperation';
import CommentsForm from 'components/CommentsForm';
import { GenPdf } from 'model/genPdf';
import useIsMounted from 'hooks/useMount';
import PDFLink from 'components/PDFLink';

interface Props {
  profileId?: string;
  userId?: string;
  userParamsId?: string;
  ownProfile?: boolean;
}

const ProfileDeposition = ({
  profileId, userId, userParamsId, ownProfile,
}: Props): JSX.Element => {
  const isMounted = useIsMounted();
  const [{ data, loadingFetch }, doFetch, fetchData] = useFetch<Deposition[]>();
  const [loadingDelete, deleteData] = useApiOperation({ operation: 'delete' });
  const [comment, setComment] = useState<ICommentList>();
  const toast = useToast();

  useEffect(() => {
    if (isMounted()) doFetch(`/deposition/profile/${profileId}`);
  }, [isMounted]);

  const handleRemoveDeposition = async (id?: string) => {
    try {
      await deleteData({ url: `/deposition/${id}` });
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

  const dataPdf: GenPdf[] | undefined = useMemo(() => data?.map((item) => ({
    id: item.id as string,
    itemTitle: item.createdBy,
    overview: item.comment,
    createdAt: item.createdAt,
  })), [data]);

  return (
    <Box>
      <Heading mt={10} as="h4" size="md">
        Depoimentos
      </Heading>
      {
        loadingFetch ? <Spinner size="xl" /> : (
          <>
            {
              ((!userParamsId || ownProfile) && data?.length) ? (
                <PDFLink
                  section="Minhas depoimentos"
                  data={dataPdf}
                  fileName="deposition.pdf"
                />
              ) : null
            }
            {
              data?.length ? (
                <CommentsList
                  type="deposition"
                  userId={userId}
                  data={listData}
                  onRemoveComment={handleRemoveDeposition}
                  onEditComment={handleEditComment}
                />
              ) : <Text>Não há depoimentos no momento</Text>
            }

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
