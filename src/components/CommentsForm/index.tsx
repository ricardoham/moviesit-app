import React from 'react';
import * as yup from 'yup';
import {
  Box, Button, ButtonGroup, Textarea, useToast,
} from '@chakra-ui/react';
import Field from 'components/Field';
import { Formik, FormikValues, Form } from 'formik';
import { Comments } from 'model/comments';
import { useApiOperation } from 'hooks/useApiOperation';
import { useAuth0 } from '@auth0/auth0-react';

interface Props {
  type: 'comment' | 'deposition';
  comments?: Comments;
  itemId?: string;
  onFetchComments: () => void;
  onSendEdit: () => void;
}

const CommentsForm = ({
  type,
  comments, itemId, onFetchComments, onSendEdit,
}: Props):JSX.Element => {
  const { user } = useAuth0();
  const isEdit = !!comments?.comment;
  const [loadingPost, insertData] = useApiOperation({ operation: 'insert' });
  const [loadingEdit, editData] = useApiOperation({ operation: 'edit' });
  const toast = useToast();

  const initialValues: Comments = {
    comment: comments?.comment || '',
  };
  const validationSchema = yup.object().shape({
    comment: yup.string().max(500),
  });

  const handleSubmit = async (data: Comments, { resetForm }: FormikValues) => {
    if (data.comment === '') return;
    try {
      if (isEdit) {
        await editData({ url: `/${type === 'comment' ? 'comments' : 'deposition'}/${comments?._id}`, body: { ...data } });
        onSendEdit();
      } else {
        await insertData({
          url: `/${type === 'comment' ? 'comments' : 'deposition'}`,
          body: {
            ...data, userId: user?.sub, commentedItemId: itemId, createdBy: user?.name,
          },
        });
      }
      toast({
        title: 'Novo item criado',
        status: 'success',
        isClosable: true,
        position: 'top',
      });
      resetForm();
    } catch (error) {
      toast({
        title: 'Erro ao criar novo item',
        status: 'error',
        isClosable: true,
        position: 'top',
      });
    } finally {
      onFetchComments();
    }
  };

  return (
    <Box bg="white">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        initialErrors={(formik: FormikValues) => validationSchema.isValidSync(formik.initialValues)}
        onSubmit={handleSubmit}
      >
        {({
          values, isValid, setFieldValue, resetForm,
        }: FormikValues) => (
          <Form>
            <Field name="comment" label="Coment??rio: ">
              <Textarea />
            </Field>
            <ButtonGroup spacing={5} mt={4}>
              <Button type="submit" isLoading={loadingPost || loadingEdit}>
                Enviar
              </Button>
              <Button onClick={() => (isEdit ? onSendEdit() : resetForm())}>
                Cancelar
              </Button>
            </ButtonGroup>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CommentsForm;
