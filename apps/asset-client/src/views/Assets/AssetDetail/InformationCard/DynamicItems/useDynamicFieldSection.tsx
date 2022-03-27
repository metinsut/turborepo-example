import { SectionMode } from 'store/slices/asset/detail/types';
import { SectionTypes } from 'store/slices/assetConfiguration/forms/types';
import { assetFormFieldValueChanged } from 'store/slices/asset/detail/slice';
import {
  selectAssetFormFieldsBySection,
  selectInitialAssetFormFieldsBySection
} from 'store/slices/asset/detail/selectors';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import DynamicField from './DynamicField';
import React, { useCallback } from 'react';

export const useDynamicFieldSection = (
  section: SectionTypes,
  sectionMode: SectionMode,
  onEditClick?: () => void
) => {
  const dispatch = useTypedDispatch();

  const assetFormFields = useTypedSelector((state) =>
    selectAssetFormFieldsBySection(state, section)
  );
  const initialFormFields = useTypedSelector((state) =>
    selectInitialAssetFormFieldsBySection(state, section)
  );

  const handleDynamicValueChange = useCallback(
    (assetFormFieldId: string, value: string) => {
      dispatch(
        assetFormFieldValueChanged({
          assetFormFieldId,
          value
        })
      );
    },
    [dispatch]
  );

  const dynamicFieldSectionElement = React.useMemo(
    () =>
      assetFormFields.map((formField) => (
        <DynamicField
          assetFormField={formField}
          key={formField.formFieldId}
          mode={sectionMode}
          onEditClick={onEditClick}
          onValueChange={handleDynamicValueChange}
          touched={
            initialFormFields.find((i) => i.formFieldId === formField.formFieldId).value !==
            formField.value
          }
        />
      )),
    [assetFormFields, handleDynamicValueChange, initialFormFields, onEditClick, sectionMode]
  );

  return {
    assetFormFields,
    dynamicFieldSectionElement
  };
};
