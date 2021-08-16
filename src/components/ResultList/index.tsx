import React from 'react';
import ListItems from 'components/List';
import { Box } from '@chakra-ui/react';
import { CloseBar } from 'components/CloseBar';
import { ListModel } from 'model/list';
import Modal from 'components/Modal';

interface Props {
  result?: ListModel[];
  isLoading: boolean;
  showList: boolean;
  listType: 'tmdb' | 'movies' | 'persons';
  onShowDetails: (item?: number | string) => void;
  onShow: () => void;
}

const ResultList = ({
  result, listType, isLoading, onShowDetails, showList, onShow,
}: Props):JSX.Element => (
  <Box>
    <Modal
      showModal={showList}
      onCloseModal={onShow}
    >
      <CloseBar onClose={onShow} />
      {
      isLoading ? <div>Loading...</div>
        : (
          <ListItems
            data={result}
            listType={listType}
            loading={isLoading}
            onShowDetails={onShowDetails}
          />
        )
    }
    </Modal>

  </Box>
);
export default ResultList;
