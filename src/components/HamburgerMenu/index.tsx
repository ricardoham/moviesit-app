import React from 'react';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import Navbar from 'components/Navbar';
import { CgMenuLeftAlt } from 'react-icons/cg';
import Login from 'pages/Login';

interface Props {
  isAdmin?: boolean;
}

const HamburgerMenu = ({ isAdmin }: Props): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const btnRef = React.useRef<any>();

  return (
    <>
      <IconButton
        ref={btnRef}
        aria-label="Menu"
        variant="ghost"
        size="lg"
        fontSize="32px"
        onClick={onOpen}
        icon={<CgMenuLeftAlt />}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Movies It!</DrawerHeader>
          <DrawerBody>
            <Navbar isAdmin={isAdmin} isHamburger onSelect={() => onClose()} />
            <Login onSelect={() => onClose()} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default HamburgerMenu;
