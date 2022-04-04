import { MyRequestInformation, MyRequestInformationStateShape } from './types';

const initialMyRequestInformation: MyRequestInformation = {
  assetInformation: { categories: [] },
  breakdownInformation: {}
};

export const initialState: MyRequestInformationStateShape = {
  draft: initialMyRequestInformation
};
