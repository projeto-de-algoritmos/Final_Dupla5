import styled from 'styled-components';

import { colors } from '../../theme/colors';

export const Container = styled.input`
  height: 38px;
  color: #333;
  border: 1px solid lightgray;
  border-radius: 3px;
  padding: 0 12px;
  margin-right: 5px;
  width: 300px;

  &:focus{
    border: 1px solid #000;
  }
`;