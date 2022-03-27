import { Box, CatButton } from 'catamaran/core';
import { Paper, Theme, makeStyles } from 'catamaran/core/mui';
import { showSnackbarMessage } from 'store/slices/application';
import { useTypedDispatch } from 'hooks';
import CancelIcon from 'catamaran/icons/Cancel';
import CheckIcon from 'catamaran/icons/Check';
import InfoIcon from 'catamaran/icons/Info';
import React from 'react';
import TrashIcon from 'catamaran/icons/Trash';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    marginLeft: theme.spacing(1),
    width: '10vw'
  },
  root: {
    height: '70vh',
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    width: '100%'
  }
}));

type Props = {
  className?: string;
};

function Snackbars(props: Props) {
  const classes = useStyles();
  const { className } = props;
  const dispatch = useTypedDispatch();

  return (
    <Paper className={clsx(classes.root, className)}>
      <Box flex>
        <CatButton
          className={classes.button}
          color="green"
          onClick={() => dispatch(showSnackbarMessage('Test success message', 'success'))}
          size="large"
          startIcon={<CheckIcon />}
        >
          Success Snackbar
        </CatButton>
        <CatButton
          className={classes.button}
          color="blue"
          onClick={() => dispatch(showSnackbarMessage('Test info message', 'info'))}
          size="large"
          startIcon={<InfoIcon />}
        >
          Info Snackbar
        </CatButton>
        <CatButton
          className={classes.button}
          color="orange"
          onClick={() => dispatch(showSnackbarMessage('Test warning message', 'warning'))}
          size="large"
          startIcon={<CancelIcon />}
        >
          Warning Snackbar
        </CatButton>
        <CatButton
          className={classes.button}
          color="red"
          onClick={() => dispatch(showSnackbarMessage('Test error message', 'error'))}
          size="large"
          startIcon={<TrashIcon />}
        >
          Error Snackbar
        </CatButton>
      </Box>
    </Paper>
  );
}

export default Snackbars;
