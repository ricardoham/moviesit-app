import React, { useEffect } from 'react';
import {
  Box, Heading, Button, ButtonGroup, Divider, Spinner,
} from '@chakra-ui/react';
import ChartReport from 'pages/AdminDashboard/ChartReport';
import { useFetch } from 'hooks/useFetch';
import { ReportData } from 'model/reportData';
import useIsMounted from 'hooks/useMount';
import CommentsReported from './CommentsReported';

const AdminDashboard = (): JSX.Element => {
  const [{ data, loadingFetch }, doFetch, fetchData] = useFetch<ReportData>();
  const isMounted = useIsMounted();

  const handleRefreshData = async () => {
    try {
      await fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isMounted()) doFetch('/report');
  }, [isMounted]);

  return (
    <Box p={4} bg="white" mt={4}>
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
                { isMounted() && <ChartReport dataReport={data} /> }
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
