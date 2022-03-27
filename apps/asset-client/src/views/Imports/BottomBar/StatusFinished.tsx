import { CatButton } from 'catamaran/core';
import { Grid, Theme, makeStyles } from 'catamaran/core/mui';
import CheckIcon from 'catamaran/icons/Check';
import React from 'react';
import ReplayIcon from 'catamaran/icons/Replay';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  CatButton: {
    margin: theme.spacing(0, 1)
  },
  root: {
    height: '100%'
  }
}));

type Props = {
  className?: string;
  onFinish: () => void;
  onUploadAgain: () => void;
};

function StatusFinished(props: Props) {
  const classes = useStyles();
  const { className, onFinish, onUploadAgain } = props;

  return (
    <Grid
      alignItems="center"
      className={clsx(classes.root, className)}
      container
      direction="row"
      justifyContent="center"
    >
      <Grid item>
        <CatButton
          className={classes.CatButton}
          color="darkGrey"
          onClick={onUploadAgain}
          startIcon={<ReplayIcon />}
        >
          Upload Again
        </CatButton>
      </Grid>
      <Grid item>
        <CatButton
          className={classes.CatButton}
          color="green"
          endIcon={<CheckIcon />}
          onClick={onFinish}
        >
          Ok
        </CatButton>
      </Grid>
    </Grid>
  );
}

export default StatusFinished;
