import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { SearchContainer, StyledSearch } from './styles';

interface Props {
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Search = ({ onSearch, value }: Props): JSX.Element => (
  <SearchContainer>
    <IoSearchOutline />
    <StyledSearch
      placeholder="Search"
      type="search"
      onChange={onSearch}
      value={value}
    />
  </SearchContainer>
);

export default Search;
