import { AssetInformation, AssignmentInformation, BreakdownInformation } from '../common/types';

export type WaitingForConfirmationInformation = {
  assetInformation?: AssetInformation;
  breakdownInformation?: BreakdownInformation;
  assignmentInformation?: AssignmentInformation;
};

export type WaitingForConfirmationStateShape = {
  draft: WaitingForConfirmationInformation;
};
