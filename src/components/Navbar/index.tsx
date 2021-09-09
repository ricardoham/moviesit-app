import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './styles';

interface Props {
  isAdmin?: boolean;
  isHamburger: boolean;
  onSelect?: () => void;
}

const Navbar = ({ isAdmin, isHamburger, onSelect }: Props): JSX.Element => (
  <S.StyledNavbar isHamburger={isHamburger}>
    <S.NavbarLink to="/" onClick={onSelect}>Home</S.NavbarLink>
    <S.NavbarLink to="/movies" onClick={onSelect}>Filmes</S.NavbarLink>
    <S.NavbarLink to="/people" onClick={onSelect}>Atores e Diretores</S.NavbarLink>
    <S.NavbarLink to="/recommendations" onClick={onSelect}>Recomendações de filmes</S.NavbarLink>
    <S.NavbarLink to="/profile" onClick={onSelect}>Perfil</S.NavbarLink>
    {
      isAdmin
    && <S.NavbarLink to="/admin" onClick={onSelect}>Admin Dashboard</S.NavbarLink>
    }
  </S.StyledNavbar>
);

export default Navbar;
