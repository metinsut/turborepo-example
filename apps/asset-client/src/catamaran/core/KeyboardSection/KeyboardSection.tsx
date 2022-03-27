import { styled } from 'catamaran/core/mui';
import React, { useState } from 'react';
import TrapFocus, { TrapFocusProps } from '@mui/material/Unstable_TrapFocus';
import useLoadingWithoutDispatch from 'hooks/useLoadingWithoutDispatch';

type Props = Omit<TrapFocusProps, 'children'> & {
  className?: string;
  children: React.ReactNode;
  onEnter?: (() => Promise<void>) | (() => void);
  onEscape?: (() => Promise<void>) | (() => void);
};

const KeyboardContainer = styled('div')({
  ':focus-within': {
    outline: 'none'
  }
});

export const KeyboardSectionContext = React.createContext(null);

function KeyboardSection(
  { className, children, onEnter, onEscape, open, ...rest }: Props,
  ref: React.Ref<any>
) {
  const [pressedKey, setPressedKey] = useState<string>('');
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      setPressedKey(event.key);
      event.stopPropagation();
    }
  };
  const clearPressedKey = () => {
    setPressedKey('');
  };

  const [enterLoading, asyncEnterLoading] = useLoadingWithoutDispatch();
  const handleEnter = async () => {
    await asyncEnterLoading(onEnter());
  };

  const [escapeLoading, asyncEscapeLoading] = useLoadingWithoutDispatch();
  const handleEscape = async () => {
    await asyncEscapeLoading(onEscape());
  };

  const contextValue = {
    clearPressedKey,
    enterDisabled: enterLoading,
    escapeDisabled: escapeLoading,
    onEnter: handleEnter,
    onEscape: handleEscape,
    open,
    pressedKey
  };

  return (
    <KeyboardSectionContext.Provider value={contextValue}>
      <TrapFocus open={open} {...rest}>
        <KeyboardContainer className={className} onKeyDown={handleKeyDown} ref={ref} tabIndex={-1}>
          {children}
        </KeyboardContainer>
      </TrapFocus>
    </KeyboardSectionContext.Provider>
  );
}

export default React.forwardRef(KeyboardSection);
