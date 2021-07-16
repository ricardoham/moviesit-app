import React from 'react';
import { Bar, Icon } from './styles';

interface Props {
  onClose?: () => void;
}

export const CloseBar = ({ onClose }: Props): JSX.Element => (
  <Bar>
    <Icon onClick={onClose} />
  </Bar>
);
