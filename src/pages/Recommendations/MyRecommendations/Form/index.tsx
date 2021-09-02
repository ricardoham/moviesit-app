import React, { useMemo, useState } from 'react';
import { Formik, FormikValues } from 'formik';
import * as yup from 'yup';
import { Movies, Recommendations } from 'model/recommendations';
import {
  Box, Button, ButtonGroup, IconButton, Input, Modal, ModalBody,

  ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Textarea, useDisclosure,
} from '@chakra-ui/react';
import Field from 'components/Field';
import Search from 'components/Search';
import { useApiFetch } from 'hooks/useApiFetch';
import { ListModel } from 'model/list';
import { useHistory, useLocation } from 'react-router-dom';
import ListSearch from 'components/ListSearch';
import { IoCloseOutline } from 'react-icons/io5';
import { useApiOperation } from 'hooks/useApiOperation';
import { Form } from './styles';

const FormRecommendation = (): JSX.Element => {
  const { state } = useLocation<{ recommendation: Recommendations } | undefined>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ isError, isLoading, result }, doFetch] = useApiFetch();
  const [loadingPost, insertData] = useApiOperation({ operation: 'insert' });
  const [loadingEdit, editData] = useApiOperation({ operation: 'edit' });
  const [query, setQuery] = useState('');
  const [showMoviesList, setShowMoviesList] = useState(false);
  const [movieContains, setMovieContains] = useState(false);
  const history = useHistory();

  const initialValues = {
    title: state?.recommendation?.title || '',
    description: state?.recommendation?.description || '',
    movies: state?.recommendation?.movies || [],
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Informe a descrição'),
    movies: yup.array().min(1, 'Minimo 1 filme').max(5, 'Máximo 5 filmes').required('Filmes required'),
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

  const handleSelectMovies = (
    movies: Movies[],
    movie: Movies,
    setField: (field: string, value: any) => void,
  ) => {
    const alreadyRecommendation = movies.find((item) => item.movieId === movie.movieId);

    if (alreadyRecommendation) {
      setMovieContains(true);
      return;
    }
    setField('movies', [...movies, movie]);
  };

  const handleRemoveSelectMovies = (
    movies: Movies[],
    movie: Movies,
    setField: (field: string, value: any) => void,
  ) => {
    const newList = movies?.filter((l) => l.movieId !== movie.movieId);

    setField('movies', newList);
  };

  const handleSubmit = async (data: Recommendations) => {
    try {
      if (state) {
        await editData({ url: `/recommendations/${state.recommendation._id}`, body: { ...data } });
      } else {
        await insertData({ url: '/recommendations', body: { ...data, userId: 'test0101', createdBy: 'Joseph' } });
      }
      history.push('/recommendations/myrecommendations');
    } catch (error) {
      console.error(error);
    }
  };

  const listData: ListModel[] = useMemo(() => result.map((item) => ({
    id: item.id as number,
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
        isInitialValid={
          (formik: FormikValues) => validationSchema.isValidSync(formik.initialValues)
        }
      >
        {({ values, isValid, setFieldValue }: FormikValues) => (
          <Form>
            <Field name="title" label="Titulo">
              <Input placeholder="Informe um titulo" />
            </Field>
            <Field name="description" label="Descrição">
              <Textarea placeholder="Informe uma descrição " />
            </Field>
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
                      isLoading ? <div>Loading...</div>
                        : (
                          <ListSearch
                            listType="tmdb"
                            data={listData}
                            loading={isLoading}
                            onShowDetails={handleMovieDetail}
                            onSelectMovies={
                              (movie: Movies) => handleSelectMovies(
                                values.movies, movie, setFieldValue,
                              )
                            }
                          />
                        )
                    }
                  <>
                    {
                        movieContains && (<div>Filem ja exite</div>)
                      }
                  </>
                </ModalBody>
              </ModalContent>
            </Modal>
            <Field name="movies" label="Filmes">
              <Box>
                {
                    values.movies.map((selected: Movies) => (
                      <Box key={selected.movieId}>
                        <span>{selected.title}</span>
                        <IconButton
                          aria-label="remove movie"
                          variant="ghost"
                          icon={<IoCloseOutline />}
                          onClick={
                            () => handleRemoveSelectMovies(
                              values.movies, selected, setFieldValue,
                            )
                          }
                        />
                      </Box>
                    ))
                  }
              </Box>
            </Field>
            <Button onClick={onOpen}>Inserir filmes</Button>
            <ButtonGroup variant="outline" spacing="6">
              <Button colorScheme="blue" type="submit" isLoading={loadingPost || loadingEdit}>Save</Button>
              <Button onClick={() => history.push('/recommendations/myrecommendations')}>Cancel</Button>
            </ButtonGroup>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default FormRecommendation;
