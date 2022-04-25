import React from 'react';

import { Container, Text } from './styles';

const Button = ({text, onClick, style}) => {
  return (
    <Container onClick={onClick} style={style}>
      <Text>{text}</Text>
    </Container>
  )
};

export { Button };