import React, { ComponentType } from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired, WithAuthenticationRequiredOptions } from '@auth0/auth0-react';
import { Spinner } from '@chakra-ui/react';

interface Props {
  component: ComponentType<any>;
  exact?: boolean;
  path?: string;
}

const ProtectedRoute = ({ component, ...args }: Props):JSX.Element => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <Spinner />,
    })}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...args}
  />
);

export default ProtectedRoute;
