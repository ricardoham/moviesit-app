import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const StyledNavbar = styled.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 8px;
  margin: 8px 12px 16px 12px;
`;

export const NavbarLink = styled(NavLink)`
  margin: 8px;
  font-size: 1em;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  text-decoration: none;
  text-indent: 0.3em;
  color: #181818;
  border-bottom: 3px solid transparent;
  font-weight: bold;
`;
