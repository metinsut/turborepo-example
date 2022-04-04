import { CatChip, CatPanel, CatPanelContent, CatPanelHeader, CatTypography } from 'catamaran/core';
import { ChangeButton, TrashIconButton } from 'catamaran/core/Button';
import { Location as LocationType } from 'store/slices/location/locations/types';
import { Skeleton } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import { getLocationDetailFullPath } from 'store/slices/asset/locations/actions';
import { removeLocationId, setLocationId } from 'store/slices/breakdown/open/slice';
import { selectBranchById } from 'store/slices/branches';
import { useDialogState, useLoading, useTypedDispatch, useTypedSelector } from 'hooks';
import ArrowRightIcon from 'catamaran/icons/ArrowRight';
import LocationIcon from 'catamaran/icons/Location';
import LocationSelectorDialog from 'views/Assets/AssetDetail/Locations/LocationSelectorDialog';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from '../Breakdowns.module.scss';

type Props = {
  locationId: string;
  branchId: string;
};

const Location = (props: Props) => {
  const { branchId, locationId } = props;
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  const { isOpen, togglePopup } = useDialogState();
  const [locationPath, setLocationPath] = useState<{ name: string; id: string }[]>([]);
  const [locationLoading, locationLoadingDispatch] = useLoading();

  const branch = useTypedSelector((state) => selectBranchById(state, branchId));

  useEffect(() => {
    const getLocations = async () => {
      if (locationId) {
        try {
          const locations = (await locationLoadingDispatch(
            getLocationDetailFullPath(locationId)
          )) as LocationType[];
          const names = locations.map(({ name, id }) => ({
            id,
            name
          }));
          setLocationPath(names);
        } catch (error) {
          setLocationPath([]);
          dispatch(removeLocationId());
        }
      } else {
        setLocationPath([]);
      }
    };
    getLocations();
  }, [dispatch, locationId, locationLoadingDispatch]);

  const handleLocationConfirm = async (locationId: string) => {
    dispatch(setLocationId(locationId));
  };

  const handleOnClick = () => {
    togglePopup(true);
  };

  const handleDeleteClick = () => {
    dispatch(removeLocationId());
  };

  const hasLocation = locationPath.length > 0;

  return (
    <CatPanel className={clsx(styles.location_wrapper, 'grid-auto-flow-column')}>
      <CatPanelHeader
        actionArea={hasLocation && <TrashIconButton onClick={handleDeleteClick} />}
        iconComponent={LocationIcon}
        title={<Trans i18nKey="tasks.breakdowns.open_breakdown.location" t={t} />}
      />
      {!locationLoading ? (
        <CatPanelContent
          className={clsx(styles.location_content_wrapper, 'grid gap-8 grid-auto-flow-column')}
        >
          <div className="grid gap-8 align-content-start">
            {hasLocation ? (
              <>
                <CatTypography className="opacity-6" variant="caption">
                  {branch?.name}
                </CatTypography>
                <CatTypography className="opacity-8" variant="subtitle1">
                  {locationPath[locationPath.length - 1].name}
                </CatTypography>
                <div className="flex flex-wrap align-items-center justify-content-start">
                  <CatChip color="darkGrey" label={branch?.name} size="small" />
                  <ArrowRightIcon
                    className="opacity-2"
                    color="darkGrey"
                    contained={false}
                    hoverable={false}
                  />
                  {locationPath.map(({ name, id }, index) => (
                    <React.Fragment key={id}>
                      <CatChip
                        color="darkGrey"
                        label={name}
                        size="small"
                        variant={locationPath.length - 1 === index ? 'outlined' : 'filled'}
                      />
                      {locationPath.length - 1 !== index && (
                        <ArrowRightIcon
                          className="opacity-2"
                          color="darkGrey"
                          contained={false}
                          hoverable={false}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </>
            ) : (
              <>
                <CatTypography className="opacity-6" variant="body2">
                  <Trans
                    i18nKey="tasks.breakdowns.open_breakdown.location_branch"
                    t={t}
                    values={{ branchName: branch?.name }}
                  />
                </CatTypography>
                <CatTypography className="opacity-8" variant="subtitle1">
                  <Trans i18nKey="tasks.breakdowns.open_breakdown.location_not_assigned" t={t} />
                </CatTypography>
              </>
            )}
          </div>
          <ChangeButton className="justify-self-center" onClick={handleOnClick} size="small" />
        </CatPanelContent>
      ) : (
        <div className="grid gap-8" style={{ width: '30%' }}>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      )}
      <LocationSelectorDialog
        branchId={branchId}
        currentLocationId={locationId}
        onClose={togglePopup}
        onConfirm={handleLocationConfirm}
        open={isOpen}
      />
    </CatPanel>
  );
};

export default Location;
