import LottieView from "lottie-react-native";
import { ActivityIndicatorProps, Dimensions } from "react-native";
import styled, { css } from "styled-components/native";
import { PageLoaderAnimation } from "~/shared/assets";

const screenWidth = Dimensions.get("window").width;

export type Props = {
  fullPage?: boolean;
  isLoading?: boolean;
  size?: "large" | "small";
  loaderProps?: ActivityIndicatorProps;
};

export const Container = styled.View<Props>`
  ${({ fullPage, theme }) => {
    if (fullPage) {
      return css`
        flex: 1;
        background-color: ${theme.colors.background};
        align-items: center;
        justify-content: center;
      `;
    }
  }}
`;

export const Animation = styled(LottieView)`
  width: ${screenWidth / 3}px;
  flex: 1;
`;
