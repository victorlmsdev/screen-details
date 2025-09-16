import {ButtonProps} from 'react-native';
import styled from 'styled-components/native';

export type ActionButtonProps = ButtonProps;

export const Button = styled.Pressable`
  padding: 0px 8px;
  height: 35px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({theme}) => theme.colors.onBackground};
`;
