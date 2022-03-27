import { CircularProgress, Grid, Theme, makeStyles } from 'catamaran/core/mui';
import { dequal } from 'dequal';
import { emptyFilter } from 'store/slices/location/locationFilter/data';
import { getLocationLevels } from 'store/slices/location/locationLevels/actions';
import { selectActiveFilter } from 'store/slices/location/locationFilter/selectors';
import { useTypedSelector } from 'hooks/useTypedSelector';
import LocationBottomBar from './LocationBottomBar';
import LocationManagement from '../LocationManagement';
import LocationTopBar from './LocationTopBar';
import React, { useEffect, useMemo } from 'react';
import clsx from 'clsx';
import useLoading from 'hooks/useLoading';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
};

function LocationMainPage(props: Props) {
  const classes = useStyles();
  const { className } = props;

  const [locationsLoading, locationsLoadingDispatch] = useLoading();

  useEffect(() => {
    locationsLoadingDispatch(getLocationLevels());
  }, [locationsLoadingDispatch]);

  const activeLocationFilter = useTypedSelector(selectActiveFilter);
  const isFilterActive = useMemo(
    () => !dequal(activeLocationFilter, emptyFilter),
    [activeLocationFilter]
  );

  return (
    <div className={clsx(classes.root, className)}>
      <LocationTopBar />
      <LocationManagement searchModeActive={isFilterActive} />
      <LocationBottomBar searchModeActive={isFilterActive} />
      {locationsLoading && (
        <Grid alignItems="center" container direction="column" justifyContent="center">
          <CircularProgress />
        </Grid>
      )}
    </div>
  );
}

export default LocationMainPage;
