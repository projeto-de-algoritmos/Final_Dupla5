import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import horseMan from '../../assets/horse_man.png';
import MapRD from '../../assets/map.png';

import api from '../../services/api';

import { colors } from '../../theme/colors';

import Select from 'react-select';
import { Button } from '../../components/Button';
import { List } from '../../components/List';
import { ProductsList } from '../../components/ProductsList';
import { Input } from '../../components/Input';

import { InputSection, IntroSection, IntroText, SelectSection, PathSection, MapSection, Container, Footer, SelectContainer, ErrorMessageContainer, ErrorMessage } from './styles';

// custom styles
const customStyles = {
  content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: 'transparent',
      border: 'none'
  },
};

const selectStyles = {
  menu: (provided, state) => ({
    ...provided,
    border: `1px solid ${colors.black}`,
  }),
  control: (provided, state) => ({
    ...provided,
    boxShadow: state.isFocused && `1px solid ${colors.black}`, 
    border: state.isFocused && `1px solid ${colors.black}`, 
    '&:hover': {
      boxShadow: state.isFocused && `1px solid ${colors.black}`,
      border: state.isFocused && `1px solid ${colors.black}`
    }, 
  }),
  option: (provided, state) => ({
    ...provided,
    background: state.isSelected ? colors.red : state.isFocused && colors.lightRed,
    color: state.isSelected ? colors.white : colors.black,
    padding: 15,
  })
}
// =====================================================================================

const Home = () => {
  const START_CITY = 'Blackwater'

  const [cities, setCities] = useState([]);
  const [endCity, setEndCity] = useState('');
  const [path, setPath] = useState();
  const [knapsack, setKnapsack] = useState([]);
  const [distance, setDistance] = useState();
  const [profit, setProfit] = useState();
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [value, setValue] = useState('');
  const [maxWeight, setMaxWeight] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isProductError, setIsProductError] = useState(false);
  const [isProductIntError, setIsProductIntError] = useState(false);

  const handleCloseModal = async () => {
      setIsOpen(false);
  }

  //load cities from api
  useEffect(()=> {
    const loadCities = async () => {
      try{
        const { data } = await api.get('/cities');
  
        const options = [];
  
        data.forEach((e)=>{
          options.push(
            {
              value: e,
              label: e
            }
          );
  
          return options;
        })
        
        setCities(options);
      } catch(e) {
        console.error(e);
        setIsError(true);
      }
    }
    
    loadCities();
  }, [])

  const addProduct = () => {
    if(name.length === 0 || weight.length === 0 || value.length === 0){
      setIsProductError(true);
      return;
    };

    if(!Number.isInteger(parseInt(weight)) || !Number.isInteger(parseInt(value))){
      setIsProductIntError(true);
      return;
    };


    setIsProductError(false);
    setIsProductIntError(false);

    const data = {
      name,
      weight,
      value
    };

    setKnapsack([...knapsack, data]);
  }

  const removeProduct = (index) => {
    const knapsackCopy = knapsack;
    knapsackCopy.splice(index,1);
    setKnapsack([...knapsackCopy]);
  }

  // @REMOVE later
  useEffect(()=>{
    console.log('knapsack', knapsack);
  }, [knapsack])

  // @REMOVE later
  useEffect(()=>{
    console.log('profit', profit);
  }, [profit])

  const findPath = async () => {
    try {
      const { data } = await api.post('/path', {
          start: START_CITY,
          end: endCity
      });

      const { path, distance } = data;
      
      setPath(path);
      setDistance(distance);
      setIsOpen(true);
  
      return data;
    } catch(e) {
      console.error(e);
      setIsError(true);
    }
  }

  const findProfit = async () => {
    try {
      let weights = []
      let values = [];

      knapsack.forEach((e)=>{
        weights.push(parseInt(e.weight));
        values.push(parseInt(e.value));
      })
      
      const { data } = await api.post('/profit', {
          max_weight: parseInt(maxWeight),
          weights,
          values
      });
      
      setProfit(data)
      setIsOpen(true);
  
      return data;
    } catch(e) {
      console.error(e);
      setIsError(true);
    }
  }

  const handleFindBestPath = () => {
    if(!knapsack.length>0 || endCity === ''){
      setIsError(true);
      return;
    }
    setIsError(false);
    findProfit();
    findPath();
  }

  return (
      <>
        <Container>
          <IntroSection>
            <IntroText>Bem-vindo(a) ao projeto Red Dead Map!<br /> Neste projeto, você pode encontrar o menor caminho entre uma cidade e outra do mapa do jogo Red Dead Redemption II.</IntroText>
          </IntroSection>
          <SelectSection>
            <SelectContainer>
              <Select
                options={cities}
                placeholder='Escolha uma cidade de destino...'
                styles={selectStyles}
                onChange={(e)=>{
                    setEndCity(e.value);
                }}
              />
            </SelectContainer>
            <SelectContainer>
              <Input placeholder="Máximo de carga" 
                  value={maxWeight}
                  onChange={e=>setMaxWeight(e.target.value)}
                  style={{width: "330px"}}
              />
            </SelectContainer>
            <Button text='Localizar' onClick={handleFindBestPath} />
          </SelectSection>
          <InputSection>
            <Input placeholder="Nome da mercadoria" 
                value={name}
                onChange={e=>setName(e.target.value)}
            />
            <Input placeholder="Peso da mercadoria" 
                value={weight}
                onChange={e=>setWeight(e.target.value)}
            />
            <Input placeholder="Valor da mercadoria" 
                value={value}
                onChange={e=>setValue(e.target.value)}
            />
            <Button text='Adicionar' onClick={addProduct} style={{marginLeft: '10px'}} />
          </InputSection>
          {isError && (
            <ErrorMessageContainer>
              <ErrorMessage>Pesquisa inválida, preencha todos os campos.</ErrorMessage>
            </ErrorMessageContainer>
          )}
          {isProductError && (
            <ErrorMessageContainer>
              <ErrorMessage>Preencha todos os campos de produto antes de adicionar.</ErrorMessage>
            </ErrorMessageContainer>
          )}
          {isProductIntError && (
            <ErrorMessageContainer>
              <ErrorMessage>O peso e o valor do produto devem ser números inteiros.</ErrorMessage>
            </ErrorMessageContainer>
          )}
          {knapsack.length>0 && <ProductsList items={knapsack} onDelete={removeProduct} />}
          <MapSection src={MapRD} />
          <Modal isOpen={isOpen} onRequestClose={handleCloseModal} style={customStyles}>
              <PathSection>
              {path && profit && (
                  <List items={path} distance={distance} profit={profit} title='Melhor Rota' imageSrc={horseMan} />
                  )}
              </PathSection>
              <Button text='Fechar' onClick={handleCloseModal} />
          </Modal>
          <Footer>
              <p>
              powered by <strong>Vinicius Saturnino</strong> e <strong>Mateus Gomes</strong>
              </p>
          </Footer>
        </Container>
      </>
  )
};

export { Home };