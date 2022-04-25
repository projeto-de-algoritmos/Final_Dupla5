import React from 'react';

import { Container } from './styles';

const Input = ({placeholder, value, onChange, style}) => {
  return (
    <Container placeholder={placeholder} value={value} onChange={onChange} style={style} />
  )
};

export { Input };