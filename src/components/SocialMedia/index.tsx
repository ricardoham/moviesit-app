import React from 'react';
import {
  Box, Heading, HStack, IconButton,
} from '@chakra-ui/react';
import {
  FaFacebook, FaInstagram, FaTwitter, FaWhatsapp,
} from 'react-icons/fa';
import { IoLogoTiktok } from 'react-icons/io5';
import { ProfileSocialMedia } from 'model/profile';

interface Props {
  socialMedia: ProfileSocialMedia
}

const SocialMedia = ({ socialMedia }: Props):JSX.Element => (
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
);

export default SocialMedia;
