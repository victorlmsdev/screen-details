import React, {FC, PropsWithChildren} from 'react';
import {StyledColumn} from './styles';
import {BoxProps} from '../Box/styles';

const Column: FC<PropsWithChildren<BoxProps>> = function ({children, ...rest}) {
  return <StyledColumn {...rest}>{children}</StyledColumn>;
};

export default Column;
