import { CatCheckbox, CatIconButton, CatTypography } from 'catamaran/core';
import { Fade, Tooltip } from 'catamaran/core/mui';
import { Location } from 'store/slices/asset/locations/types';
import { clearCheckedLocationIds } from 'store/slices/location/locations/slice';
import { getAssetFilterLocationsWithParents } from 'store/slices/asset/filter/actions';
import {
  selectDraftFilterInformationBranches,
  selectDraftFilterInformationLocations,
  selectDraftFilterInformationNoLocation,
  selectSelectedFilterId
} from 'store/slices/asset/filter/selectors';
import {
  setFilterInformationLocations,
  setFilterInformationNoLocation
} from 'store/slices/asset/filter/slice';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import ArrowRightIcon from 'catamaran/icons/ArrowRight';
import LocationCheckerDialog, {
  CloseAction
} from 'views/Assets/AssetDetail/Locations/LocationCheckerDialog';
import ReadonlyTextField from 'components/CatamaranTextField/ReadonlyTextField';
import clsx from 'clsx';
import useLoading from 'hooks/useLoading';

function LocationFilter() {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  const noLocation = useTypedSelector(selectDraftFilterInformationNoLocation);
  const locations = useTypedSelector(selectDraftFilterInformationLocations);
  const selectedFilterId = useTypedSelector(selectSelectedFilterId);

  const branchId = useTypedSelector(selectDraftFilterInformationBranches);
  const finalBranchId = branchId.length === 1 ? branchId[0] : undefined;

  const [locationDialogOpen, setLocationDialogOpen] = useState(false);

  const [locationsWithParentsLoading, locationsWithParentsDispatch] = useLoading<Location[]>();

  useEffect(() => {
    const fetchLocationsWithParents = async () => {
      if (selectedFilterId) {
        locationsWithParentsDispatch(getAssetFilterLocationsWithParents());
      }
    };

    fetchLocationsWithParents();
  }, [locationsWithParentsDispatch, selectedFilterId]);

  const handleEditLocations = () => {
    if (finalBranchId) {
      setLocationDialogOpen(true);
    }
  };

  let label = t('assets.assetFilter.location');
  if (locations.length > 0) {
    label = t('assets.assetFilter.location_selected', { count: locations.length });
  }

  const handleCheckboxClick = () => {
    dispatch(setFilterInformationNoLocation(!noLocation));
  };

  const handleClose = (closeAction: CloseAction) => {
    setLocationDialogOpen(false);
    if (closeAction !== 'confirm' && locations.length === 0) {
      dispatch(clearCheckedLocationIds());
    }
  };

  const handleLocationConfirm = async (checkedLocationIds: string[]) => {
    dispatch(setFilterInformationLocations(checkedLocationIds));
  };

  return (
    <Tooltip
      arrow
      disableFocusListener
      title={finalBranchId ? '' : t('assets.assetFilter.location_filter_multiselect_tooltip')}
      TransitionComponent={Fade}
    >
      <div
        className={clsx({
          'opacity-6': !finalBranchId,
          'w-full grid align-items-center grid-template-columns-1-1 mb12': true
        })}
      >
        <div className="cursor-pointer" onClick={handleEditLocations}>
          <ReadonlyTextField
            disabled={locationsWithParentsLoading}
            endAdornment={
              <CatIconButton disabled={!finalBranchId} onClick={handleEditLocations}>
                <ArrowRightIcon
                  color="darkGrey"
                  contained={false}
                  fontSize="medium"
                  hoverable={false}
                />
              </CatIconButton>
            }
            text={label}
          />
        </div>
        <label className="flex align-items-center cursor-pointer" htmlFor="locationFilter">
          <CatCheckbox
            checked={noLocation}
            disabled={!finalBranchId || locationsWithParentsLoading}
            id="locationFilter"
            onChange={handleCheckboxClick}
            paddingSize="large"
          />
          <CatTypography variant="body2">{t('assets.assetFilter.no_location')}</CatTypography>
        </label>
        <LocationCheckerDialog
          branchId={finalBranchId}
          checkedLocationIds={locations}
          onClose={handleClose}
          onConfirm={handleLocationConfirm}
          open={locationDialogOpen}
        />
      </div>
    </Tooltip>
  );
}

export default LocationFilter;
