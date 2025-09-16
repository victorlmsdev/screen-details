import styled from "styled-components/native";
import AntIcon from "@expo/vector-icons/MaterialIcons";
import { View } from "react-native-animatable";

export const Container = styled.View`
  width: 100%;
  height: 80px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-color: ${({ theme }) => theme.colors.onBackground};
  border-top-width: 4px;
  background-color: ${({ theme }) => theme.colors.background};
`;

type IconProps = {
  color?: string;
  isActive: boolean;
};

export const Icon = styled(AntIcon).attrs(({ theme, isActive }) => ({
  size: 32,
  color: isActive ? theme.colors.onBackground : theme.colors.inactive,
}))<IconProps>``;

export const Pressable = styled.Pressable`
  width: 30%;
  height: 80px;
  align-items: center;
  justify-content: center;
`;

export const Spot = styled(View)`
  top: 60px;
  width: 30px;
  height: 5px;
  background-color: ${({ theme }) => theme.colors.onBackground};
  position: absolute;
`;
