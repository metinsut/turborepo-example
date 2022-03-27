import { Grid, Theme, makeStyles } from 'catamaran/core/mui';
import DisplayOnlyLocationLevel from './LocationLevel/DisplayOnlyLocationLevel';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  gridItem: {
    marginRight: theme.spacing(1)
  },
  root: {
    margin: theme.spacing(2, 0)
  }
}));

type Props = {
  className?: string;
  locationLevelIds?: string[];
};

function LocationSearchMode(props: Props) {
  const classes = useStyles();
  const { className, locationLevelIds } = props;

  return (
    <Grid className={clsx(classes.root, className)} container wrap="nowrap">
      {locationLevelIds.map((levelId) => (
        <Grid className={classes.gridItem} item key={levelId}>
          <DisplayOnlyLocationLevel locationLevelId={levelId} showSearchResult />
        </Grid>
      ))}
    </Grid>
  );
}

export default LocationSearchMode;
