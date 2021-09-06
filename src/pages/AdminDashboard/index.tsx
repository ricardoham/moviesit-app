import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import CommentsReported from './CommentsReported';

const AdminDashboard = (): JSX.Element => (
  <Box>
    <Box>
      <Heading>
        Comentarios Reportados
      </Heading>
      <CommentsReported />
    </Box>
    <Heading>
      Gerar Relátorios
    </Heading>
  </Box>
);

export default AdminDashboard;
