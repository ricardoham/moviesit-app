import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './styles';

interface Props {
  isAdmin?: boolean;
}

const Navbar = ({ isAdmin }: Props): JSX.Element => (
  <S.StyledNavbar>
    <S.NavbarLink to="/">Home</S.NavbarLink>
    <S.NavbarLink to="/movies">Filmes</S.NavbarLink>
    <S.NavbarLink to="/people">Atores e Diretores</S.NavbarLink>
    <S.NavbarLink to="/recommendations">Recomendações de filmes</S.NavbarLink>
    <S.NavbarLink to="/profile">Perfil</S.NavbarLink>
    {
      isAdmin
    && <S.NavbarLink to="/admin">Admin Dashboard</S.NavbarLink>
    }
  </S.StyledNavbar>
);

export default Navbar;
