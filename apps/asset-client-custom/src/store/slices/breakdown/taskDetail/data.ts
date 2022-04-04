import { BreakdownCost } from '../common/types';
import { History, TaskDetailInformation, TaskDetailInformationStateShape } from './types';
import { PagedResult } from 'store/common';

export const initialHistoryInformation: PagedResult<History> = {
  currentPage: 1,
  items: [],
  size: 5,
  total: null
};

const initialTaskDetailInformation: TaskDetailInformation = {
  assetInformation: { categories: [] },
  breakdownInformation: {},
  history: initialHistoryInformation,
  taskStatusInformation: {}
};

export const initialBreakdownCost: BreakdownCost = {
  amount: null,
  costType: null,
  costTypeId: null,
  explanation: '',
  id: null,
  parentCostType: null,
  parentCostTypeId: null
};

export const initialState: TaskDetailInformationStateShape = {
  draft: initialTaskDetailInformation
};
