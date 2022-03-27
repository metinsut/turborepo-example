import { AssetImport } from 'store/slices/imports/types';
import { Grid, Paper, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { checkAssetImportStatusIsOnProgress } from 'store/slices/imports/asset/actions';
import AssetInvalidEntries from './AssetInvalidEntries';
import AssetResultBar from './AssetResultBar';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    borderRadius: theme.spacing(2),
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1, 2.5)
  },
  root: {
    borderRadius: theme.spacing(2),
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1, 2.5)
  },
  row: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1, 2.5)
  }
}));

type Props = {
  className?: string;
  assetImport: AssetImport;
};

function ReportItem(props: Props) {
  const classes = useStyles();
  const { className, assetImport } = props;

  if (!assetImport) {
    return null;
  }

  const isInProgress = checkAssetImportStatusIsOnProgress(assetImport);

  return (
    <Paper className={clsx(classes.root, className)}>
      <Grid className={classes.row} container direction="row" justifyContent="space-between">
        <Grid item>
          <Typography component="p" variant="h5">
            Check and Define Missing Categories
          </Typography>
        </Grid>
        <Grid item>
          <Typography component="p" variant="h5">
            {isInProgress ? '' : `${assetImport.totalEntryCount} Total Lines`}
          </Typography>
        </Grid>
      </Grid>
      {isInProgress ? (
        <AssetResultBar assetImport={assetImport} />
      ) : (
        <>{assetImport.failedEntryCount > 0 && <AssetInvalidEntries assetImport={assetImport} />}</>
      )}
    </Paper>
  );
}

export default ReportItem;
