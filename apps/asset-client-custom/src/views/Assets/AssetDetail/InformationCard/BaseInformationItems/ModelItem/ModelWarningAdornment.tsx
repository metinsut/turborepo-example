import { Grid, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import ArrowLeftIcon from 'catamaran/icons/ArrowLeft';
import InfoIcon from 'catamaran/icons/Info';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  modelIcon: {
    marginLeft: theme.spacing(0.5)
  },
  root: {
    opacity: '0.8',
    width: '180px'
  },
  warningContainer: {
    alignContent: 'center',
    display: 'grid',
    lineHeight: '100%'
  },
  warningString: {
    fontSize: '10px'
  }
}));

type Props = {
  className?: string;
};

function ModelWarningAdornment(props: Props) {
  const classes = useStyles();
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Grid
      alignContent="center"
      className={clsx(classes.root, className)}
      container
      direction="row"
      justifyContent="flex-end"
    >
      <Grid item>
        <ArrowLeftIcon fontSize="small" />
      </Grid>
      <Grid className={classes.warningContainer} item>
        <Typography className={classes.warningString}>
          <Trans components={{ bold: <b /> }} i18nKey="assets.asset_edit.model_brand_hint" t={t} />
        </Typography>
      </Grid>
      <Grid item>
        <InfoIcon className={classes.modelIcon} color="darkGrey" fontSize="small" />
      </Grid>
    </Grid>
  );
}

export default ModelWarningAdornment;
