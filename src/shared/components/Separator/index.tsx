import React, { FC } from "react";
import { Line, LineProps } from "./styles";
import { ViewProps } from "react-native";

const Separator: FC<LineProps & ViewProps> = function (props) {
  return <Line {...props} />;
};

export default Separator;
