import { CatButton, CatIconButton } from 'catamaran/core';
import { Divider, Grid, Theme, makeStyles } from 'catamaran/core/mui';
import { LocationFilterItemType } from 'store/slices/location/locationFilter/types';
import { dequal } from 'dequal';
import { emptyFilter } from 'store/slices/location/locationFilter/data';
import { getFilterTypeFromArea } from './LoactionAreaFilter';
import { removeFilterItemFromActiveFilter } from 'store/slices/location/locationFilter/slice';
import { searchLocations } from 'store/slices/location/locationFilter/actions';
import { selectActiveFilter } from 'store/slices/location/locationFilter/selectors';
import { selectDisplayedLocationLevels } from 'store/slices/location/locationLevels/selectors';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import FilterList from 'catamaran/icons/FilterList';
import FilterSaveDialog from './FilterSaveDialog';
import FilterTopbarItem from './FilterTopbarItem';
import React, { useCallback, useEffect, useMemo } from 'react';
import TrashIcon from 'catamaran/icons/Trash';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1)
  }
}));

type Props = {
  className?: string;
};

function LocationFilterBar(props: Props) {
  const classes = useStyles();
  const { className } = props;
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const activeLocationFilter = useTypedSelector(selectActiveFilter);
  const locationLevels = useTypedSelector(selectDisplayedLocationLevels);
  const isFilterActive = useMemo(
    () => !dequal(activeLocationFilter, emptyFilter),
    [activeLocationFilter]
  );

  const areaFilterContent = useMemo(() => {
    let filterContent = getFilterTypeFromArea(
      activeLocationFilter.minArea,
      activeLocationFilter.maxArea
    );
    filterContent += activeLocationFilter.minArea ? ` ${activeLocationFilter.minArea}m²` : '';
    filterContent += activeLocationFilter.maxArea ? ` ${activeLocationFilter.maxArea}m²` : '';
    return filterContent;
  }, [activeLocationFilter.maxArea, activeLocationFilter.minArea]);

  const handleFilterItemRemove = (filterItemType: LocationFilterItemType) => {
    dispatch(removeFilterItemFromActiveFilter(filterItemType));
  };

  const [saveDialogOpen, setSaveDialogOpen] = React.useState(false);

  const handleSaveClick = () => {
    setSaveDialogOpen(true);
  };

  const handleSaveDialogClose = useCallback(() => {
    setSaveDialogOpen(false);
  }, []);

  useEffect(() => {
    if (!dequal(activeLocationFilter, emptyFilter)) {
      dispatch(searchLocations());
    }
  }, [activeLocationFilter, dispatch]);

  if (!isFilterActive) {
    return null;
  }

  return (
    <>
      <Divider />
      <Grid alignItems="center" className={clsx(classes.root, className)} container direction="row">
        <CatIconButton onClick={() => {}}>
          <TrashIcon color="red" contained />
        </CatIconButton>
        <Divider flexItem orientation="vertical" style={{ margin: '2px 6px' }} />
        <Grid container item xs>
          {(activeLocationFilter.hasNoLocationName || activeLocationFilter.locationName) && (
            <FilterTopbarItem
              fieldKey="locations.locationFilter.location_title_field"
              fieldValue={
                !activeLocationFilter.hasNoLocationName
                  ? [activeLocationFilter.locationName]
                  : [t('locations.locationFilter.no_location_title_filter')]
              }
              onDelete={() => handleFilterItemRemove('name')}
            />
          )}
          {(activeLocationFilter.hasNoLocationCode || activeLocationFilter.locationCode) && (
            <FilterTopbarItem
              fieldKey="locations.locationFilter.location_code_field"
              fieldValue={
                !activeLocationFilter.hasNoLocationCode
                  ? [activeLocationFilter.locationCode]
                  : [t('locations.locationFilter.no_location_code_filter')]
              }
              onDelete={() => handleFilterItemRemove('code')}
            />
          )}
          {(activeLocationFilter.hasNoTagIdentity || activeLocationFilter.tagIdentity) && (
            <FilterTopbarItem
              fieldKey="locations.locationFilter.tag_id_field"
              fieldValue={
                !activeLocationFilter.hasNoTagIdentity
                  ? [activeLocationFilter.tagIdentity]
                  : [t('locations.locationFilter.no_tag_id_filter')]
              }
              onDelete={() => handleFilterItemRemove('tagIdentity')}
            />
          )}
          {activeLocationFilter.locationLevelIds &&
            activeLocationFilter.locationLevelIds.length > 0 && (
              <FilterTopbarItem
                fieldKey="locations.locationFilter.location_level_field"
                fieldValue={activeLocationFilter.locationLevelIds.map(
                  (id) => locationLevels.find((level) => level.id === id)?.name ?? ''
                )}
                onDelete={() => handleFilterItemRemove('locationLevel')}
              />
            )}
          {(activeLocationFilter.minArea > 0 || activeLocationFilter.maxArea > 0) && (
            <FilterTopbarItem
              fieldKey="locations.locationFilter.location_area_title"
              fieldValue={[areaFilterContent]}
              onDelete={() => handleFilterItemRemove('area')}
            />
          )}
        </Grid>
        <Divider flexItem orientation="vertical" style={{ margin: '2px 6px' }} />
        <CatButton color="blue" endIcon={<FilterList />} onClick={handleSaveClick} size="small">
          {t('locations.locationFilter.save_filter')}
        </CatButton>
      </Grid>
      <FilterSaveDialog
        locationFilter={activeLocationFilter}
        onClose={handleSaveDialogClose}
        open={saveDialogOpen}
      />
    </>
  );
}

export default LocationFilterBar;
