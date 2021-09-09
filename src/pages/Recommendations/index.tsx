import React from 'react';
import { Box } from '@chakra-ui/react';
import Card from 'components/Card';
import { useHistory } from 'react-router-dom';

const Recommendations = (): JSX.Element => {
  const history = useHistory();

  return (
    <Box bg="white" m={2}>
      <Box>
        <Card
          image="/images/myreco.jpg"
          header="Minhas recomendações"
          text="Acesse suas recomendações ou crie uma nova"
          btnText="Ver mais..."
          onAction={() => history.push('/recommendations/myrecommendations')}
        />
      </Box>
      <Box>
        <Card
          invert
          image="/images/recommendations.jpg"
          header="Recomendações da comunidade"
          text="Veja as últimas recomendações ou pesquisa uma por usuário ou titulo"
          btnText="Ver mais..."
          onAction={() => history.push('/recommendations/community')}
        />
      </Box>

    </Box>
  );
};

export default Recommendations;
