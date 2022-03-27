import { AssetStatus } from 'store/slices/common/types';
import { Category } from 'store/slices/categories/types';
import { ContractType, PartsPolicy } from 'store/slices/contracts/types';
import { Location } from 'store/slices/asset/locations/types';
import { Person } from 'store/slices/persons';
import { ResolveStatuses, StatusGroup, StatusKeys } from 'store/slices/tasks/common/type';

export type AssetInformation = {
  id?: string;
  code?: string;
  branchId?: string;
  categories: Category[];
  brandName?: string;
  modelName?: string;
  modelPhotoPath?: string;
  assetStatus?: AssetStatus;
  locations?: Location[];
  contract?: ContractInformation;
};

export type ContractInformation = {
  title?: string;
  type?: ContractType;
  startDate?: string;
  endDate?: string;
  firmContact?: FirmContract;
  partsPolicy?: PartsPolicy;
};

export type FirmContract = {
  contactPerson?: string;
  firmName?: string;
  phone?: string;
  email?: string;
};

export type BreakdownInformation = {
  id?: string;
  explanation?: string;
  requestDate?: string;
  requesterPerson?: TaskPerson;
  usability?: Usability;
  denyExplanation?: string;
  breakdownTypeId?: string;
  breakdownType?: string;
  deniedByPersonnel?: TaskPerson;
  responsibleManager?: TaskPerson;
  assignerNote?: string;
  breakdownCosts?: BreakdownCost[];
  requesterUsability?: Usability;
};

export type AssignmentInformation = {
  responsiblePersonnelId?: string;
  assistantPersonnelIds?: string[];
  priority?: Priority;
  assignerNote?: string;
};

export type TaskStatusInformation = {
  status?: StatusKeys;
  substatusId?: string;
  substatus?: string;
  resolveStatus?: ResolveStatuses;
  responsiblePerson?: Person;
  priority?: Priority;
  assistantPersonnels?: Person[];
  myRequestStatus?: StatusGroup;
};

export type DenyBreakdown = {
  explanation?: string;
};

export type TaskPerson = {
  id?: string;
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  fullName?: string;
};

export type BreakdownCost = {
  explanation: string;
  costType: string;
  costTypeId: string;
  amount: number;
  parentCostType: string;
  parentCostTypeId: string;
  id: string;
};

export type AssignmentAuthorization = {
  canEditResponsible?: boolean;
  canDeleteResponsible?: boolean;
  canEditAssistant?: boolean;
  canDeleteAssistant?: boolean;
  canSeeAssignments?: boolean;
};

export type Usability = 'usable' | 'notUsable';
export type Priority = 'none' | 'low' | 'medium' | 'high';
