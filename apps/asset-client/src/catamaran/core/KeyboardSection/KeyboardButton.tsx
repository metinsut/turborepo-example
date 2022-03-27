import { Button, ButtonProps } from '../Button';
import { KeyboardKey, useKeyboardActions, useKeyboardContext } from './useKeyboardActions';
import React from 'react';

type Props = ButtonProps & {
  keyboardKey: KeyboardKey;
  component?: React.ComponentType<ButtonProps>;
};

function KeyboardButton({
  disabled,
  keyboardKey,
  loading,
  component: ButtonComponent = Button,
  ...rest
}: Props) {
  const { enterDisabled, escapeDisabled } = useKeyboardContext();

  let keyboardDisabled = false;
  switch (keyboardKey) {
    case 'enter':
      keyboardDisabled = enterDisabled;
      break;
    case 'escape':
      keyboardDisabled = escapeDisabled;
      break;
    default:
      keyboardDisabled = false;
      break;
  }

  const buttonDisabled = keyboardDisabled || disabled;
  const buttonLoading = loading || keyboardDisabled;

  const handleClick = useKeyboardActions(keyboardKey, buttonDisabled);

  return (
    <ButtonComponent
      disabled={buttonDisabled}
      loading={buttonLoading}
      onClick={handleClick}
      {...rest}
    />
  );
}

export default KeyboardButton;
