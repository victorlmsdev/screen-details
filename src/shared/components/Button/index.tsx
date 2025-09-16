import React, { FC, PropsWithChildren } from "react";
import { StyledButtonProps, StyledButton } from "./styles";
import Text from "../Text";
import Loader from "../Loader";

const Button: FC<PropsWithChildren<StyledButtonProps>> = function ({
  onPress,
  loading,
  children,
  ...rest
}) {
  return (
    <StyledButton {...{ onPress }} {...rest}>
      <Text variant="button" numberOfLines={1}>
        {loading ? <Loader /> : children}
      </Text>
    </StyledButton>
  );
};

export default Button;
