import { CatChip, CatTypography } from 'catamaran/core';
import { Trans, useTranslation } from 'react-i18next';
import {
  removeInformationLocation,
  removeInformationLocationNotAssigned
} from 'store/slices/asset/filter/slice';
import { selectLocationById } from 'store/slices/asset/locations/selectors';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import classes from 'views/Users/Users.module.scss';
import clsx from 'clsx';

interface Props {
  values?: { locations: string[]; noLocation: boolean };
  modal?: boolean;
}

interface LocationChipProps {
  locationId?: string;
}

const LocationChip = ({ locationId }: LocationChipProps) => {
  const dispatch = useTypedDispatch();
  const location = useTypedSelector((state) => selectLocationById(state, locationId));

  return (
    <CatChip
      className="mr4"
      label={location?.name ?? locationId}
      onDelete={() => dispatch(removeInformationLocation(locationId))}
    />
  );
};

const LocationChips = ({ values, modal }: Props) => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  return (
    <div
      className={clsx(
        classes.selected_filter_chip_item,
        modal && classes.selected_filter_chip_item_modal
      )}
    >
      <CatTypography className="no-wrap" color="inherit" variant="body2">
        {t('assets.assetFilter.location')}:
      </CatTypography>
      {values.locations.map((locationId) => (
        <LocationChip key={locationId} locationId={locationId} />
      ))}

      {values.noLocation && (
        <CatChip
          key="noLocation"
          label={
            <>
              {'<'}
              <Trans i18nKey="assets.assetFilter.blank" tOptions={{}} />
              {'>'}
            </>
          }
          onDelete={() => dispatch(removeInformationLocationNotAssigned())}
        />
      )}
    </div>
  );
};

export default LocationChips;
