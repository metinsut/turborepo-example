import { CatAlert, CatTypography } from 'catamaran/core';
import { Divider, Slide, Snackbar } from 'catamaran/core/mui';
import { SlideProps } from '@mui/material';
import {
  SnackbarState,
  removeSnackbarFromQueue,
  selectSnackbarStates
} from 'store/slices/application';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import React, { useEffect, useState } from 'react';

function TransitionRight(props: SlideProps) {
  const [direction, setDirection] = useState<'left' | 'down'>('left');
  const { onExited, ...rest } = props;
  return (
    <Slide
      {...rest}
      direction={direction}
      onEntering={() => setDirection('down')}
      onExited={(node) => {
        onExited(node);
        setDirection('left');
      }}
    />
  );
}

export function SmoothSnackbar() {
  const [open, setOpen] = useState(false);
  const [activeSnackbar, setActiveSnackbar] = useState<SnackbarState>();

  const snackbarStates = useTypedSelector(selectSnackbarStates);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (snackbarStates.length && !activeSnackbar) {
      setActiveSnackbar({ ...snackbarStates[0] });
      dispatch(removeSnackbarFromQueue());
      setOpen(true);
    } else if (snackbarStates.length && activeSnackbar && open) {
      setOpen(false);
    }
  }, [activeSnackbar, dispatch, open, snackbarStates]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleExited = () => {
    setActiveSnackbar(undefined);
  };

  if (!activeSnackbar) {
    return null;
  }

  return (
    <Snackbar
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      autoHideDuration={activeSnackbar?.autoHide ? activeSnackbar?.autoHideDuration : null}
      onClose={handleClose}
      open={open}
      TransitionComponent={TransitionRight}
      TransitionProps={{
        onExited: handleExited
      }}
    >
      <CatAlert onClose={handleClose} severity={activeSnackbar?.type}>
        <CatTypography variant="subtitle1">{activeSnackbar?.message}</CatTypography>
        <Divider orientation="vertical" />
      </CatAlert>
    </Snackbar>
  );
}
