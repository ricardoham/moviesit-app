import styled from '@emotion/styled';

interface StyledProps {
  hasError?: boolean;
}

export const StyledLabel = styled.label<StyledProps>`
  color: ${(props) => (props.hasError ? '#ff3243' : '#181818')};
`;
