import React, { useCallback, useEffect, useState } from 'react';
import Card from 'components/Card';
import { useAuth0 } from '@auth0/auth0-react';
import { useFetch } from 'hooks/useFetch';
import { Profile } from 'model/profile';
import { useApiOperation } from 'hooks/useApiOperation';
import { moviesItAPI } from 'api';
import {
  Box, Heading, Text, Button, Image,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

const Home = (): JSX.Element => {
  const { user } = useAuth0();
  const history = useHistory();

  return (
    <Box bg="white" display="flex" flexFlow="column" p={4}>
      <Heading as="h3" size="lg">Bem vindo ao Movies It</Heading>
      <Box
        display="flex"
        ml={10}
        mt={12}
        mr={10}
        mb={12}
        p={10}
        boxShadow="0 4px 8px 0 rgba(0,0,0,0.2)"
        flexWrap="wrap"
      >
        <Box>
          <Box mt={8}>
            <Text fontSize="xl">Aqui você pode encontrar seu filme, ator ou diretor favorito 🔎</Text>
            <Button variant="ghost" colorScheme="blue" onClick={() => history.push('/movies')}>Ver mais...</Button>
          </Box>
          <Box mt={8}>
            <Text fontSize="xl">Crie listas com seus filmes favoritos ou atores e diretores favoritos ⭐️</Text>
            <Button variant="ghost" colorScheme="blue" onClick={() => history.push('/movies/mymovies')}>Ver mais...</Button>
          </Box>
          <Box mt={8}>
            <Text fontSize="xl">Crie listas de filmes para assistir mais tarde 📅</Text>
            <Button variant="ghost" colorScheme="blue" onClick={() => history.push('/movies/waitlist')}>Ver mais...</Button>
          </Box>
          <Box mt={8}>
            <Text fontSize="xl">Crie recomendações de filmes para assistir para toda a comunidade 📝</Text>
            <Button variant="ghost" colorScheme="blue" onClick={() => history.push('/recommendations/myrecommendations')}>Ver mais...</Button>
          </Box>
          <Box mt={8}>
            <Text fontSize="xl">Veja as recomendações de filmes da comunidade 👥</Text>
            <Button variant="ghost" colorScheme="blue" onClick={() => history.push('/recommendations/community')}>Ver mais...</Button>
          </Box>
        </Box>
        <Image
          w={[200, 300, 500]}
          src="/images/takepicture.jpg"
          ml={['0px', '0px', 'auto']}
          borderRadius="md"
          boxShadow="0 4px 8px 0 rgba(0,0,0,0.2)"
        />
      </Box>
    </Box>
  );
};
export default Home;
