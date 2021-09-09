import React, { useEffect } from 'react';
import {
  Box, Heading, Button, ButtonGroup, Divider, Spinner, useToast,
} from '@chakra-ui/react';
import ChartReport from 'pages/AdminDashboard/ChartReport';
import { useFetch } from 'hooks/useFetch';
import { ReportData } from 'model/reportData';
import useIsMounted from 'hooks/useMount';
import useWindowDimensions from 'hooks/useWindowDimensions';
import CommentsReported from './CommentsReported';

const AdminDashboard = (): JSX.Element => {
  const [{ data, loadingFetch }, doFetch, fetchData] = useFetch<ReportData>();
  const isMounted = useIsMounted();
  const dimensions = useWindowDimensions();
  const toast = useToast();

  const handleRefreshData = async () => {
    try {
      await fetchData();
    } catch (error) {
      toast({
        title: 'Error ao carregar os dados',
        status: 'error',
        isClosable: true,
        position: 'top',
      });
    }
  };

  useEffect(() => {
    if (isMounted()) doFetch('/report');
    setTimeout(() => {

    }, 3000);
  }, [isMounted]);

  return (
    <Box p={4} bg="white" m={2}>
      {
        loadingFetch ? <Spinner />
          : (
            <>
              <Box>
                <Heading>
                  Comentarios Reportados
                </Heading>
                { isMounted() && <CommentsReported /> }
              </Box>
              <Divider m="12px 0px" />
              <Box display="flex" flexFlow="column">
                <Heading>
                  Relátorios
                </Heading>
                { (isMounted() && dimensions) && <ChartReport dataReport={data} /> }
                <ButtonGroup alignSelf="center" mt={4}>
                  <Button
                    colorScheme="blue"
                    onClick={handleRefreshData}
                    isLoading={loadingFetch}
                  >
                    Atualizar dados
                  </Button>
                </ButtonGroup>
              </Box>
            </>
          )
      }
    </Box>
  );
};
export default AdminDashboard;
