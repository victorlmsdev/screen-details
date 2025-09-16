import UISlider from "@react-native-community/slider";
import styled from "styled-components/native";

export const Slider = styled(UISlider).attrs(({ theme }) => ({
  thumbTintColor: theme.colors.onBackground,
  minimumTrackTintColor: theme.colors.onBackground,
}))``;
