import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { SearchContainer, StyledSearch } from './styles';

const Search = (): JSX.Element => (
  <SearchContainer>
    <IoSearchOutline />
    <StyledSearch placeholder="Search" type="search" />
  </SearchContainer>
);

export default Search;
