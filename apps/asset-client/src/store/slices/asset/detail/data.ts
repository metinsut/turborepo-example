import { Asset, AssetState } from './types';

export const initialFormData: Asset = {
  assetFormFields: [],
  code: '',
  contractIds: [],
  currencyType: 'euro',
  formFieldsInitialized: false,
  isCategoryAutoAssigned: false,
  isRequireCalibrationPlan: false,
  isRequireMaintenancePlan: false,
  planIds: [],
  productionDate: null,
  purchasedDate: null,
  purchasedFirm: undefined
};

export const initialState: AssetState = {
  assetForm: initialFormData,
  checkedAssetIds: {},
  initialAssetForm: initialFormData
};
