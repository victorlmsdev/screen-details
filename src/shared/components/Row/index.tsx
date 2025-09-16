import React, {FC, PropsWithChildren} from 'react';
import {StyledRow} from './styles';
import {BoxProps} from '../Box/styles';

const Row: FC<PropsWithChildren<BoxProps>> = function ({children, ...rest}) {
  return <StyledRow {...rest}>{children}</StyledRow>;
};

export default Row;
