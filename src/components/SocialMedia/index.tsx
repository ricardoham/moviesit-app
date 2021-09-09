import React from 'react';
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
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
  whatsapp: {
    color: 'whatsapp',
    arial: 'WhatsApp',
    icon: <FaWhatsapp />,
  },
  tiktok: {
    color: 'teal',
    arial: 'Tiktok',
    icon: <IoLogoTiktok />,
  },
// eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

const SocialMedia = ({ socialMedia }: Props):JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const hasSocialMedia = ():boolean => {
    if (socialMedia) {
      const test = Object.values(socialMedia).some((el) => el !== '');
      return test;
    }
    return false;
  };

  return (
    <Box mt={4}>
      <Heading mb={2} as="h4" size="md">
        Me siga nas redes sociais
      </Heading>
      <HStack>
        {
        hasSocialMedia() && socialMedia
        && Object.entries(socialMedia).map(([k, v]) => {
          const comp = SocialItems[k].icon as React.ReactElement;
          if (!v) {
            return null;
          }
          return (
            <IconButton
              key={k}
              size="lg"
              fontSize="25px"
              colorScheme={SocialItems[k].color}
              aria-label={SocialItems[k].arial}
              icon={comp}
              onClick={k === 'whatsapp'
                ? () => onOpen()
                : () => window.open(v, '_blank')}
            />
          );
        })
      }
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Whats App</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={8} display="flex" alignItems="center">
            <FaWhatsapp />
            <Box ml={2}>
              {socialMedia?.whatsapp}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SocialMedia;
