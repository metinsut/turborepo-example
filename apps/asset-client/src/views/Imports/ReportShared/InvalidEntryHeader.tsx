import { CatIconButton } from 'catamaran/core';
import { Grid, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import CancelIcon from 'catamaran/icons/Cancel';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  errorText: {
    color: theme.palette.error.main
  },
  root: {}
}));

type Props = {
  failedEntryCount?: number;
  totalEntryCount?: number;
  type: 'asset' | 'category';
};

function InvalidEntryHeader(props: Props) {
  const classes = useStyles();
  const { failedEntryCount, totalEntryCount, type } = props;

  return (
    <Grid
      alignItems="center"
      className={classes.root}
      container
      direction="row"
      justifyContent="space-evenly"
    >
      <Grid container direction="row" item spacing={2} xs={3}>
        <Grid item>
          <CatIconButton>
            <CancelIcon color="red" contained fontSize="medium" />
          </CatIconButton>
        </Grid>
        <Grid item>
          <Typography className={classes.errorText} component="p" variant="h5">
            {`${failedEntryCount} / ${totalEntryCount}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={9}>
        <Typography className={classes.errorText} component="p" variant="h5">
          Invalid Entries
        </Typography>
        <Typography component="p" variant="body1">
          {`${failedEntryCount} entries are invalid`}
        </Typography>
        {type === 'category' && (
          <Typography className={classes.errorText} component="p" variant="body1">
            To enable these rows to upload, correct the errors mentioned below *on your excel* and
            upload it again.
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}

export default InvalidEntryHeader;
