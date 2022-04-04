import { IconButton, IconButtonProps } from '../IconButton';
import { KeyboardKey, useKeyboardActions, useKeyboardContext } from './useKeyboardActions';
import React from 'react';

type Props = IconButtonProps & {
  keyboardKey: KeyboardKey;
  component?: React.ComponentType<IconButtonProps>;
};

function KeyboardButton({
  disabled,
  keyboardKey,
  loading,
  component: IconButtonComponent = IconButton,
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
    <IconButtonComponent
      disabled={buttonDisabled}
      loading={buttonLoading}
      onClick={handleClick}
      {...rest}
    />
  );
}

export default KeyboardButton;
