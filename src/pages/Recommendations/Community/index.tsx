import React, { useEffect, useMemo } from 'react';
import {
  Box, Heading, Spinner, Text,
} from '@chakra-ui/react';
import { Recommendations } from 'model/recommendations';
import { useFetch } from 'hooks/useFetch';
import ListCard from 'components/ListCard';
import useIsMounted from 'hooks/useMount';
import PDFLink from 'components/PDFLink';
import { GenPdf } from 'model/genPdf';

const CommunityRecommendations = (): JSX.Element => {
  const [{ data, loadingFetch }, doFetch, fetchData] = useFetch<Recommendations[]>();
  const isMounted = useIsMounted();

  useEffect(() => {
    if (isMounted()) doFetch('/recommendations');
  }, [isMounted]);

  const dataPdf: GenPdf[] | undefined = useMemo(() => data?.map((item) => ({
    id: item.id as string,
    itemTitle: item.title,
    overview: item.description,
    movies: item.movies,
    createdAt: item.createdAt,
    createdBy: item.createdBy,
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
      <Heading as="h3" size="lg">Recomendações da comunidade</Heading>
      {
        data?.length
          ? (
            <PDFLink
              type="recommendation"
              section="Recomendações da comunidade"
              data={dataPdf}
              fileName="recommendationcomuni.pdf"
            />
          ) : null
      }
      {
        loadingFetch ? <Spinner alignSelf="center" /> : (
          <>
            {
            !data?.length ? <Text p={4}>Não ha recomendações no momento</Text>
              : <ListCard data={data || []} />
          }
          </>
        )
      }
    </Box>
  );
};

export default CommunityRecommendations;
