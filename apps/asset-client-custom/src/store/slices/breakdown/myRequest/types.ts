import { AssetInformation, BreakdownInformation, TaskStatusInformation } from '../common/types';

export type MyRequestInformation = {
  assetInformation?: AssetInformation;
  breakdownInformation?: BreakdownInformation;
  taskStatusInformation?: TaskStatusInformation;
};

export type MyRequestInformationStateShape = {
  draft: MyRequestInformation;
};
