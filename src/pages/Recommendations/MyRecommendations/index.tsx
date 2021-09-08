import React, { useEffect, useMemo } from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';
import { useFetch } from 'hooks/useFetch';
import { Recommendations } from 'model/recommendations';
import ListCard from 'components/ListCard';
import { useHistory } from 'react-router-dom';
import { useApiOperation } from 'hooks/useApiOperation';
import { useAuth0 } from '@auth0/auth0-react';
import { GenPdf } from 'model/genPdf';
import { PDFDownloadLink } from '@react-pdf/renderer';
import GeneratorPdf from 'components/GeneratorPdf';
import useIsMounted from 'hooks/useMount';

const MyRecommendations = (): JSX.Element => {
  const { user } = useAuth0();
  const [{ data, loadingFetch }, doFetch, fetchData] = useFetch<Recommendations[]>();
  const [loadingDelete, deleteData] = useApiOperation({ operation: 'delete' });
  const history = useHistory();
  const isMounted = useIsMounted();

  const handleEditRecommendation = (recommendation: Recommendations) => {
    history.push('/myrecommendations/form/edit', { recommendation });
  };

  const handleRemoveRecommendation = async (id?: string) => {
    try {
      await deleteData({ url: `/recommendations/${id}` });
    } catch (error) {
      console.error(error);
    } finally {
      fetchData();
    }
  };

  useEffect(() => {
    if (isMounted()) doFetch(`/recommendations/user/${user?.sub}`);
  }, [isMounted]);

  const dataPdf: GenPdf[] | undefined = useMemo(() => data?.map((item) => ({
    id: item.id as string,
    itemTitle: item.title,
    overview: item.description,
    createdAt: item.createdAt,
    movies: item.movies,
  })), [data]);

  return (
    <Box>
      <Button onClick={() => history.push('/myrecommendations/form')}>Nova recomendação</Button>
      <Heading as="h1" size="lg">Minhas recomendações</Heading>
      <PDFDownloadLink
        document={(
          <GeneratorPdf
            type="recommendation"
            section="Minhas recomendações"
            data={dataPdf}
          />
              )}
        fileName="somename.pdf"
      >
        {({
          blob, url, loading, error,
        }) => (loading ? 'Loading document...' : 'Download now!')}
      </PDFDownloadLink>
      {
        !loadingFetch && (
          <ListCard
            isLoading={loadingDelete}
            data={data || []}
            ownRecommendation
            onEditCardItem={
              (recommendation: Recommendations) => handleEditRecommendation(recommendation)
            }
            onRemoveCardItem={
              (id?: string) => handleRemoveRecommendation(id)
            }
          />
        )
      }
    </Box>
  );
};

export default MyRecommendations;
