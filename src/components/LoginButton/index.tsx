import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@chakra-ui/react';

const LoginButton = ():JSX.Element => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div>
      {
        !isAuthenticated
          ? (
            <Button
              colorScheme="blue"
              onClick={() => loginWithRedirect()}
            >
              Login
            </Button>
          )
          : (
            <Button
              variant="outline"
              onClick={() => logout({
                returnTo: window.location.origin,
              })}
            >
              Log Out
            </Button>
          )
      }

    </div>
  );
};

export default LoginButton;
