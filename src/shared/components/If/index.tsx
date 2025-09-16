import React, {FC, PropsWithChildren} from 'react';

type Props = {
  conditional: boolean;
  elseRender?: React.ReactElement;
};

const If: FC<PropsWithChildren<Props>> = function ({
  conditional,
  elseRender,
  children,
}) {
  return conditional ? (
    <React.Fragment>{children}</React.Fragment>
  ) : !!elseRender ? (
    <React.Fragment>{elseRender}</React.Fragment>
  ) : null;
};

export default If;
