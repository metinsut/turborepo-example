import { KeyboardSectionContext } from './KeyboardSection';
import React, { useCallback, useEffect } from 'react';

export type KeyboardKey = 'enter' | 'escape' | 'none';

export const useKeyboardActions = (key: KeyboardKey, disabled: boolean) => {
  const { clearPressedKey, onEnter, onEscape, pressedKey } = useKeyboardContext();

  const handleClick = useCallback(
    async (e: any) => {
      if (key === 'enter') {
        await onEnter(e);
      } else if (key === 'escape') {
        onEscape(e);
      }
    },
    [key, onEnter, onEscape]
  );

  useEffect(() => {
    if (pressedKey && key === pressedKey.toString().toLowerCase()) {
      clearPressedKey();
      if (!disabled) {
        handleClick(null);
      }
    }
  }, [clearPressedKey, disabled, handleClick, pressedKey, key]);

  return handleClick;
};

export function useKeyboardContext() {
  const context = React.useContext(KeyboardSectionContext);
  if (context === undefined) {
    throw new Error('useKeyboardContext must be used within a Keyboard Section');
  }
  return context;
}
