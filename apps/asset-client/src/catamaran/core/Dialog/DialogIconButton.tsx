import { DialogContext } from './Dialog';
import { IconButton, IconButtonProps } from '../IconButton';
import { useKeyboardActions } from './useKeyboardActions';
import React from 'react';

type Props = IconButtonProps & {
  component?: React.ComponentType<IconButtonProps>;
  variant?: 'action' | 'close' | 'none';
};

const DialogIconButton = ({
  component: IconButtonComponent = IconButton,
  disabled,
  loading,
  variant = 'close',
  ...rest
}: Props) => {
  const { actionDisabled } = React.useContext(DialogContext);
  const handleClick = useKeyboardActions(variant, disabled);

  return (
    <IconButtonComponent
      disabled={disabled || actionDisabled}
      loading={loading || (variant === 'action' && actionDisabled)}
      onClick={handleClick}
      {...rest}
    />
  );
};

export { DialogIconButton };
