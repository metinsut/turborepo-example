import { CategoryImport } from 'store/slices/imports/types';
import { Grid, Paper, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import CategoryInvalidEntries from './Report/CategoryInvalidEntries';
import CategoryResultBar from './Report/CategoryResultBar';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    borderRadius: theme.spacing(2),
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1, 2.5)
  },
  root: {}
}));

type Props = {
  className?: string;
  categoryImport: CategoryImport;
};

function getUploadResultHeaderMessage(categoryImport: CategoryImport) {
  switch (categoryImport.state) {
    case 'confirmed':
      return 'Uploading Your Categories To Lighthouse';
    case 'finished':
      return 'Upload Completed';
    default:
      return '';
  }
}

function UploadResultItem(props: Props) {
  const classes = useStyles();
  const { className, categoryImport } = props;

  const headerMessage = getUploadResultHeaderMessage(categoryImport);

  return (
    <Paper className={clsx(classes.root, classes.container, className)}>
      <Grid className={classes.container} container direction="row" justifyContent="space-between">
        <Grid item>
          <Typography component="p" variant="h5">
            {headerMessage}
          </Typography>
        </Grid>
      </Grid>
      <CategoryResultBar categoryImport={categoryImport} />
      {categoryImport.state === 'finished' && categoryImport.failedEntryCount > 0 && (
        <CategoryInvalidEntries categoryImport={categoryImport} />
      )}
    </Paper>
  );
}

export default UploadResultItem;
