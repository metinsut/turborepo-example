import { CheckboxState } from 'store/common';

export interface Category {
  id?: string;
  name?: string;
  code?: string;
  level?: number;
  parentCategory?: Category;
  parentCategoryId?: string;
  hasChildCategory?: boolean;
  hasBrandModel?: boolean;
  childCount?: number;
  taskStatus?: TaskStatuses;
  inMemory?: boolean;
  draft?: boolean;
}

export type TaskStatuses = 'Approved' | 'Unapproved' | 'Rejected' | 'none';
export type DisabledState = boolean | 'checkDisabled';

export type CategoryStateShape = {
  checkedEntities: { [id: string]: CheckboxState };
  disabledEntities: { [id: string]: DisabledState };
  displayedCategoryIds: { [id: string]: string[] };
  expandedCategoryIds: string[];
  selectedCategoryId: string;
  draggingCategoryId: string;
  draggedOverCategoryId: string;
  isInSessionsById: { [id: string]: boolean };
  isInSessionRemovedById: { [id: string]: boolean };
  lastRemovedInSessionId: string;
  expandedCategoriesInitialized: boolean;
  brandDialog: {
    initialized: boolean;
    selectedCategoryId: string;
    open: boolean;
  };
};

export type AssociateItems = {
  asset: boolean;
  contract: boolean;
  plan: boolean;
  user: boolean;
};

export type CheckedListType = {
  auto_flow: boolean;
  brand_model: boolean;
  breakdown_costs: boolean;
  breakdown_types: boolean;
  department: boolean;
  form_builder: boolean;
  maintenance_costs: boolean;
  subcategories: boolean;
  sub_statuses: boolean;
  retirement_reasons: boolean;
};
