import styled from '@emotion/styled';
import { IoCloseOutline } from 'react-icons/io5';

export const Bar = styled.div`
  display: flex;
  padding: 12px;
  flex-flow: column;
  box-shadow: 0 3px 7px 0 rgba(0,0,0,0.2);
  margin-bottom: 8px;
`;

export const Icon = styled(IoCloseOutline)`
  align-self: flex-end;
  width: 36px;
  height: 36px;
  cursor: pointer;
  color: #535c68;
`;
