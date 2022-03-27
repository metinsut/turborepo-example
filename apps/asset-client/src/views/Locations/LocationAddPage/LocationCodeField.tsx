import { CircularProgress } from 'catamaran/core/mui';
import { FormHelper } from 'hooks/useFormState';
import { Location } from 'store/slices/location/locations/types';
import { checkLocationCode } from 'store/slices/location/locations/actions';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import StyledValidatedTextField from 'components/StyledValidatedTextField';
import useLoading from 'hooks/useLoading';

type Props = {
  defaultValue: string;
  formHelper: FormHelper<Location>;
  branchId: string;
  isAutoCode: boolean;
  onValidityChanged: (isValid: boolean) => void;
};

function LocationCodeField(props: Props) {
  const { branchId, defaultValue, isAutoCode, formHelper, onValidityChanged } = props;

  const { t } = useTranslation();
  const [codeError, setCodeError] = useState(false);
  const [codeErrorText, setCodeErrorText] = useState('');
  const [codeCheckLoading, codeCheckDispatch] = useLoading();

  const validateCode = async () => {
    const code = formHelper.formState.values.locationCode;
    if (code && code.length > 0 && defaultValue !== code) {
      const error = await codeCheckDispatch(checkLocationCode(code, branchId));
      setCodeError(!error);
      setCodeErrorText(t('locations.location_add.code_exists_error'));
    } else if (!isAutoCode && code.trim().length === 0) {
      setCodeError(true);
      setCodeErrorText(t('locations.location_add.code_empty_error'));
    } else {
      setCodeError(false);
    }
  };

  useEffect(() => {
    onValidityChanged(!codeError && !codeCheckLoading);
  }, [codeCheckLoading, codeError, onValidityChanged]);

  return (
    <StyledValidatedTextField
      disabled={isAutoCode}
      error={codeError}
      formHelper={formHelper}
      helperText={codeError && codeErrorText}
      InputProps={
        codeCheckLoading
          ? {
              endAdornment: <CircularProgress size="15px" />
            }
          : {}
      }
      label={t('locations.location_add.code_field')}
      margin="dense"
      name="locationCode"
      onBlur={validateCode}
      variant="outlined"
    />
  );
}

export default LocationCodeField;
