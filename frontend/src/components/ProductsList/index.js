import React from 'react';

import { colors } from '../../theme/colors';


import { Button } from '../Button';

import { Container, ItemRow, ListContainer, ItemsContainer, ItemsWrapper, Item, DistanceText } from './styles';

const ProductsList = ({items, onDelete }) => {
  return (
    <Container>
      <ListContainer>
        <ItemsContainer>
          <ItemsWrapper>
            <ItemRow style={{color: colors.red}}>
              <Item>Nome</Item>
              <Item>Peso</Item>
              <Item>Valor</Item>
              <Item style={{width: "50px"}}></Item>
            </ItemRow>
            {items.map((e, index)=>(
              <ItemRow>
                <Item key={`${index}a`}>{e.name}</Item>
                <Item key={`${index}b`}>{e.weight} Kg</Item>
                <Item key={`${index}c`}>{e.value} $</Item>
                <Button text="X" style={{width: "50px"}} onClick={()=>{console.log(index);onDelete(index);}} />
              </ItemRow>
            ))}
          </ItemsWrapper>
          <DistanceText>Total de itens: {items.length}</DistanceText>
        </ItemsContainer>
      </ListContainer>
    </Container>
  )
};

export { ProductsList };