import { Scrollbars } from 'react-custom-scrollbars-2';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { selectDisplayedLocationLevelIds } from 'store/slices/location/locationLevels/selectors';
import { useTypedSelector } from 'hooks/useTypedSelector';
import LocationDisplayMode from './LocationDisplayMode';
import LocationSearchMode from './LocationSearchMode';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  searchModeActive?: boolean;
};

function LocationManagement(props: Props) {
  const classes = useStyles();
  const { className, searchModeActive } = props;

  const scrollContainerRef = React.useRef(null);

  const locationLevelIds = useTypedSelector(selectDisplayedLocationLevelIds);

  return (
    <Scrollbars
      autoHeight
      autoHeightMax={Number.MAX_VALUE}
      className={clsx(classes.root, className)}
      ref={scrollContainerRef}
    >
      {searchModeActive ? (
        <LocationSearchMode locationLevelIds={locationLevelIds} />
      ) : (
        <LocationDisplayMode locationLevelIds={locationLevelIds} />
      )}
    </Scrollbars>
  );
}

export default LocationManagement;
