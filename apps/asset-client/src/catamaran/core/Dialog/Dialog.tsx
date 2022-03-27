import { DialogWrapperContext } from 'hooks/withDialogWrapper';
import { Dialog as MuiDialog, DialogProps as MuiDialogProps, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import useLoadingWithoutDispatch from 'hooks/useLoadingWithoutDispatch';

type Sizes = 'small' | 'medium' | 'large';

export type DialogProps = MuiDialogProps & {
  size?: Sizes;
  enableEscapeClose?: boolean;
  enableBackdropClickClose?: boolean;
  onAction?: () => Promise<void>;
};

const DialogContext = React.createContext(null);

const Dialog = ({
  children,
  enableBackdropClickClose = false,
  enableEscapeClose = false,
  onAction,
  onClose,
  open = false,
  size = 'small',
  TransitionProps,
  TransitionComponent = DialogTransition,
  ...rest
}: DialogProps) => {
  const getWidth = () => {
    if (size === 'small') {
      return 'small-width';
    }
    if (size === 'medium') {
      return 'medium-width';
    }
    return 'large-width';
  };

  const getMaxWidth = () => {
    if (size === 'small') {
      return 'sm';
    }
    if (size === 'medium') {
      return 'md';
    }
    return 'lg';
  };

  const [pressedKey, setPressedKey] = useState<string>('');
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      setPressedKey(event.key);
    }
  };
  const clearPressedKey = () => {
    setPressedKey('');
  };

  const [actionLoading, asyncActionLoading] = useLoadingWithoutDispatch();
  const handleAction = async () => {
    await asyncActionLoading(onAction());
  };

  const contextValue = {
    actionDisabled: actionLoading,
    clearPressedKey,
    onAction: handleAction,
    onClose,
    open,
    pressedKey
  };

  const handleClose = (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (
      (reason === 'backdropClick' && enableBackdropClickClose) ||
      (reason === 'escapeKeyDown' && enableEscapeClose)
    ) {
      onClose(event, reason);
    }
  };

  const dialogWrapperContext = useContext(DialogWrapperContext);
  const handleEnter = (node: HTMLElement, isAppearing: boolean) => {
    TransitionProps?.onEnter(node, isAppearing);
    dialogWrapperContext?.onTransitionEnter();
  };
  const handleExited = (node: HTMLElement) => {
    TransitionProps?.onExited(node);
    dialogWrapperContext?.onTransitionExited();
  };

  return (
    <DialogContext.Provider value={contextValue}>
      <MuiDialog
        maxWidth={getMaxWidth()}
        onClose={handleClose}
        onKeyDown={handleKeyDown}
        open={open}
        PaperProps={{
          className: clsx(getWidth(), 'dialog-wrapper py16')
        }}
        TransitionComponent={TransitionComponent}
        TransitionProps={{
          ...TransitionProps,
          onEnter: handleEnter,
          onExited: handleExited
        }}
        {...rest}
      >
        {children}
      </MuiDialog>
    </DialogContext.Provider>
  );
};

const DialogTransition = React.forwardRef(
  (
    props: TransitionProps & { children: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

export { Dialog, DialogContext };
