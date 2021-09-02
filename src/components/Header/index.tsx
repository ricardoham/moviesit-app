import Navbar from 'components/Navbar';
import Login from 'pages/Login';
import React from 'react';
import { StyledHeader } from './styles';

const Header = (): JSX.Element => (
  <StyledHeader>
    <span>Movies it!</span>
    <Navbar />
    <Login />
  </StyledHeader>
);

export default Header;
