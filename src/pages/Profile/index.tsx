import React, { useEffect, useMemo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Avatar, Box, Button, Heading, HStack, IconButton, Text,
} from '@chakra-ui/react';
import { useHistory, useParams } from 'react-router-dom';
import { useFetch } from 'hooks/useFetch';
import { Profile as ITProfile } from 'model/profile';
import SocialMedia from 'components/SocialMedia';
import ProfileDeposition from './Deposition';

const Profile = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth0();
  const history = useHistory();
  const [{ data, loadingFetch }, doFetch, fetchData] = useFetch<ITProfile>();
  const { name, picture } = { ...user };
  const ownProfile = user?.sub === id;

  useEffect(() => {
    if (id) {
      doFetch(`/profile/${id}`);
    } else {
      doFetch(`/profile/${user?.sub}`);
    }
  }, [id]);

  const userName = useMemo(() => {
    if (id) {
      if (data?.moviesitNickname) {
        return data.moviesitNickname;
      }
      return data?.name;
    } if (data?.moviesitNickname) {
      return data.moviesitNickname;
    }
    return data?.name;
  }, [id, data]);

  return (
    <Box m={4}>
      <Box display="flex" alignItems="center">
        <Box display="flex" alignItems="center" flex="1">
          <Avatar
            size="xl"
            src={id ? data?.picture : picture}
            name={userName}
          />
          <Heading ml={4} as="h2" size="xl">
            {userName}
          </Heading>
        </Box>
        {
          (!id || ownProfile)
        && <Button onClick={() => history.push('/profile/edit', { profile: data })}>Editar perfil</Button>
        }
      </Box>
      <Box mt={4}>
        <Heading mb={2} as="h4" size="md">
          Sobre mim
        </Heading>
        <Text>
          {data?.about}
        </Text>
      </Box>
      <SocialMedia socialMedia={data?.socialMedias} />
      <Box>
        <Heading mt={10} as="h4" size="md">
          Depoimentos
        </Heading>
        {
          !loadingFetch
            && (
            <ProfileDeposition
              profileId={data?.id}
              userId={user?.sub}
              userParamsId={id}
            />
            )
        }
      </Box>
    </Box>
  );
};

export default Profile;
