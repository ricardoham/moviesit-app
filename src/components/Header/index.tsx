import React from 'react';
import Navbar from 'components/Navbar';
import Login from 'pages/Login';
import {
  Box,
  Heading,
} from '@chakra-ui/react';
import useWindowDimensions from 'hooks/useWindowDimensions';
import HamburgerMenu from 'components/HamburgerMenu';

interface Props {
  isAdmin?: boolean;
}

const Header = ({ isAdmin }: Props): JSX.Element => {
  const windowDimensions = useWindowDimensions();
  console.log(windowDimensions);

  return (
    <Box bg="white" p={[2, 4]} border="solid 1px grey" m={0.5}>
      {
        windowDimensions.width < 790
          ? <HamburgerMenu isAdmin={isAdmin} />
          : (
            <Box display="flex">
              <Heading as="h2" size="xl" alignSelf="center" textAlign="center">Movies it! 🎬</Heading>
              <Navbar isAdmin={isAdmin} isHamburger={false} />
              <Box alignSelf="flex-end" ml="auto">
                <Login />
              </Box>
            </Box>
          )
      }

    </Box>
  );
};
export default Header;
