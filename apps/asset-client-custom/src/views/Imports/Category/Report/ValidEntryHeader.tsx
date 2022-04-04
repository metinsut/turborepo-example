import { CatIconButton } from 'catamaran/core';
import { CategoryImport } from 'store/slices/imports/types';
import { Grid, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import CheckIcon from 'catamaran/icons/Check';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1)
  },
  successText: {
    color: theme.palette.success.main
  }
}));

type Props = {
  categoryImport?: CategoryImport;
};

function ValidEntryHeader(props: Props) {
  const classes = useStyles();
  const { categoryImport } = props;

  return (
    <Grid className={classes.root} container direction="row" justifyContent="space-evenly">
      <Grid container direction="row" item xs={3}>
        <Grid item>
          <CatIconButton>
            <CheckIcon color="green" contained fontSize="medium" />
          </CatIconButton>
        </Grid>
        <Grid item>
          <Typography className={classes.successText} component="p" variant="h5">
            {`${categoryImport.successEntryCount} / ${categoryImport.totalEntryCount}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={9}>
        <Typography className={classes.successText} component="p" variant="h5">
          Valid Entries
        </Typography>
        <Typography component="p" variant="body1">
          {`${categoryImport.successEntryCount} validated entries are ready to upload`}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default ValidEntryHeader;
