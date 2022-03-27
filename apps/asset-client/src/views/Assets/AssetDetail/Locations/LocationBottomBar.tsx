import { CatButton } from 'catamaran/core';
import { Divider, Grid, Paper, Theme, makeStyles } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import ArrowLeftIcon from 'catamaran/icons/ArrowLeft';
import CancelIcon from 'catamaran/icons/Cancel';
import CheckIcon from 'catamaran/icons/Check';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  CatButton: {
    margin: theme.spacing(0, 1)
  },
  bottomBarGrid: {
    height: '100%'
  },
  root: {
    borderRadius: theme.spacing(4),
    height: '3rem',
    width: '80%'
  }
}));

type Props = {
  backButtonEnabled?: boolean;
  cancelEnabled?: boolean;
  className?: string;
  confirmEnabled?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
};

function LocationBottomBar(props: Props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { backButtonEnabled, cancelEnabled, className, confirmEnabled, onClose, onConfirm } = props;

  return (
    <Paper className={clsx(classes.root, className)}>
      <Grid
        alignContent="center"
        className={classes.bottomBarGrid}
        container
        direction="row"
        justifyContent="space-between"
      >
        <Grid item xs={3}>
          <CatButton
            className={classes.CatButton}
            color="darkGrey"
            disabled={!backButtonEnabled}
            onClick={onClose}
            startIcon={<ArrowLeftIcon />}
          >
            {t('common.back')}
          </CatButton>
        </Grid>
        <Grid item xs />
        <Grid item>
          <CatButton
            className={classes.CatButton}
            color="red"
            disabled={!cancelEnabled}
            onClick={onClose}
            startIcon={<CancelIcon />}
          >
            {t('common.cancel')}
          </CatButton>
        </Grid>
        <Divider flexItem orientation="vertical" />
        <Grid item>
          <CatButton
            className={classes.CatButton}
            color="green"
            disabled={!confirmEnabled}
            endIcon={<CheckIcon />}
            onClick={onConfirm}
          >
            {t('common.confirm')}
          </CatButton>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default LocationBottomBar;
