export type MetricStatus = {
  id?: string;
  name?: string;
  key?: StatusKeys;
  workType?: WorkType;
  taskSubStatuses?: MetricSubstatus[];
};

export type MetricSubstatus = {
  id?: string;
  key?: string;
  name?: string;
  mainCategoryId?: string;
};

export type StatusKeys =
  | 'waitingForConfirmation'
  | 'open'
  | 'inProgress'
  | 'paused'
  | 'closed'
  | 'denied';

export type WorkType = 'breakdown' | 'maintenance' | 'calibration' | 'retirement';
