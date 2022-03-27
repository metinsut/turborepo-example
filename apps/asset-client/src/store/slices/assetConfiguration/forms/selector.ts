import { RootState } from 'RootTypes';
import { maxIdentificationFieldNumber, maxInformationFieldNumber } from './data';

export const selectAllForms = (state: RootState) => state.forms.forms;

export const selectCurrentFormFields = (state: RootState) => state.forms.currentForm.fields;

export const selectMainCategoryName = (state: RootState) =>
  state.forms.currentForm.mainCategory.name;

export const selectMainCategoryId = (state: RootState) => state.forms.currentForm.mainCategory.id;

export const selectIdentificationFields = (state: RootState) =>
  selectCurrentFormFields(state).filter((field) => field.section === 'identification');

export const selectDeviceInfoFields = (state: RootState) =>
  selectCurrentFormFields(state).filter((field) => field.section === 'deviceInfo');

export const selectPurchaseInfoFields = (state: RootState) =>
  selectCurrentFormFields(state).filter((field) => field.section === 'purchaseInfo');

export const remainingIdentificationFieldNumber = (state: RootState) =>
  maxIdentificationFieldNumber - selectIdentificationFields(state).length;

export const remainingInfoFieldNumber = (state: RootState) =>
  maxInformationFieldNumber -
  selectDeviceInfoFields(state).length -
  selectPurchaseInfoFields(state).length;
