import styled from "styled-components/native";
import { Column, Row } from "~/shared/components";
import AntIcon from "@expo/vector-icons/MaterialIcons";
import UISlider from "@react-native-community/slider";
import { Bar } from "react-native-progress";

export const Container = styled(Row)`
  justify-content: space-between;
  align-items: center;
`;

export const Content = styled(Column)`
  width: auto;
`;

export const ProgressBar = styled(Bar).attrs(({ theme }) => ({
  color: theme.colors.success,
  borderRadius: 0,
  unfilledColor: theme.colors.error,
  borderWidth: 0,
  width: null,
  height: 10,
}))``;

export const Icon = styled(AntIcon)`
  margin: 0px 16px;
`;

export const Slider = styled(UISlider).attrs(({ theme }) => ({
  thumbTintColor: theme.colors.onBackground,
  minimumTrackTintColor: theme.colors.onBackground,
}))``;
