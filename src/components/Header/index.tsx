import Navbar from 'components/Navbar';
import Login from 'pages/Login';
import React from 'react';
import { StyledHeader } from './styles';

const Header = (): JSX.Element => (
  <StyledHeader>
    <span>logo</span>
    <Navbar />
    <span>Profile</span>
    <Login />
  </StyledHeader>
);

export default Header;
