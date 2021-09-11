import React from 'react';
import {
  Box, Divider, Text, Link,
} from '@chakra-ui/react';

const Footer = (): JSX.Element => (
  <Box p={3}>
    <Divider />
    <Text>
      {`${new Date().getFullYear()} Movies it! - Feito com ❤️ por `}
      {' '}
      <Link color="teal.500" href="https://github.com/ricardoham">
        @ricardoham
      </Link>
    </Text>
  </Box>
);

export default Footer;
