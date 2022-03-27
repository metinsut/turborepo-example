import { CatButton } from 'catamaran/core';
import { Grid, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import ArrowLeftIcon from 'catamaran/icons/ArrowLeft';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  CatButton: {
    margin: theme.spacing(0, 1)
  },
  bottomBarText: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 1)
  },
  root: {
    height: '100%'
  }
}));

type Props = {
  className?: string;
  onMinimize: () => void;
};

function StatusConfirmed(props: Props) {
  const classes = useStyles();
  const { className, onMinimize } = props;

  return (
    <Grid
      alignContent="center"
      className={clsx(classes.root, className)}
      container
      direction="row"
      justifyContent="space-between"
    >
      <Grid item>
        <CatButton
          className={classes.CatButton}
          color="darkGrey"
          onClick={onMinimize}
          startIcon={<ArrowLeftIcon />}
        >
          Minimize
        </CatButton>
      </Grid>
      <Grid className={classes.bottomBarText} item xs>
        <Typography component="p" variant="body2">
          Uploading process may take a while. Please feel free to ‘Minimize’ this screen and let
          Lighthouse to work on it on the background.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default StatusConfirmed;
