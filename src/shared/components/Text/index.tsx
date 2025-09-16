import React, {FC, PropsWithChildren} from 'react';
import {StyledText, StyledTextProps} from './styles';

const Text: FC<PropsWithChildren<StyledTextProps>> = function ({
  variant,
  children,
  ...rest
}) {
  return (
    <StyledText {...rest} {...{variant}}>
      {children}
    </StyledText>
  );
};

export default Text;
