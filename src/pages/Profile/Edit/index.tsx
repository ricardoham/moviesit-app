import React from 'react';
import {
  Box, Button, ButtonGroup, Input, Textarea, useToast,
} from '@chakra-ui/react';
import * as yup from 'yup';
import Field from 'components/Field';
import { Form, Formik, FormikValues } from 'formik';
import { Profile } from 'model/profile';
import { useHistory, useLocation } from 'react-router-dom';
import { useApiOperation } from 'hooks/useApiOperation';
import { useAuth0 } from '@auth0/auth0-react';

const ProfileEdit = (): JSX.Element => {
  const [loadingEdit, editData] = useApiOperation({ operation: 'edit' });
  const toast = useToast();
  const history = useHistory();
  const { state } = useLocation<{ profile: Profile } | undefined>();
  const { user } = useAuth0();
  const { profile } = { ...state };

  const initialValues = {
    moviesitNickname: profile?.moviesitNickname || '',
    age: profile?.age || undefined,
    about: profile?.about || '',
    socialMedias: {
      facebook: profile?.socialMedias?.facebook || undefined,
      instagram: profile?.socialMedias?.instagram || undefined,
      twitter: profile?.socialMedias?.twitter || undefined,
      whatsapp: profile?.socialMedias?.whatsapp || undefined,
      tiktok: profile?.socialMedias?.tiktok || undefined,
    } || undefined,
  };
  const validationSchema = yup.object().shape({
    comment: yup.string().max(500),
  });

  const handleSubmit = async (data: Profile) => {
    const updateProfileData = {
      ...data,
      socialMedia: data.socialMedias,
    };

    try {
      if (state?.profile) {
        await editData({ url: `/profile/${profile?._id}`, body: { ...data } });
      }
      history.push('/profile');
    } catch (err) {
      toast({
        title: 'Error inesperado',
        status: 'error',
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <Box bgColor="white" p={2}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        initialErrors={
          (formik: FormikValues) => validationSchema.isValidSync(formik.initialValues)
        }
        onSubmit={handleSubmit}
      >
        {({ values, isValid, setFieldValue }: FormikValues) => (
          <Form>
            <Field id="moviesitNickname" name="moviesitNickname" label="Nome">
              <Input />
            </Field>
            <Field id="age" name="age" label="Idade">
              <Input type="number" />
            </Field>
            <Field id="about" name="about" label="Sobre mim">
              <Textarea />
            </Field>
            <Field id="socialMedias.facebook" name="socialMedias.facebook" label="Facebook">
              <Input />
            </Field>
            <Field id="socialMedias.instagram" name="socialMedias.instagram" label="Instagram">
              <Input />
            </Field>
            <Field id="socialMedias.twitter" name="socialMedias.twitter" label="Twitter">
              <Input />
            </Field>
            <Field id="socialMedias.whatsapp" name="socialMedias.whatsapp" label="WhatsApp">
              <Input type="number" />
            </Field>
            <Field id="socialMedias.tiktok" name="socialMedias.tiktok" label="TikTok">
              <Input />
            </Field>
            <ButtonGroup variant="outline" spacing="6">
              <Button colorScheme="blue" type="submit" isLoading={loadingEdit}>Salvar</Button>
              <Button onClick={() => history.push('/profile')}>Cancelar</Button>
            </ButtonGroup>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ProfileEdit;
