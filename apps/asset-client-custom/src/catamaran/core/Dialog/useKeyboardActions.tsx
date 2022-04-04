import { DialogContext } from './Dialog';
import React, { useCallback, useEffect } from 'react';

const buttonMapping = {
  action: 'Enter',
  close: 'Escape',
  none: 'None'
};

type ActionVariant = 'action' | 'close' | 'none';

export const useKeyboardActions = (variant: ActionVariant, disabled: boolean) => {
  const { actionDisabled, clearPressedKey, onAction, onClose, pressedKey } =
    React.useContext(DialogContext);

  const handleClick = useCallback(
    async (e: any) => {
      if (variant === 'action') {
        await onAction(e);
      } else if (variant === 'close') {
        onClose(e);
      }
    },
    [variant, onClose, onAction]
  );

  useEffect(() => {
    if (pressedKey === buttonMapping[variant]) {
      clearPressedKey();
      if (!disabled && !actionDisabled) {
        handleClick(null);
      }
    }
  }, [clearPressedKey, disabled, handleClick, pressedKey, actionDisabled, variant]);

  return handleClick;
};
