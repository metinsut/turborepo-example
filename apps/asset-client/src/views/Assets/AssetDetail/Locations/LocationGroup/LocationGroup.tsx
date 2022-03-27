import { Box, CatPaperSelector } from 'catamaran/core';
import { LocationManagementType, useBodyClickActions } from '../helpers';
import { getLocationLevel, getLocations } from 'store/slices/asset/locations/actions';
import {
  selectLocationById,
  selectLocationIdsByParentIdAndBranchId,
  selectLocationLevel
} from 'store/slices/asset/locations/selectors';
import { useStyles } from './styles';
import { useTypedSelector } from 'hooks/useTypedSelector';
import Header from './Header';
import LocationItem, { ItemSharedProps } from '../LocationItem';
import NoItem from 'catamaran/icons/NoItem';
import React, { useEffect } from 'react';
import clsx from 'clsx';
import useLoading from 'hooks/useLoading';

export type LocationGroupProps = ItemSharedProps & {
  branchId?: string;
  locationManagementType: LocationManagementType;
  parentLocationId?: string;
  onExpand?: () => void;
};

function LocationGroup(props: LocationGroupProps) {
  const classes = useStyles();
  const { className, branchId, locationManagementType, onExpand, parentLocationId, ...rest } =
    props;

  const [locationsLoading, locationsLoadingDispatch] = useLoading();
  const [locationLevelLoading, locationLevelLoadingDispatch] = useLoading();

  const locationIds = useTypedSelector((state) =>
    selectLocationIdsByParentIdAndBranchId(state, { branchId, parentId: parentLocationId })
  );
  const parentLocation = useTypedSelector((state) => selectLocationById(state, parentLocationId));

  const firstLocation = useTypedSelector((state) => {
    if (locationIds.length > 0) {
      return selectLocationById(state, locationIds[0]);
    }
    return null;
  });

  const locationLevelId = firstLocation?.locationLevelId ?? undefined;

  const locationLevel = useTypedSelector((state) => selectLocationLevel(state, locationLevelId));

  useEffect(() => {
    locationsLoadingDispatch(getLocations(parentLocationId, branchId));
  }, [locationsLoadingDispatch, parentLocationId, branchId]);

  useEffect(() => {
    async function fetchLocationLevel(id: string) {
      await locationLevelLoadingDispatch(getLocationLevel(id));
    }

    if (firstLocation) {
      fetchLocationLevel(firstLocation.locationLevelId);
    }
  }, [locationLevelLoadingDispatch, firstLocation, parentLocation]);

  const groupLoading = locationsLoading || locationLevelLoading;

  const bodyClickActions = useBodyClickActions(locationManagementType);
  return (
    <CatPaperSelector
      className={clsx(classes.root, classes.container, className)}
      content={
        locationIds.length > 0 && (
          <Box>
            {locationIds.map((i) => (
              <LocationItem
                className={classes.locationItem}
                key={i}
                locationId={i}
                onExpand={onExpand}
                {...bodyClickActions}
                {...rest}
              />
            ))}
          </Box>
        )
      }
      elevation={1}
      emptyContent={
        locationLevel && (
          <>
            <NoItem color="darkGrey" contained />
          </>
        )
      }
      hasTemporary={false}
      isAddDisabled
      loading={groupLoading}
      title={
        <Header
          loading={groupLoading}
          locationLevelId={locationLevelId}
          parentLocation={parentLocation}
          {...rest}
        />
      }
    />
  );
}

export default React.memo(LocationGroup);
