import { AssetInformation, BreakdownInformation, TaskStatusInformation } from '../common/types';
import { PagedResult } from 'store/common';
import { Person } from 'store/slices/persons';

export type TaskDetailInformation = {
  assetInformation?: AssetInformation;
  breakdownInformation?: BreakdownInformation;
  taskStatusInformation?: TaskStatusInformation;
  history?: PagedResult<History>;
};

export type TaskDetailInformationStateShape = {
  draft: TaskDetailInformation;
};

export type BreakdownTypeResultType = {
  breakdownType: string;
  breakdownTypeId: string;
};

export type History = {
  historyTypeKey: HistoryType;
  historyType: string;
  historyKey: string;
  createdDate: string;
  createdPerson: Person;
  details: HistoryDetail[];
};

export type HistoryDetail = {
  historySubKey?: string;
  oldValue?: string;
  newValue?: string;
};

export type HistoryType =
  | 'assignment'
  | 'cost'
  | 'information'
  | 'status'
  | 'typeOfBreakdown'
  | 'usability';
