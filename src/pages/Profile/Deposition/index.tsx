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
import { PDFDownloadLink } from '@react-pdf/renderer';
import GeneratorPdf from 'components/GeneratorPdf';
import { GenPdf } from 'model/genPdf';

interface Props {
  profileId?: string;
  userId?: string;
  userParamsId?: string;
  ownProfile?: boolean;
}

const ProfileDeposition = ({
  profileId, userId, userParamsId, ownProfile,
}: Props): JSX.Element => {
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
      {
        loadingFetch ? <Spinner size="xl" /> : (
          <>
            {
              (!userParamsId || ownProfile) && (
              <PDFDownloadLink
                document={(
                  <GeneratorPdf
                    section="Minhas depoimentos"
                    data={dataPdf}
                  />
                    )}
                fileName="somename.pdf"
              >
                {({
                  blob, url, loading, error,
                }) => (loading ? 'Loading document...' : 'Download now!')}
              </PDFDownloadLink>
              )
            }
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
