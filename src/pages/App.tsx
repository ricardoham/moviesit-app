import React, { useEffect, useState } from 'react';
import Header from 'components/Header';
import Routes from 'routes';
import { useAuth0 } from '@auth0/auth0-react';
import { useApiOperation } from 'hooks/useApiOperation';
import { useFetch } from 'hooks/useFetch';
import { Profile } from 'model/profile';
import { moviesItAPI } from 'api';
import { Spinner } from '@chakra-ui/react';

const App = ():JSX.Element => {
  const { user, isLoading } = useAuth0();
  const [loadingPost, insertData] = useApiOperation({ operation: 'insert' });
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(false);
  const [loadingFetch, setLoadingFetch] = useState(false);

  useEffect(() => {
    const createNewProfile = async () => {
      try {
        if (isLoading) return;
        setLoadingFetch(true);
        const res = await moviesItAPI.get<Profile>(`/profile/${user?.sub}`);
        setLoadingFetch(false);
        setIsAdmin(res.data.isAdmin);
        if (res.status === 204 && user?.sub && !loadingFetch) {
          await insertData({
            url: 'profile',
            body: {
              name: user.name, picture: user.picture, userId: user?.sub, hasProfile: true,
            },
          });
        }
      } catch (error) {
        console.error(error);
        setLoadingFetch(false);
      }
    };
    createNewProfile();
  }, [user, isLoading]);

  return (
    <div className="App">
      {
        (isLoading || loadingPost || loadingFetch) ? <Spinner />
          : (
            <>
              <Header isAdmin={isAdmin} />
              <Routes />
            </>
          )
      }
    </div>
  );
};

export default App;
