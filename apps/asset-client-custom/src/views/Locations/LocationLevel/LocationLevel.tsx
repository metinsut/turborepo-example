import { Box, CircularProgress, Grid, Paper } from 'catamaran/core/mui';
import { CatButton } from 'catamaran/core';
import {
  deleteLocationLevel,
  updateLocationLevel
} from 'store/slices/location/locationLevels/actions';
import { getLocations } from 'store/slices/location/locations/actions';
import {
  selectBranchLocationCodeType,
  selectCheckedLocationIdsByParentId,
  selectDisplayedLocationIdsByParentId
} from 'store/slices/location/locations/selectors';
import { selectLocationLevelById } from 'store/slices/location/locationLevels/selectors';
import { useFormState } from 'hooks';
import { useHistory } from 'react-router-dom';
import { useLocationLevelHeader } from './Header/hooks/useLocationLevelHeader';
import { useStyles } from '../styles';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks/useTypedSelector';
import DefaultLocationLevelHeader from './Header/Default';
import EditLocationLevelHeader from './Header/Edit';
import LocationItem, { LocationItemSharedProps } from '../LocationItem';
import LocationLevelDeleteDialog from './LocationLevelDeleteDialog';
import PlusIcon from 'catamaran/icons/Plus';
import React, { useCallback, useEffect } from 'react';
import SearchLocationLevelHeader from './Header/Search';
import clsx from 'clsx';
import locationLevelValidator from 'helpers/validations/LocationLevelValidator';
import useLoading from 'hooks/useLoading';

type Props = LocationItemSharedProps & {
  className?: string;
  locationLevelId: string;
  parentLocationId: string;
};

function LocationLevel(props: Props) {
  const classes = useStyles();
  const { className, locationLevelId, parentLocationId, ...rest } = props;

  const { t } = useTranslation();
  const history = useHistory();
  const [loading, dispatchWithLoading] = useLoading();

  const locationLevel = useTypedSelector((state) =>
    selectLocationLevelById(state, locationLevelId)
  );

  const locationIds = useTypedSelector((state) =>
    selectDisplayedLocationIdsByParentId(state, parentLocationId)
  );

  const checkedIds = useTypedSelector((state) =>
    selectCheckedLocationIdsByParentId(state, parentLocationId)
  );

  const branchLocationCodeType = useTypedSelector(selectBranchLocationCodeType);
  const [searchKeyword, setSearchKeyword] = React.useState<string>(null);

  const locationLevelFormHelper = useFormState(locationLevel, locationLevelValidator);

  const [headerComponentKey, setHeaderComponentKey] = React.useState('default');

  useEffect(() => {
    if (parentLocationId !== undefined) {
      dispatchWithLoading(getLocations(parentLocationId));
    }
  }, [dispatchWithLoading, parentLocationId]);

  const handleAddNewButton = useCallback(() => {
    history.push(
      `/location/${branchLocationCodeType.branchId}/${locationLevelId}/${parentLocationId}`
    );
  }, [branchLocationCodeType.branchId, history, locationLevelId, parentLocationId]);

  const handleEdit = () => {
    setHeaderComponentKey('edit');
  };

  const handleCancel = useCallback(() => {
    setHeaderComponentKey('default');
    locationLevelFormHelper.reset(locationLevel);
  }, [locationLevel, locationLevelFormHelper]);

  const handleConfirm = useCallback(async () => {
    const updatedLocationLevel = locationLevelFormHelper.formState.values;
    await dispatchWithLoading(updateLocationLevel(updatedLocationLevel));

    setHeaderComponentKey('default');
  }, [dispatchWithLoading, locationLevelFormHelper]);

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteGoBack = useCallback(() => {
    setDeleteDialogOpen(false);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    await dispatchWithLoading(deleteLocationLevel(locationLevelId));
    setDeleteDialogOpen(false);
    setHeaderComponentKey('default');
  }, [dispatchWithLoading, locationLevelId]);

  const handleSearch = () => {};

  const { handleRemoveSingle, ...headerProps } = useLocationLevelHeader(parentLocationId);

  const locationLevelHeaderElement = React.useMemo(() => {
    switch (headerComponentKey) {
      case 'default':
        return (
          <DefaultLocationLevelHeader
            checkedIds={checkedIds}
            locationIds={locationIds}
            locationLevel={locationLevel}
            onEditClick={handleEdit}
            onSearchClick={handleSearch}
            parentLocationId={parentLocationId}
            {...headerProps}
          />
        );
      case 'edit':
        return (
          <EditLocationLevelHeader
            formHelper={locationLevelFormHelper}
            onCancelClick={handleCancel}
            onDeleteClick={handleDeleteClick}
            onEditConfirmClick={handleConfirm}
          />
        );
      case 'search':
        return (
          <SearchLocationLevelHeader
            onSearchClick={handleSearch}
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
          />
        );
      default:
        return null;
    }
  }, [
    checkedIds,
    handleCancel,
    handleConfirm,
    headerComponentKey,
    headerProps,
    locationIds,
    locationLevel,
    locationLevelFormHelper,
    parentLocationId,
    searchKeyword
  ]);

  return (
    <Paper className={clsx(classes.root, className)}>
      <LocationLevelDeleteDialog
        locationLevelId={locationLevelId}
        onDelete={handleDeleteConfirm}
        onGoBack={handleDeleteGoBack}
        open={deleteDialogOpen}
      />
      <Grid alignContent="space-between" container style={{ height: '100%' }}>
        <Grid item xs={12}>
          {locationLevelHeaderElement}
          {locationIds.map((id) => (
            <LocationItem
              alwaysShowCheckbox={checkedIds.length > 0}
              className={classes.locationItem}
              deletable
              editable
              expandable
              id={id}
              key={id}
              onDelete={handleRemoveSingle(id)}
              searchKeyword={searchKeyword}
              {...rest}
            />
          ))}
          {loading && (
            <Grid alignItems="center" container direction="column" justifyContent="center">
              <CircularProgress />
            </Grid>
          )}
        </Grid>
        <Grid className={classes.bottom} item xs={12}>
          <Box className={classes.divider} />
          <Grid container direction="row" justifyContent="flex-end">
            <CatButton
              className={classes.addButton}
              color="blue"
              disabled={parentLocationId === undefined}
              endIcon={<PlusIcon />}
              onClick={handleAddNewButton}
              size="small"
              transformText={false}
            >
              {t('locations.location_add.title', { levelName: locationLevel.name })}
            </CatButton>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default LocationLevel;
