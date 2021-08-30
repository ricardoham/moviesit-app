import React, { useState } from 'react';
import * as yup from 'yup';
import { useLocation } from 'react-router-dom';
import {
  Box, Button, ButtonGroup, Input, Text, useDisclosure,
} from '@chakra-ui/react';
import { Formik, FormikValues } from 'formik';
import Field from 'components/Field';
import FormDatePicker from 'components/FormDatePicker';
import Label from 'components/Label';
import { Movies } from 'model/recommendations';
import MoviesModal from 'components/Modal';
import { Form } from './styles';

const FormWaitList = (): JSX.Element => {
  const { state } = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ownList, setOwnList] = useState(false);

  const initialValues = {
    title: '',
    comentario: '',
    dueDate: new Date(),
    movies: [],
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    movies: yup.array().min(1, 'Minimo 1 filme').max(5, 'Máximo 5 filmes').required('Filmes required'),
  });

  const handleSelectMovie = (
    movie: Movies,
    setField: (field: string, value: any) => void,
  ) => {
    console.log('movie', movie);

    // setField('dueDate', date);
  };

  const handleOpenModel = (set: boolean) => {
    setOwnList(set);
    onOpen();
  };

  const handleSubmit = () => {

  };

  return (
    <Box display="flex" flexFlow="column" m={4}>
      <Text>
        Escolha um filme de sua lista de filmes ou busque um novo filme,
        para criar uma lista de filmes para assistir mais tarde.
      </Text>
      <Box bgColor="white">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          isInitialValid={(formik: any) => validationSchema.isValidSync(formik.initialValues)}
          onSubmit={handleSubmit}
        >
          {({ values, isValid, setFieldValue }: FormikValues) => {
            console.log(values);
            return (
              <Form>
                <Field name="title" label="Titulo: ">
                  <Input />
                </Field>
                <Field name="cometario" label="Comentário: ">
                  <Input />
                </Field>
                <Box>
                  <Field name="movie" label="Filme: ">
                    <Box />
                  </Field>
                  <ButtonGroup spacing={5} alignSelf="center" mt={4}>
                    <Button
                      onClick={() => handleOpenModel(true)}
                    >
                      Buscar da minha lista
                    </Button>
                    <Button
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
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};

export default FormWaitList;
