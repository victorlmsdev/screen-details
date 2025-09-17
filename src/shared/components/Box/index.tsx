import React, { FC, PropsWithChildren } from "react";
import { BoxProps, View } from "./styles";

const Box: FC<PropsWithChildren<BoxProps>> = function (props) {
  return <View {...props} />;
};

export default Box;
