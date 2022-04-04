import { AssetStatus } from 'store/slices/common/types';
import { Priority, Usability } from '../common/types';

export type OpenBreakdown = {
  assetId?: string;
  definition?: string;
  usability?: Usability;
  locationId?: string;
  priority?: Priority;
  requestedPersonnelId?: string;
  responsiblePersonnelId?: string;
  assistantPersonnelIds?: string[];
};

export type AssetInfo = {
  id: string;
  code: string;
  categoryName: string;
  brandName: string;
  modelName: string;
  photoPath: string;
  assetStatus: AssetStatus;
  locationId: string;
  branchId: string;
};

export type OpenBreakdownStateShape = {
  draft: OpenBreakdown;
  initial: OpenBreakdown;
  assetInfo?: AssetInfo;
  isUserAuthorized?: boolean;
};
