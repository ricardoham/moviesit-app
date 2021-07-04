import React from 'react';
import Search from 'components/Search';
import { StyledHeader } from './styles';

const Header = (): JSX.Element => (
  <StyledHeader>
    <span>logo</span>
    <Search />
  </StyledHeader>
);

export default Header;
