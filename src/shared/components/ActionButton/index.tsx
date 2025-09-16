import React, {FC, PropsWithChildren} from 'react';
import {ActionButtonProps, Button} from './styles';
import Text from '../Text';

const ActionButton: FC<PropsWithChildren<ActionButtonProps>> = function ({
  onPress,
  title,
}) {
  return (
    <Button {...{onPress}}>
      <Text variant="button" numberOfLines={1}>
        {title}
      </Text>
    </Button>
  );
};

export default ActionButton;
