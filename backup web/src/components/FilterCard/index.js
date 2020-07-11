import React from 'react';
import { Container } from './styles';

import filter from '../../assets/filter.svg';

function FilterCard({ title, actived }) {
  return (
    <Container actived={actived}>
      <img src={filter} alt='Filtro' />
      <span>{title}</span>
    </Container>
  );
}

export default FilterCard;
