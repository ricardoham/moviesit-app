import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from 'components/LoginButton';

const Login = ():JSX.Element => (
  <div>
    <LoginButton />
  </div>
);

export default Login;
