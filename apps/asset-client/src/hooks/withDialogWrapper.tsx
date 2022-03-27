import { TransitionProps } from 'catamaran/core/mui';
import React, { useState } from 'react';

interface DialogProps {
  open: boolean;
  TransitionProps?: TransitionProps;
}

type ContextType = {
  onTransitionEnter: () => void;
  onTransitionExited: () => void;
};

export const DialogWrapperContext = React.createContext<ContextType>(null);

export function withDialogWrapper<T extends DialogProps>(
  WrappedComponent: React.FunctionComponent<T>
) {
  return (props: T) => {
    const { open } = props;
    const [exited, setExited] = useState(true);

    if (!open && exited) {
      return null;
    }

    const contextValue = {
      onTransitionEnter: () => setExited(false),
      onTransitionExited: () => setExited(true)
    };

    return (
      <DialogWrapperContext.Provider value={contextValue}>
        <WrappedComponent
          TransitionProps={{
            onEnter: () => setExited(false),
            onExited: () => setExited(true)
          }}
          {...props}
        />
      </DialogWrapperContext.Provider>
    );
  };
}
