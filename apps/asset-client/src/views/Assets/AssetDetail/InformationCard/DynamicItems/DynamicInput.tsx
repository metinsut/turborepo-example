import { AssetFormField } from 'store/slices/asset/detail/types';
import { CatDatePicker, CatTextField } from 'catamaran/core';
import { useCallback, useMemo } from 'react';
import validateDynamicInput from 'helpers/validations/DynamicInputValidator';

type Props = {
  assetFormField: AssetFormField;
  onValueChange?: (assetFormId: string, value: string) => void;
  touched?: boolean;
};

function DynamicInput({ assetFormField, onValueChange, touched }: Props) {
  const handleValueChange = useCallback(
    (value: string) => {
      onValueChange(assetFormField.formFieldId, value);
    },
    [assetFormField.formFieldId, onValueChange]
  );

  const handleTextFieldValueChange = useCallback(
    (event: any) => {
      handleValueChange(event.target.value);
    },
    [handleValueChange]
  );

  const handleDatePickerValueChange = useCallback(
    (date: string) => {
      handleValueChange(date);
    },
    [handleValueChange]
  );

  const validationError = useMemo(
    () =>
      validateDynamicInput(
        assetFormField.value,
        assetFormField.dataType,
        assetFormField.isRequired,
        assetFormField.title
      ),
    [assetFormField.dataType, assetFormField.isRequired, assetFormField.title, assetFormField.value]
  );

  if (assetFormField.dataType === 'dateTime') {
    return (
      <CatDatePicker
        helperText={validationError}
        label={assetFormField.title}
        onChange={handleDatePickerValueChange}
        required={assetFormField.isRequired}
        touched={touched}
        valid={!validationError}
        value={assetFormField.value}
      />
    );
  }

  return (
    <CatTextField
      helperText={validationError}
      label={assetFormField.title}
      onChange={handleTextFieldValueChange}
      required={assetFormField.isRequired}
      touched={touched}
      valid={!validationError}
      validatable
      value={assetFormField.value}
    />
  );
}

export default DynamicInput;
