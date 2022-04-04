import { AssetFilter } from '../filter/types';
import { AssetStatus } from 'store/slices/common/types';
import { DataTypes, SectionTypes } from 'store/slices/assetConfiguration/forms/types';
import { PagedRequestOptions } from 'store/common';

export interface Asset {
  assetStatus?: AssetStatus;
  id?: string;
  branchId?: string;
  brandId?: string;
  calibrationPlanId?: string;
  categoryBrandModelId?: string;
  categoryId?: string;
  code?: string;
  contactPerson?: string;
  contractIds?: string[];
  createdByUser?: string;
  createdByUserId?: string;
  createdDate?: string;
  currencyType?: 'lira' | 'dollar' | 'euro';
  custodyUserId?: string;
  fCode?: string;
  isCategoryAutoAssigned: boolean;
  isRequireCalibrationPlan?: boolean;
  isRequireMaintenancePlan?: boolean;
  locationId?: string;
  mainCategoryId?: string;
  maintenancePlanId?: string;
  modelId?: string;
  notes?: string;
  planIds: string[];
  productionDate?: string;
  purchasedCost?: string;
  purchasedDate?: string;
  purchasedFirm?: string;
  assetFormFields?: AssetFormField[];
  formFieldsInitialized?: boolean;
}

export type AssetFormField = {
  formFieldId?: string;
  title?: string;
  dataType?: DataTypes;
  section?: SectionTypes;
  isRequired?: boolean;
  isUnique?: boolean;
  value?: string;
};

export type AssetState = {
  assetForm: Asset;
  checkedAssetIds: { [id: string]: boolean };
  initialAssetForm: Asset;
};

export type AssetListItem = {
  assetId: string;
  assetStatus?: AssetStatus;
  code?: string;
  branchId?: string;
  branchName?: string;
  brandName?: string;
  categoryFullName?: string;
  categoryName?: string;
  mainCategoryId?: string;
  mainCategoryName?: string;
  modelName?: string;
  locationFullName?: string;
  locationId?: string;
  locationName?: string;
};

export type PaginatedAssetRequest = PagedRequestOptions & AssetFilter;

export type DisplayMode = 'add' | 'edit';

export type SectionMode = 'readonly' | 'edit';
