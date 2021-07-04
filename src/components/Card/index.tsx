import React from 'react';
import PictureCard from 'components/PictureCard';
import { CardContainer, CardControl } from './styles';

interface Props {
  image: string;
  header: string;
  text: string;
}

const Card = ({ image, header, text }: Props): JSX.Element => (
  <CardContainer>
    <PictureCard image={image} altName="test" />
    <CardControl>
      <CardControl.Header>{header}</CardControl.Header>
      <p>{text}</p>
    </CardControl>
  </CardContainer>
);

export default Card;
