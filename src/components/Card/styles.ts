import styled from '@emotion/styled';

export const CardContainer = styled.div`
  display: flex;
`;

export const CardControl: any = styled.div`
  display: flex;
  flex-flow: column;
  padding: 12px 8px;
  text-align: start;
`;

CardControl.Header = styled.span`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
`;
