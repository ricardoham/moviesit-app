import React from 'react';
import { Box } from '@chakra-ui/react';
import Card from 'components/Card';
import { useHistory } from 'react-router-dom';

const Recommendations = (): JSX.Element => {
  const history = useHistory();

  return (
    <Box bg="white" h="110vh" display="flex" flexFlow="column">
      <Card
        image="/images/myreco.jpg"
        header="Minhas recomendações"
        text="Acesse suas recomendações ou crie uma nova"
        btnText="Ver mais..."
        onAction={() => history.push('/recommendations/myrecommendations')}
      />
      <Card
        invert
        image="/images/recommendations.jpg"
        header="Recomendações da comunidade"
        text="Veja as últimas recomendações de filmes da comunidade"
        btnText="Ver mais..."
        onAction={() => history.push('/recommendations/community')}
      />
    </Box>
  );
};

export default Recommendations;
