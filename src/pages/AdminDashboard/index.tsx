import React from 'react';
import {
  Box, Heading, Button, ButtonGroup,
} from '@chakra-ui/react';
import ChartReport from 'pages/AdminDashboard/ChartReport';
import { useFetch } from 'hooks/useFetch';
import { ReportData } from 'model/reportData';
import CommentsReported from './CommentsReported';

const AdminDashboard = (): JSX.Element => {
  const [{ data, loadingFetch }, doFetch, fetchData] = useFetch<ReportData>('/report');

  const handleRefreshData = async () => {
    try {
      await fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box p={4}>
      <Box>
        <Heading>
          Comentarios Reportados
        </Heading>
        <CommentsReported />
      </Box>
      <Box display="flex" flexFlow="column">
        <Heading>
          Relátorios
        </Heading>
        <ChartReport dataReport={data} />
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
    </Box>
  );
};
export default AdminDashboard;
