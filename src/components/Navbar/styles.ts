import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

interface StyledProps {
  isHamburger: boolean;
}

export const StyledNavbar = styled.nav<StyledProps>`
  display: flex;
  flex-flow: ${({ isHamburger }: StyledProps) => (isHamburger ? 'column' : 'row')};
  justify-content: space-evenly;
  align-items: ${({ isHamburger }: StyledProps) => (isHamburger ? 'flex-start' : 'center')};
  border-radius: 8px;
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
  text-align: center
`;
