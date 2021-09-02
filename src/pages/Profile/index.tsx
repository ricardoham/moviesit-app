import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Avatar, Box, Button, Heading, HStack, IconButton, Text,
} from '@chakra-ui/react';
import {
  FaFacebook, FaInstagram, FaTwitter, FaWhatsapp,
} from 'react-icons/fa';
import { IoLogoTiktok } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

const Profile = (): JSX.Element => {
  const { user } = useAuth0();
  const { name, picture, email } = { ...user };
  const history = useHistory();

  return (
    <Box m={4}>
      <Box display="flex" alignItems="center">
        <Box display="flex" alignItems="center" flex="1">
          <Avatar size="xl" src={picture} name={name} />
          <Heading ml={4} as="h2" size="xl">
            {name || 'User Name'}
          </Heading>
        </Box>
        <Button onClick={() => history.push('/profile/edit')}>Editar perfil</Button>
      </Box>
      <Box mt={4}>
        <Heading mb={2} as="h4" size="md">
          Sobre mim
        </Heading>
      </Box>
      <Box mt={4}>
        <Heading mb={2} as="h4" size="md">
          Me siga nas redes sociais
        </Heading>
        <HStack>
          <IconButton size="lg" fontSize="25px" colorScheme="facebook" aria-label="facebook" icon={<FaFacebook />} />
          <IconButton size="lg" fontSize="25px" colorScheme="pink" aria-label="Instagram" icon={<FaInstagram />} />
          <IconButton size="lg" fontSize="25px" colorScheme="twitter" aria-label="Twitter" icon={<FaTwitter />} />
          <IconButton size="lg" fontSize="25px" colorScheme="whatsapp" aria-label="WhatsApp" icon={<FaWhatsapp />} />
          <IconButton size="lg" fontSize="25px" colorScheme="teal" aria-label="Tiktok" icon={<IoLogoTiktok />} />
        </HStack>
      </Box>
      <Box>
        <Heading mt={10} as="h4" size="md">
          Depoimentos
        </Heading>
      </Box>
    </Box>
  );
};

export default Profile;
