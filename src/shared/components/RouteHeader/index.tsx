import React, { FC } from "react";
import Text from "../Text";

type Props = {
  name?: string;
};

const renderHeader: FC<Props> = ({ name = "Screen Details" }) => {
  return <Text variant="title">{name}</Text>;
};

export default renderHeader;
