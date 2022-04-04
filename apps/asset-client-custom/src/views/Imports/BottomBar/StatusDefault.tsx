import { CatButton } from 'catamaran/core';
import { Grid, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { ImportState } from 'store/slices/imports/types';
import ArrowLeftIcon from 'catamaran/icons/ArrowLeft';
import CloseIcon from 'catamaran/icons/Close';
import PublishIcon from 'catamaran/icons/Publish';
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
  importState?: ImportState;
  onCancel: (stayOpen: boolean) => void;
  onMinimize: () => void;
  onUpload: () => void;
};

function StatusDefault(props: Props) {
  const classes = useStyles();
  const { importState, className, onCancel, onMinimize, onUpload } = props;

  return (
    <Grid alignContent="center" className={clsx(classes.root, className)} container direction="row">
      <Grid item>
        <CatButton
          className={classes.CatButton}
          color="darkGrey"
          onClick={onMinimize}
          startIcon={<ArrowLeftIcon />}
        >
          {importState ? 'Minimize' : 'Go back'}
        </CatButton>
      </Grid>
      <Grid className={classes.bottomBarText} item xs>
        <Typography component="p" variant="body2">
          Add your multiple categories at once by uploading .xls file
        </Typography>
      </Grid>
      <Grid item>
        <CatButton
          className={classes.CatButton}
          color="red"
          disabled={!importState}
          onClick={() => onCancel(false)}
          startIcon={<CloseIcon />}
        >
          Cancel
        </CatButton>
      </Grid>
      <Grid item>
        <CatButton
          className={classes.CatButton}
          color="green"
          disabled={importState !== 'validationCompleted'}
          endIcon={<PublishIcon />}
          onClick={onUpload}
        >
          Upload
        </CatButton>
      </Grid>
    </Grid>
  );
}

export default StatusDefault;
