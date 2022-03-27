import { isArrayNullOrEmpty } from 'utils';
import { selectAssetFormFields } from 'store/slices/asset/detail/selectors';
import { useMemo } from 'react';
import { useTypedSelector } from 'hooks';
import validateDynamicInput from 'helpers/validations/DynamicInputValidator';

export const useAreAssetFormFieldsValid = () => {
  const assetFormFields = useTypedSelector(selectAssetFormFields);

  const allFieldsValid = useMemo(() => {
    let valid: boolean = true;
    if (isArrayNullOrEmpty(assetFormFields)) {
      return true;
    }
    assetFormFields.forEach((assetFormField) => {
      const singleValid = validateDynamicInput(
        assetFormField.value,
        assetFormField.dataType,
        assetFormField.isRequired,
        assetFormField.title
      );

      if (singleValid) {
        valid = false;
      }
    });

    return valid;
  }, [assetFormFields]);

  return allFieldsValid;
};
