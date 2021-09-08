import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import GeneratorPdf from 'components/GeneratorPdf';
import { GenPdf } from 'model/genPdf';
import { Button, Box } from '@chakra-ui/react';

interface Props {
  fileName?: string;
  section?: string;
  data?: GenPdf[]
  type?: 'recommendation' | 'waitlist';
}

const PDFLink = ({
  type, fileName, section, data,
}: Props): JSX.Element => (
  <Box>
    <PDFDownloadLink
      document={(
        <GeneratorPdf
          section={section}
          data={data}
          type={type}
        />
      )}
      fileName={`${fileName}.pdf`}
    >
      {({
        blob, url, loading, error,
      }) => (
        <Button colorScheme="blue" variant="outline">
          {loading ? 'Carregando documento...' : 'Baixar pdf'}
        </Button>
      )}
    </PDFDownloadLink>
  </Box>
);

export default PDFLink;
