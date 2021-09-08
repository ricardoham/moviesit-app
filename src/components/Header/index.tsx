import React from 'react';
import Navbar from 'components/Navbar';
import Login from 'pages/Login';
import { StyledHeader } from './styles';

interface Props {
  isAdmin?: boolean;
}

const Header = ({ isAdmin }: Props): JSX.Element => (
  <StyledHeader>
    <span>Movies it!</span>
    <Navbar isAdmin={isAdmin} />
    <Login />
  </StyledHeader>
);

export default Header;
