import React from 'react';
import * as yup from 'yup';
import {
  Box, Button, ButtonGroup, Textarea,
} from '@chakra-ui/react';
import Field from 'components/Field';
import { Form, Formik, FormikValues } from 'formik';
import { useApiOperation } from 'hooks/useApiOperation';
import { Deposition } from 'model/profile';

interface Props {
  deposition?: Deposition;
  profileId?: string;
}

const DepositionForm = ({ deposition, profileId }: Props): JSX.Element => {
  const [loadingPost, insertData] = useApiOperation({ operation: 'insert' });
  const [loadingEdit, editData] = useApiOperation({ operation: 'edit' });
  const isEdit = !!deposition?.talk;

  const initialValues: Deposition = {
    talk: deposition?.talk || '',
  };
  const validationSchema = yup.object().shape({
    comment: yup.string().max(500),
  });

  const handleSubmit = async (data: Deposition, { resetForm }: FormikValues) => {
    if (data.talk === '') return;
    try {
      if (isEdit) {
        await editData({ url: `/deposition/${deposition?._id}`, body: { ...data } });
        // onSendEdit();
      } else {
        await insertData({
          url: 'deposition',
          body: {
            ...data, profileId, depositionUserId: 'test0303', createdBy: 'Petter',
          },
        });
      }
      // resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box bg="white">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        isInitialValid={(formik: any) => validationSchema.isValidSync(formik.initialValues)}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field name="talk" label="Escrever um depoimento">
            <Textarea />
          </Field>
          <ButtonGroup spacing={5} mt={4}>
            <Button type="submit" isLoading={loadingPost || loadingEdit}>
              Enviar
            </Button>
            <Button onClick={() => {}}>
              Cancelar
            </Button>
          </ButtonGroup>
        </Form>
      </Formik>
    </Box>
  );
};

export default DepositionForm;
