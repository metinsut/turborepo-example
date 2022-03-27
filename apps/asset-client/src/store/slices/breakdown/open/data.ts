import { OpenBreakdown, OpenBreakdownStateShape } from './types';

export const maxDefinitionCharacterCount = 280;

const initialOpenBreakdown: OpenBreakdown = {
  assetId: '',
  assistantPersonnelIds: [],
  definition: '',
  priority: 'low'
};

export const initialState: OpenBreakdownStateShape = {
  draft: initialOpenBreakdown,
  initial: initialOpenBreakdown
};
