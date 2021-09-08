import React, { useCallback, useEffect, useState } from 'react';
import Card from 'components/Card';
import { useAuth0 } from '@auth0/auth0-react';
import { useFetch } from 'hooks/useFetch';
import { Profile } from 'model/profile';
import { useApiOperation } from 'hooks/useApiOperation';
import { moviesItAPI } from 'api';

const Home = (): JSX.Element => {
  const { user } = useAuth0();

  return (
    <div>
      <Card header="Test Header" image="https://via.placeholder.com/150" text="12233 aaa bla bla bla" />
    </div>
  );
};
export default Home;
