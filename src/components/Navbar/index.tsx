import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (): JSX.Element => (
  <ul>
    <li>
      <Link to="/">Home</Link>
      <Link to="/movies">Filmes</Link>
      <Link to="/people">Atores e Diretores</Link>
      <Link to="/recommendations">Recomendações de filmes</Link>
    </li>
  </ul>
);

export default Navbar;
