import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './styles';

const Navbar = (): JSX.Element => (
  <S.StyledNavbar>
    <S.NavbarLink to="/">Home</S.NavbarLink>
    <S.NavbarLink to="/movies">Filmes</S.NavbarLink>
    <S.NavbarLink to="/people">Atores e Diretores</S.NavbarLink>
    <S.NavbarLink to="/recommendations">Recomendações de filmes</S.NavbarLink>
    <S.NavbarLink to="/profile">Perfil</S.NavbarLink>
  </S.StyledNavbar>
);

export default Navbar;
