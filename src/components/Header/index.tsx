import Navbar from 'components/Navbar';
import React from 'react';
import { StyledHeader } from './styles';

const Header = (): JSX.Element => (
  <StyledHeader>
    <span>logo</span>
    <Navbar />
    <span>Profile</span>
  </StyledHeader>
);

export default Header;
