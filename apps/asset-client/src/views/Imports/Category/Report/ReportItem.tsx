import { CategoryImport } from 'store/slices/imports/types';
import { Grid, Paper, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { checkImportStatusIsOnProgress } from 'store/slices/imports/category/actions';
import CategoryInvalidEntries from './CategoryInvalidEntries';
import CategoryResultBar from './CategoryResultBar';
import React from 'react';
import ValidEntries from './ValidEntries';
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
  categoryImport?: CategoryImport;
};

function ReportItem(props: Props) {
  const classes = useStyles();
  const { className, categoryImport } = props;

  if (!categoryImport) {
    return null;
  }

  const isInProgress = checkImportStatusIsOnProgress(categoryImport);

  return (
    <Paper className={clsx(classes.root, classes.container, className)}>
      <Grid className={classes.container} container direction="row" justifyContent="space-between">
        <Grid item>
          <Typography component="p" variant="h5">
            Check Before Proceeding
          </Typography>
        </Grid>
        <Grid item>
          <Typography component="p" variant="h5">
            {isInProgress ? '' : `${categoryImport.totalEntryCount} Total Lines`}
          </Typography>
        </Grid>
      </Grid>
      {isInProgress ? (
        <CategoryResultBar categoryImport={categoryImport} />
      ) : (
        <>
          {categoryImport.failedEntryCount > 0 && (
            <CategoryInvalidEntries categoryImport={categoryImport} />
          )}
          {categoryImport.successEntryCount > 0 && <ValidEntries categoryImport={categoryImport} />}
        </>
      )}
    </Paper>
  );
}

export default ReportItem;
