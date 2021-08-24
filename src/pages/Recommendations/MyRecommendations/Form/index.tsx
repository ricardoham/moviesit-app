import React, { useMemo, useState, useEffect } from 'react';
import { Formik, FormikValues } from 'formik';
import * as yup from 'yup';
import { Recommendations } from 'model/recommendations';
import {
  Box, Button, ButtonGroup, Input, Modal, ModalBody,

  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure,
} from '@chakra-ui/react';
import Field from 'components/Field';
import Search from 'components/Search';
import { useApiFetch } from 'hooks/useApiFetch';
import ResultList from 'components/ResultList';
import { ListModel } from 'model/list';
import { useHistory } from 'react-router-dom';
import { Form } from './styles';

interface Props {
  recommendation?: Recommendations;
}

const FormRecommendation = ({ recommendation }: Props): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ isError, isLoading, result }, doFetch] = useApiFetch();
  const [query, setQuery] = useState('');
  const [showMoviesList, setShowMoviesList] = useState(false);
  const history = useHistory();
  console.log('QUe', query);

  const initialValues = {
    title: recommendation?.title || '',
    description: recommendation?.description || '',
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Informe a descrição'),
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setQuery(e.target.value);
  };

  const handleMovieDetail = (item?: number | string) => {
    history.push(`/movies/details/${item}`);
  };

  const handleSearchMovie = () => {
    setShowMoviesList(true);
    doFetch(`/client/tmdb?name=${query}&page=1`);
  };

  const handleSubmit = () => {
    console.log('Form submit');
  };

  const listData: ListModel[] = useMemo(() => result.map((item) => ({
    id: item.id,
    header: item.title,
    overview: item.overview,
    poster: item.posterPath,
  })), [result]);

  return (
    <Box p={3} bgColor="white">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        isInitialValid={(formik: any) => validationSchema.isValidSync(formik.initialValues)}
      >
        {({ values, isValid }: FormikValues) => {
          console.log('IsValid', isValid);

          return (
            <Form>
              <Field name="title" label="Titulo">
                <Input placeholder="Informe um titulo" />
              </Field>
              <Field name="description" label="Descrição">
                <Textarea placeholder="Informe uma descrição " />
              </Field>
              <Button onClick={onOpen}>Inserir filmes</Button>
              <Field name="movies">
                <Modal isOpen={isOpen} onClose={onClose} size="3xl">
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader mt="32px">
                      <Search
                        value={query}
                        placeholder="Pesquisar filmes"
                        onSearch={handleSearchMovie}
                        onChangeSearch={(e) => handleSearch(e)}
                      />
                    </ModalHeader>
                    <ModalCloseButton onClick={() => setQuery('')} />
                    <ModalBody>
                      {
                      showMoviesList && (
                        <ResultList
                          listType="tmdb"
                          result={listData}
                          isLoading={isLoading}
                          showList={showMoviesList}
                          onShowDetails={handleMovieDetail}
                          onShow={() => setShowMoviesList(!showMoviesList)}
                        />
                      )
                      }
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </Field>
              <ButtonGroup variant="outline" spacing="6">
                <Button colorScheme="blue" type="submit" onClick={handleSubmit}>Save</Button>
                <Button>Cancel</Button>
              </ButtonGroup>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default FormRecommendation;
