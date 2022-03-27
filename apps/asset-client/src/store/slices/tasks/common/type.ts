import { Person } from '../../persons';
import { Priority, Usability } from 'store/slices/breakdown/common/types';

export interface Task {
  id?: string;
  taskType?: TaskType;
  priority?: Priority;
  locationId?: string;
  locationName?: string;
  assetId?: string;
  code?: string;
  categoryName?: string;
  branchId?: string;
  brandName?: string;
  modelName?: string;
  modelPhotoPath?: string;
  myRequestStatus?: StatusGroup;
  requestedDate?: string;
  requestedPersonnel: Person;
  responsiblePersonnel?: Person;
  assistantPersonnels?: Person[];
  resolveExpiryDate?: string;
  status?: StatusKeys;
  substatusId?: string;
  substatus?: string;
  resolveStatus?: ResolveStatuses;
  usability?: Usability;
}

export type ResolveStatuses = 'notNecessary' | 'waitingToBeResolved' | 'resolved';
export type TaskType = 'breakdown' | 'calibration' | 'maintenance' | 'retirement';
export type StatusKeys =
  | 'waitingForConfirmation'
  | 'open'
  | 'inProgress'
  | 'paused'
  | 'closed'
  | 'denied';

export type StatusGroup = 'workInProgress' | 'waitingForApproval' | 'finished' | 'denied';

export type PersonFilterType = 'me' | 'allMyTeam' | 'specificPersons';
export type PersonFilter = {
  type?: PersonFilterType;
  personnelIds?: string[];
};
