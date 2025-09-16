import { View } from "react-native-animatable";
import styled from "styled-components/native";
import { Row } from "~/shared/components";

export const Container = styled(View)`
  width: 100%;
  height: 60px;
  padding: 5px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.onBackground};
  margin-top: 16px;
  align-items: center;
  justify-content: center;
`;

export const InnerBorder = styled(Row)`
  flex: 1;
  align-items: center;
  padding: 8px;
  border: 2px dotted;
  border-color: ${({ theme }) => theme.colors.onBackground};
  justify-content: center;
`;

export const Input = styled.TextInput`
  width: 90%;
  height: 60px;
  font-family: ${({ theme }) => theme.font.default};
  color: ${({ theme }) => theme.colors.onBackground};
`;
