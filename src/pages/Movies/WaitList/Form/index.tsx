import React, { useState } from 'react';
import * as yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Box, Button, ButtonGroup, IconButton, Input, Text, useDisclosure, useToast,
} from '@chakra-ui/react';
import { Formik, FormikValues } from 'formik';
import Field from 'components/Field';
import FormDatePicker from 'components/FormDatePicker';
import Label from 'components/Label';
import { Movies } from 'model/recommendations';
import MoviesModal from 'components/Modal';
import { WaitList } from 'model/waitList';
import { useApiOperation } from 'hooks/useApiOperation';
import { IoCloseOutline } from 'react-icons/io5';
import { useAuth0 } from '@auth0/auth0-react';
import { Form } from './styles';

const FormWaitList = (): JSX.Element => {
  const { user } = useAuth0();
  const { state } = useLocation<{ waitList: WaitList } | undefined>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ownList, setOwnList] = useState(false);
  const [loadingPost, insertData] = useApiOperation({ operation: 'insert' });
  const [loadingEdit, editData] = useApiOperation({ operation: 'edit' });
  const history = useHistory();
  const toast = useToast();
  const today = new Date();
  const yesterDay = new Date(new Date().setDate(new Date().getDate() - 1));

  const initialValues: WaitList = {
    title: state?.waitList.title || '',
    comment: state?.waitList.description || '',
    dueDate: state?.waitList.dueDate || today,
    movie: state?.waitList.movie || undefined,
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    movie: yup.object().required('Movie is required'),
    dueDate: yup.date().min(yesterDay, 'Data invalida').required('Date is required'),
  });

  const handleSelectMovie = (
    movie: Movies,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setField: (field: string, value: any) => void,
  ) => {
    setField('movie', movie);
  };

  const handleRemoveSelectMovies = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setField: (field: string, value: any) => void,
  ) => {
    setField('movie', undefined);
  };

  const handleOpenModel = (set: boolean) => {
    setOwnList(set);
    onOpen();
  };

  const handleSubmit = async (data: WaitList) => {
    try {
      if (state) {
        await editData({ url: `/waitlist/${state.waitList._id}`, body: { ...data } });
      } else {
        await insertData({ url: '/waitlist', body: { ...data, userId: user?.sub } });
      }
      toast({
        title: 'Novo item criado',
        status: 'success',
        isClosable: true,
        position: 'top',
      });
      history.push('/movies/waitlist');
    } catch (error) {
      toast({
        title: 'Erro ao criar novo item',
        status: 'error',
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <Box bgColor="white" display="flex" flexFlow="column" p={4} m={2} h="140vh">
      <Text p={4} fontWeight="bold">
        Escolha um filme de sua lista de filmes ou busque um novo filme,
        para criar uma lista de filmes para assistir mais tarde.
      </Text>
      <Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          initialErrors={
            (formik: FormikValues) => validationSchema.isValidSync(formik.initialValues)
          }
          onSubmit={handleSubmit}
        >
          {({ values, isValid, setFieldValue }: FormikValues) => (
            <Form>
              <Field name="title" label="Titulo: ">
                <Input />
              </Field>
              <Field name="comment" label="Coment??rio: ">
                <Input />
              </Field>
              <Box>
                <Field name="movie" label="Filme: ">
                  <Box>
                    {
                        values.movie
                        && (
                        <Box display="flex">
                          <Text alignSelf="center">{values.movie.title}</Text>
                          <IconButton
                            aria-label="remove movie"
                            variant="ghost"
                            icon={<IoCloseOutline />}
                            onClick={
                              () => handleRemoveSelectMovies(
                                setFieldValue,
                              )
                            }
                          />
                        </Box>
                        )
                      }
                  </Box>
                </Field>
                <ButtonGroup spacing={5} alignSelf="center" mt={4}>
                  <Button
                    variant="outline"
                    colorScheme="blue"
                    onClick={() => handleOpenModel(true)}
                  >
                    Buscar da minha lista
                  </Button>
                  <Button
                    variant="outline"
                    colorScheme="blue"
                    onClick={() => handleOpenModel(false)}
                  >
                    Buscar novo filme
                  </Button>
                </ButtonGroup>
              </Box>
              <Box mt={4}>
                <Label name="dueDate" label="Data para assistir: " />
                <FormDatePicker name="dueDate" />
              </Box>
              <MoviesModal
                ownList={ownList}
                listType="tmdb"
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                onSelectMovie={(movie: Movies) => handleSelectMovie(movie, setFieldValue)}
              />
              <ButtonGroup variant="outline" spacing="6" mt={4}>
                <Button colorScheme="blue" type="submit" isLoading={loadingPost || loadingEdit}>Salvar</Button>
                <Button onClick={() => history.push('/movies/waitlist')}>Cancelar</Button>
              </ButtonGroup>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default FormWaitList;
