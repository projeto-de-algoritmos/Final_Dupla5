import React from 'react';

import { Container, TitleContainer, Title, ListContainer, ItemsContainer, ItemsWrapper, TextWrapper, Item, DistanceText, ProfitText, ImageContainer, Image } from './styles';

const List = ({items, title, imageSrc, distance, profit}) => {
  return (
    <Container>
      {title && 
        <TitleContainer>
          <Title>{title}</Title>
        </TitleContainer>
      }
      <ListContainer title={title}>
        <ItemsContainer>
          <ItemsWrapper>
            {items.map((text,index)=>(
              <Item key={index}>{index+1}. {text}</Item>
            ))}
          </ItemsWrapper>
          <TextWrapper>
            <DistanceText>Distância total: {distance} m</DistanceText>
            <ProfitText>Lucro máximo: {profit} $</ProfitText>
          </TextWrapper>
        </ItemsContainer>
        <ImageContainer>
          <Image alt='Horse Man' src={imageSrc} />
        </ImageContainer>
      </ListContainer>
    </Container>
  )
};

export { List };