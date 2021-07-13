import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';

interface Props {
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Search = ({ onSearch, value }: Props): JSX.Element => (
  <InputGroup bg="white" borderRadius="lg">
    <InputLeftElement
      pointerEvents="none"
      children={<IoSearchOutline color="gray.300" />}
    />
    <Input
      type="search"
      placeholder="Search"
      onChange={onSearch}
      value={value}
    />
  </InputGroup>
);

export default Search;
