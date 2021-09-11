import React, { useEffect, useMemo } from 'react';
import {
  Box, Button, Heading, useToast, Spinner,
} from '@chakra-ui/react';
import { useFetch } from 'hooks/useFetch';
import { Recommendations } from 'model/recommendations';
import ListCard from 'components/ListCard';
import { useHistory } from 'react-router-dom';
import { useApiOperation } from 'hooks/useApiOperation';
import { useAuth0 } from '@auth0/auth0-react';
import { GenPdf } from 'model/genPdf';
import useIsMounted from 'hooks/useMount';
import PDFLink from 'components/PDFLink';
import EmptyState from 'components/EmptyState';

const MyRecommendations = (): JSX.Element => {
  const { user } = useAuth0();
  const [{ data, loadingFetch }, doFetch, fetchData] = useFetch<Recommendations[]>();
  const [loadingDelete, deleteData] = useApiOperation({ operation: 'delete' });
  const history = useHistory();
  const isMounted = useIsMounted();
  const toast = useToast();

  const handleEditRecommendation = (recommendation: Recommendations) => {
    history.push('/myrecommendations/form/edit', { recommendation });
  };

  const handleRemoveRecommendation = async (id?: string) => {
    try {
      await deleteData({ url: `/recommendations/${id}` });
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
    <Box
      bg="white"
      display="flex"
      flexFlow="column"
      p={4}
      m={2}
      h="140vh"
    >
      <Heading as="h3" size="lg">Minhas recomendações</Heading>
      <Box alignSelf="flex-end">
        <Button
          mb={4}
          variant="outline"
          colorScheme="teal"
          onClick={() => history.push('/myrecommendations/form')}
        >
          Nova recomendação
        </Button>
        <PDFLink
          type="recommendation"
          section="Minhas recomendações"
          data={dataPdf}
          fileName="myrecommendations.pdf"
        />
      </Box>
      {
        loadingFetch ? <Spinner alignSelf="center" /> : (
          <>
            {
            !data?.length ? <EmptyState noItem="Recomendação" /> : (
              <>
                <ListCard
                  fromMyRecommendations
                  ownRecommendation
                  isLoading={loadingDelete}
                  data={data || []}
                  onEditCardItem={
              (recommendation: Recommendations) => handleEditRecommendation(recommendation)
            }
                  onRemoveCardItem={
              (id?: string) => handleRemoveRecommendation(id)
            }
                />
              </>
            )
      }
          </>
        )
    }
    </Box>
  );
};

export default MyRecommendations;
