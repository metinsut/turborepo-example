import {
  AutocompleteContextProvider,
  useAutocompleteContextState
} from 'components/CatamaranTextField/Autocomplete';
import { CatKeyboardSection, CatPaper } from 'catamaran/core';
import { ClickAwayListener, Slide, SlideProps } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles({
  paper: {
    width: '50%'
  },
  root: {
    display: 'flex',
    height: 'inherit',
    justifyContent: 'flex-end',
    position: 'absolute',
    width: '100%',
    zIndex: 3
  }
});

type Props = {
  children?: React.ReactNode;
  className?: string;
  paperClassName?: string;
  clickAwayListenerDisabled?: boolean;
  open: boolean;
  onClose?: () => void;
  SlideProps?: Omit<SlideProps, 'in'>;
};

const Drawer = (props: Props) => {
  const classes = useStyles();
  const {
    children,
    className,
    clickAwayListenerDisabled = false,
    open,
    onClose,
    SlideProps = { direction: 'left' },
    paperClassName
  } = props;

  const autoCompleteContextValue = useAutocompleteContextState();

  const clickAwayDisabled = clickAwayListenerDisabled || !open;

  return (
    <CatKeyboardSection onEnter={onClose} onEscape={onClose} open={open}>
      <AutocompleteContextProvider value={autoCompleteContextValue}>
        <Slide in={open} {...SlideProps}>
          <div className={clsx(classes.root, className)}>
            <ClickAwayListener
              mouseEvent={clickAwayDisabled ? false : 'onMouseDown'}
              onClickAway={() => {
                if (!autoCompleteContextValue.open) {
                  onClose();
                }
              }}
            >
              <CatPaper className={clsx(classes.paper, paperClassName)}>{children}</CatPaper>
            </ClickAwayListener>
          </div>
        </Slide>
      </AutocompleteContextProvider>
    </CatKeyboardSection>
  );
};

export default Drawer;
