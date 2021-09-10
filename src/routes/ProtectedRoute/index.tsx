import React, { ComponentType } from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired, WithAuthenticationRequiredOptions } from '@auth0/auth0-react';
import { Box, Spinner } from '@chakra-ui/react';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any>;
  exact?: boolean;
  path?: string;
}

const ProtectedRoute = ({ component, ...args }: Props):JSX.Element => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => (
        <Box
          display="flex"
          p={8}
          justifyContent="center"
        >
          <Spinner />
        </Box>
      ),
    })}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...args}
  />
);

export default ProtectedRoute;
