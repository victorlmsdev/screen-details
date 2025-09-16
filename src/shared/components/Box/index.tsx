import React, {FC, PropsWithChildren} from 'react';
import {View, BoxProps} from './styles';

const Box: FC<PropsWithChildren<BoxProps>> = function (props) {
  return <View {...props} />;
};

export default Box;
