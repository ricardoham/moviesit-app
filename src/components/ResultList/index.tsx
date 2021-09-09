import React from 'react';
import ListItems from 'components/List';
import {
  Box, Button, ButtonGroup, Spinner,
} from '@chakra-ui/react';
import { CloseBar } from 'components/CloseBar';
import { ListModel } from 'model/list';
import Modal from 'components/Modal';

interface Props {
  result?: ListModel[];
  isLoading: boolean;
  listType: 'tmdb' | 'movies' | 'persons';
  onShowDetails: (item?: number | string) => void;
  onShow: () => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

const ResultList = ({
  result, listType, isLoading, onShowDetails, onShow, onNextPage, onPreviousPage,
}: Props):JSX.Element => (
  <Box bg="white" pb={8} display="flex" flexFlow="column">
    <CloseBar onClose={onShow} />
    {
      isLoading ? <Spinner alignSelf="center" mt={12} size="lg" />
        : (
          <Box display="flex" flexFlow="column">
            <ListItems
              data={result}
              listType={listType}
              loading={isLoading}
              onShowDetails={onShowDetails}
            />
            <ButtonGroup spacing={4} alignSelf="center" mt={4}>
              <Button onClick={onPreviousPage}>Anterior</Button>
              <Button onClick={onNextPage}>Próxima</Button>
            </ButtonGroup>
          </Box>
        )
    }

  </Box>
);
export default ResultList;
