import { IconButton as CoreIconButton, IconButtonProps } from '../../IconButton';
import { useCardContext } from '../useCardContext';
import React from 'react';

function IconButton(props: IconButtonProps) {
  const { style, ...rest } = props;
  const { hovered } = useCardContext();

  return (
    <CoreIconButton
      style={{
        ...style,
        visibility: !hovered ? 'hidden' : 'visible'
      }}
      {...rest}
    />
  );
}

export default IconButton;
