import { Box, Text } from '@chakra-ui/react';
import React, { useMemo } from 'react';

interface Props {
  type?: 'movie' | 'people'
  noItem?: string;
}

const EmptyState = ({ type, noItem }: Props): JSX.Element => {
  const renderEmptyType = useMemo((): JSX.Element => {
    switch (type) {
      case 'movie':
        return <Text>Você precisa buscar um filme para criar uma lista de favoritos</Text>;
      case 'people':
        return (
          <Text>
            Você precisa buscar um ator ou diretor para criar uma lista de favoritos
          </Text>
        );
      default:
        return <Text>Crie uma nova lista</Text>;
    }
  }, [type]);

  return (
    <Box p={4}>
      <Text>{`Você não tem nenhum ${noItem} na lista`}</Text>
      {
        renderEmptyType
      }
    </Box>
  );
};

export default EmptyState;
