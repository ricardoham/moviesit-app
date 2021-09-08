import {
  Box, Button, Input, InputGroup, InputLeftElement,
} from '@chakra-ui/react';
import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';

interface Props {
  placeholder?: string;
  value: string;
  onSearch: () => void;
  onChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({
  value, placeholder, onChangeSearch, onSearch,
}: Props): JSX.Element => (
  <Box display="flex" p={4} borderRadius="4px">
    <InputGroup bg="white" borderRadius="lg">
      <InputLeftElement
        pointerEvents="none"
        children={<IoSearchOutline color="gray.300" />}
      />
      <Input
        type="search"
        placeholder={placeholder || 'Search'}
        onChange={onChangeSearch}
        value={value}
      />
    </InputGroup>
    <Button
      ml="8px"
      type="button"
      onClick={onSearch}
    >
      Pesquisar
    </Button>
  </Box>
);

export default Search;
