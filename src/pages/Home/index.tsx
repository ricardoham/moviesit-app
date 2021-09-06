import React, { useCallback, useEffect, useState } from 'react';
import Card from 'components/Card';
import { useAuth0 } from '@auth0/auth0-react';
import { useFetch } from 'hooks/useFetch';
import { Profile } from 'model/profile';
import { useApiOperation } from 'hooks/useApiOperation';
import { moviesItAPI } from 'api';

const Home = (): JSX.Element => {
  const { user } = useAuth0();
  const [loadingPost, insertData] = useApiOperation({ operation: 'insert' });

  useEffect(() => {
    const createNewProfile = async () => {
      try {
        const res = await moviesItAPI.get(`/profile/${user?.sub}`);
        if (res.status === 204 && user?.sub) {
          await insertData({
            url: 'profile',
            body: {
              name: user.name, picture: user.picture, userId: user?.sub, hasProfile: true,
            },
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    createNewProfile();
  }, []);

  return (
    <div>
      <Card header="Test Header" image="https://via.placeholder.com/150" text="12233 aaa bla bla bla" />
    </div>
  );
};
export default Home;
