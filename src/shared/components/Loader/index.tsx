import React, { FC } from "react";
import { ActivityIndicator, View } from "react-native";
import { Animation, Container, Props } from "./styles";
import { useTheme } from "styled-components/native";
import If from "../If";
import { PageLoaderAnimation } from "~/shared/assets";

const Loader: FC<Props> = function ({
  fullPage,
  isLoading,
  loaderProps,
  ...props
}) {
  const theme = useTheme();
  return (
    <Container {...props} {...{ fullPage }}>
      <If
        conditional={!!fullPage}
        elseRender={
          <ActivityIndicator
            {...loaderProps}
            animating={isLoading}
            size={props?.size ?? fullPage ? "large" : "small"}
            color={theme.colors.onBackground}
          />
        }>
        <Animation source={PageLoaderAnimation} loop autoPlay />
      </If>
    </Container>
  );
};

export default Loader;
