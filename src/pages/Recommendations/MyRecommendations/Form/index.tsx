import React, { useMemo, useState } from 'react';
import { Formik, FormikValues } from 'formik';
import * as yup from 'yup';
import { Movies, Recommendations } from 'model/recommendations';
import {
  Box, Button, ButtonGroup, IconButton, Input, Modal, ModalBody, Heading,
  useToast, Spinner,
  ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Textarea, useDisclosure,
} from '@chakra-ui/react';
import Field from 'components/Field';
import Search from 'components/Search';
import { ListModel } from 'model/list';
import { useHistory, useLocation } from 'react-router-dom';
import ListSearch from 'components/ListSearch';
import { IoCloseOutline } from 'react-icons/io5';
import { useApiOperation } from 'hooks/useApiOperation';
import { useAuth0 } from '@auth0/auth0-react';
import { useFetch } from 'hooks/useFetch';
import { TMDBResults } from 'model/tmbd';
import { Form } from './styles';

const FormRecommendation = (): JSX.Element => {
  const { user } = useAuth0();
  const { state } = useLocation<{ recommendation: Recommendations } | undefined>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ data, loadingFetch, errorFetch }, doFetch, fetchData] = useFetch<TMDBResults>();
  const [loadingPost, insertData] = useApiOperation({ operation: 'insert' });
  const [loadingEdit, editData] = useApiOperation({ operation: 'edit' });
  const [query, setQuery] = useState('');
  const [showMoviesList, setShowMoviesList] = useState(false);
  const [movieContains, setMovieContains] = useState(false);
  const history = useHistory();
  const toast = useToast();

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

  const handleNext = () => {
    const nextPage = data?.page && data?.page + 1;
    if (nextPage === data?.totalPages) {
      return;
    }
    doFetch(`/client/tmdb?name=${query}&page=${nextPage}`);
  };

  const handlePrevious = () => {
    const previousPage = data?.page && data?.page - 1;
    if (previousPage === 0) {
      return;
    }
    doFetch(`/client/tmdb?name=${query}&page=${previousPage}`);
  };

  const handleSelectMovies = (
    movies: Movies[],
    movie: Movies,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setField: (field: string, value: any) => void,
  ) => {
    const alreadyRecommendation = movies.find((item) => item.movieId === movie.movieId);

    if (alreadyRecommendation) {
      setMovieContains(true);
      toast({
        title: 'Filme já está na lista',
        status: 'warning',
        isClosable: true,
        position: 'top',
      });
      return;
    }
    setField('movies', [...movies, movie]);
    toast({
      title: 'Filme adicionado na lista',
      status: 'info',
      isClosable: true,
      position: 'top',
    });
  };

  const handleRemoveSelectMovies = (
    movies: Movies[],
    movie: Movies,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setField: (field: string, value: any) => void,
  ) => {
    const newList = movies?.filter((l) => l.movieId !== movie.movieId);

    setField('movies', newList);
  };

  const handleCloseModal = () => {
    doFetch('');
    setQuery('');
  };

  const handleSubmit = async (dataForm: Recommendations) => {
    try {
      if (state) {
        await editData({ url: `/recommendations/${state.recommendation._id}`, body: { ...dataForm } });
      } else {
        await insertData({ url: '/recommendations', body: { ...dataForm, userId: user?.sub, createdBy: user?.name } });
      }
      toast({
        title: 'Novo item criado',
        status: 'success',
        isClosable: true,
        position: 'top',
      });
      history.push('/recommendations/myrecommendations');
    } catch (error) {
      toast({
        title: 'Erro ao criar novo item',
        status: 'error',
        isClosable: true,
        position: 'top',
      });
    }
  };

  const listData: ListModel[] | undefined = useMemo(() => data?.results.map((item) => ({
    id: item.id as number,
    header: item.title,
    overview: item.overview,
    poster: item.posterPath,
  })), [data]);

  return (
    <Box
      bg="white"
      display="flex"
      flexFlow="column"
      p={4}
      m={2}
    >
      <Heading as="h3" size="lg">{`${state?.recommendation ? 'Editar recomendação' : 'Cadastrar nova recomendação'}`}</Heading>
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
                <ModalCloseButton onClick={handleCloseModal} />
                <ModalBody display="flex" flexFlow="column">
                  {
                      loadingFetch ? <Spinner alignSelf="center" m={12} size="lg" />
                        : (
                          <>
                            <ListSearch
                              listType="tmdb"
                              data={listData}
                              loading={loadingFetch}
                              onShowDetails={handleMovieDetail}
                              onSelectMovies={
                              (movie: Movies) => handleSelectMovies(
                                values.movies, movie, setFieldValue,
                              )
                            }
                              onNextPage={handleNext}
                              onPreviousPage={handlePrevious}
                            />
                          </>
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
            <Button variant="outline" colorScheme="teal" onClick={onOpen}>Inserir filmes</Button>
            <ButtonGroup variant="outline" spacing="6" mt={4}>
              <Button colorScheme="blue" type="submit" isLoading={loadingPost || loadingEdit}>Salvar</Button>
              <Button onClick={() => history.push('/recommendations/myrecommendations')}>Cancelar</Button>
            </ButtonGroup>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default FormRecommendation;
