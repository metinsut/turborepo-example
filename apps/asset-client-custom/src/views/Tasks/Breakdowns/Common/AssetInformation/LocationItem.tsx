import {
  CatCenterIcon,
  CatDataCard,
  CatEmptyIcon,
  CatSidebar,
  CatTypography
} from 'catamaran/core';
import { Location } from 'store/slices/asset/locations/types';
import { Trans, useTranslation } from 'react-i18next';
import { isArrayNullOrEmpty } from 'utils';
import { selectBranchNameById } from 'store/slices/branches';
import { useTypedSelector } from 'hooks';
import LocationIcon from 'catamaran/icons/Location';
import React from 'react';
import clsx from 'clsx';

type Props = {
  branchId?: string;
  locations?: Location[];
};

function LocationItem({ branchId, locations }: Props) {
  const branchName = useTypedSelector((state) => selectBranchNameById(state, branchId));
  const { t } = useTranslation();

  const locationAssigned = !isArrayNullOrEmpty(locations);
  return (
    <CatDataCard color="darkGrey" minWidth="auto" transparentBackground>
      <CatSidebar>
        <CatEmptyIcon />
        <CatCenterIcon component={LocationIcon} />
        <CatEmptyIcon />
      </CatSidebar>
      <div
        className={clsx(
          'grid h-full w-full grid-auto-flow-column mx8 my8',
          !locationAssigned ? 'align-self-center' : ''
        )}
      >
        {locationAssigned ? (
          <div className="grid gap-4 align-content-start">
            <CatTypography className="opacity-8" variant="body1">
              {locations[locations.length - 1].name}
            </CatTypography>
            <CatTypography className="opacity-6" variant="body2">
              <Trans
                i18nKey="tasks.breakdowns.confirm_breakdown.branch_field"
                t={t}
                values={{ branchName }}
              />
            </CatTypography>
            <CatTypography className="ml16 opacity-6" variant="caption">
              <ul>
                {locations
                  .slice(0, -1)
                  .reverse()
                  .map((item) => (
                    <li key={item.id}>{item.name}</li>
                  ))}
              </ul>
            </CatTypography>
          </div>
        ) : (
          <div className="grid gap-4">
            <CatTypography className="opacity-8" variant="subtitle1">
              <Trans i18nKey="tasks.breakdowns.confirm_breakdown.location_not_assigned" t={t} />
            </CatTypography>
            <CatTypography className="opacity-6" variant="body2">
              <Trans
                i18nKey="tasks.breakdowns.confirm_breakdown.branch_field"
                t={t}
                values={{ branchName }}
              />
            </CatTypography>
          </div>
        )}
      </div>
    </CatDataCard>
  );
}

export default LocationItem;
