import { WaitingForConfirmationInformation, WaitingForConfirmationStateShape } from './types';

const initialWaitingForConfirmation: WaitingForConfirmationInformation = {
  assetInformation: { categories: [] },
  assignmentInformation: {
    assignerNote: '',
    assistantPersonnelIds: [],
    priority: 'low'
  },
  breakdownInformation: {}
};

export const initialState: WaitingForConfirmationStateShape = {
  draft: initialWaitingForConfirmation
};
