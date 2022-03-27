import { Grid, Theme, makeStyles } from 'catamaran/core/mui';
import { clearCheckedLocationIds } from 'store/slices/location/locations/slice';
import { selectExpandedIds } from 'store/slices/location/locations/selectors';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import LocationLevel from './LocationLevel/LocationLevel';
import LocationLevelSeperator from './LocationLevel/LocationLevelSeperator';
import React, { useCallback } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  blankGridItem: {
    margin: theme.spacing(0, 2)
  },
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

function LocationDisplayMode(props: Props) {
  const classes = useStyles();
  const { className, locationLevelIds } = props;

  const dispatch = useTypedDispatch();

  const expandedLocationIds = useTypedSelector(selectExpandedIds);

  React.useEffect(
    () => () => {
      dispatch(clearCheckedLocationIds());
    },
    [dispatch]
  );

  const [selectedButtonIndex, setSelectedButtonIndex] = React.useState<number>(null);

  const handleAddLevelClick = useCallback((buttonIndex: number) => {
    setSelectedButtonIndex(buttonIndex);
  }, []);

  const handleAddLevelApprove = useCallback(() => {
    setSelectedButtonIndex(null);
  }, []);

  const handleLevelCancel = useCallback(() => {
    setSelectedButtonIndex(null);
  }, []);

  return (
    <Grid className={clsx(classes.root, className)} container wrap="nowrap">
      {locationLevelIds.map((locationLevelId, index) => [
        <LocationLevelSeperator
          key={`seperator ${locationLevelId}`}
          onAddLevelClick={handleAddLevelClick}
          onApprove={handleAddLevelApprove}
          onCancel={handleLevelCancel}
          parentLocationLevelId={index > 0 ? locationLevelIds[index - 1] : null}
          selectedButtonIndex={selectedButtonIndex}
          seperatorIndex={index}
        />,
        <Grid className={classes.gridItem} item key={locationLevelId}>
          <LocationLevel
            locationLevelId={locationLevelId}
            parentLocationId={expandedLocationIds[index]}
          />
        </Grid>
      ])}
      <LocationLevelSeperator
        onAddLevelClick={handleAddLevelClick}
        onApprove={handleAddLevelApprove}
        onCancel={handleLevelCancel}
        parentLocationLevelId={locationLevelIds[locationLevelIds.length - 1]}
        selectedButtonIndex={selectedButtonIndex}
        seperatorIndex={locationLevelIds.length}
      />
    </Grid>
  );
}

export default LocationDisplayMode;
