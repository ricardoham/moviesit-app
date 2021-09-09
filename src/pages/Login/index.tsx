import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from 'components/LoginButton';
import { Box } from '@chakra-ui/react';

interface Props {
  onSelect?: () => void;
}

const Login = ({ onSelect }: Props):JSX.Element => (
  <Box onClick={onSelect}>
    <LoginButton />
  </Box>
);

export default Login;
