import React from 'react';
import {
  Box, Button, ButtonGroup, Image, Input, Textarea,
} from '@chakra-ui/react';
import * as yup from 'yup';

import Field from 'components/Field';
import { Form, Formik, FormikValues } from 'formik';
import { Profile } from 'model/profile';
import { useHistory } from 'react-router-dom';
// import { Form } from './styles';

const ProfileEdit = (): JSX.Element => {
  const history = useHistory();

  const initialValues: Profile = {
    nickname: '',
    about: '',
    facebook: '',
    twitter: '',
    whatsapp: undefined,
    tiktok: '',
  };
  const validationSchema = yup.object().shape({
    comment: yup.string().max(500),
  });

  const handleSubmit = () => {

  };

  return (
    <Box bgColor="white" p={2}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        isInitialValid={(formik: any) => validationSchema.isValidSync(formik.initialValues)}
        onSubmit={handleSubmit}
      >
        {({ values, isValid, setFieldValue }: FormikValues) => (
          <Form>
            <Field name="nickname" label="Nome">
              <Input />
            </Field>
            <Field name="age" label="Idade">
              <Input type="number" />
            </Field>
            <Field name="about" label="Sobre mim">
              <Textarea />
            </Field>
            <Field name="facebook" label="Facebook">
              <Input />
            </Field>
            <Field name="instagram" label="Instagram">
              <Input />
            </Field>
            <Field name="twitter" label="Twitter">
              <Input />
            </Field>
            <Field name="whatsapp" label="WhatsApp">
              <Input type="tel" />
            </Field>
            <Field name="tiktok" label="TikTok">
              <Input />
            </Field>
            <ButtonGroup variant="outline" spacing="6">
              <Button colorScheme="blue" type="submit">Salvar</Button>
              <Button onClick={() => history.push('/profile')}>Cancelar</Button>
            </ButtonGroup>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ProfileEdit;
