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
  socialMedia?: ProfileSocialMedia
}

const SocialItems = {
  facebook: {
    color: 'facebook',
    arial: 'Facebook',
    icon: <FaFacebook />,
  },
  instagram: {
    color: 'pink',
    arial: 'Instagram',
    icon: <FaInstagram />,
  },
  twitter: {
    color: 'twitter',
    arial: 'Twitter',
    icon: <FaTwitter />,
  },
  tiktok: {
    color: 'teal',
    arial: 'Tiktok',
    icon: <IoLogoTiktok />,
  },
} as any;

const SocialMedia = ({ socialMedia }: Props):JSX.Element => (
  <Box mt={4}>
    <Heading mb={2} as="h4" size="md">
      Me siga nas redes sociais
    </Heading>
    <HStack>
      {
        socialMedia
        && Object.entries(socialMedia).map(([k, v]) => {
          const comp = SocialItems[k].icon as React.ReactElement;

          return (
            <IconButton
              size="lg"
              fontSize="25px"
              colorScheme={SocialItems[k].color}
              aria-label={SocialItems[k].arial}
              icon={comp}
              onClick={() => window.open(v, '_blank')}
            />
          );
        })
      }
    </HStack>
  </Box>
);

export default SocialMedia;
