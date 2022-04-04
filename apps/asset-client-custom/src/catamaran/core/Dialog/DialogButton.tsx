import { Button, ButtonProps } from '../Button';
import { DialogContext } from './Dialog';
import { useKeyboardActions } from './useKeyboardActions';
import React from 'react';

type Props = Omit<ButtonProps, 'variant'> & {
  variant: 'action' | 'close' | 'none';
  component?: React.ComponentType<ButtonProps>;
};

const DialogButton = ({
  disabled,
  component: ButtonComponent = Button,
  loading,
  variant,
  ...rest
}: Props) => {
  const { actionDisabled } = React.useContext(DialogContext);
  const handleClick = useKeyboardActions(variant, disabled);

  return (
    <ButtonComponent
      disabled={disabled || actionDisabled}
      loading={loading || (variant === 'action' && actionDisabled)}
      onClick={handleClick}
      {...rest}
    />
  );
};

export { DialogButton };
