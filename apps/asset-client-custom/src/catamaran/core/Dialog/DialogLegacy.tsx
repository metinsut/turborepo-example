import { DialogWrapperContext } from 'hooks/withDialogWrapper';
import { Dialog as MuiDialog, DialogProps as MuiDialogProps, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { useContext } from 'react';

const Dialog = ({
  TransitionProps,
  TransitionComponent = DialogTransition,
  ...rest
}: MuiDialogProps) => {
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
    <MuiDialog
      TransitionComponent={TransitionComponent}
      TransitionProps={{
        ...TransitionProps,
        onEnter: handleEnter,
        onExited: handleExited
      }}
      {...rest}
    />
  );
};

const DialogTransition = React.forwardRef(
  (
    props: TransitionProps & { children: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

export default Dialog;
