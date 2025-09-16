import { Dimensions } from "react-native";
import { View } from "react-native-animatable";
import styled, { css } from "styled-components/native";

const screenWidth = Dimensions.get("window").width;
export type LineProps = {
  variant?: "bold" | "regular" | "styled";
};
export const Line = styled(View).attrs(() => ({
  animation: {
    0: { width: 0 },
    1: { width: screenWidth - 32 },
  },
  duration: 350,
}))<LineProps>`
  width: 100%;
  height: ${({ variant }) => {
    switch (variant) {
      case "bold":
        return 3;
      case "styled":
        return 3;
      case "regular":
      default:
        return 1;
    }
  }}px;
  border: ${({ theme, variant }) =>
    variant !== "styled" ? `0px` : `4px ${theme.colors.onBackground} dashed`};
  background-color: ${({ theme, variant }) =>
    variant !== "styled" ? theme.colors.onBackground : theme.colors.background};
`;
