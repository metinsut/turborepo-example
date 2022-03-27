import { CircularProgress } from 'catamaran/core/mui';
import { FormHelper } from 'hooks/useFormState';
import { Location } from 'store/slices/location/locations/types';
import { checkLocationName } from 'store/slices/location/locations/actions';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import StyledValidatedTextField from 'components/StyledValidatedTextField';
import useLoading from 'hooks/useLoading';

type Props = {
  defaultValue: string;
  formHelper: FormHelper<Location>;
  branchId: string;
  onValidityChanged: (isValid: boolean) => void;
  parentLocationId: string;
};

function LocationNameField(props: Props) {
  const { branchId, defaultValue, formHelper, onValidityChanged, parentLocationId } = props;

  const { t } = useTranslation();
  const [nameError, setNameError] = useState(false);
  const [nameCheckLoading, nameCheckDispatch] = useLoading();

  const validateTitle = async () => {
    const locationName = formHelper.formState.values.name;
    if (locationName && locationName.length > 0 && defaultValue !== locationName) {
      const error = await nameCheckDispatch(
        checkLocationName(locationName, branchId, parentLocationId)
      );
      setNameError(!error);
    } else {
      setNameError(false);
    }
  };

  useEffect(() => {
    onValidityChanged(!nameError && !nameCheckLoading);
  }, [nameCheckLoading, nameError, onValidityChanged]);

  return (
    <StyledValidatedTextField
      error={nameError}
      formHelper={formHelper}
      helperText={nameError && t('locations.location_add.name_exists_error')}
      InputProps={
        nameCheckLoading
          ? {
              endAdornment: <CircularProgress size="15px" />
            }
          : {}
      }
      label={t('locations.location_add.title_field')}
      margin="dense"
      name="name"
      onBlur={validateTitle}
      variant="outlined"
    />
  );
}

export default LocationNameField;
