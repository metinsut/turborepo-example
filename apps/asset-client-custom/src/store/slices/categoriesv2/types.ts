export interface Categoryv2 {
  id?: string;
  name?: string;
  code?: string;
  level?: number;
  parentCategory?: Categoryv2;
  parentCategoryId?: string;
  hasChildCategory?: boolean;
  hasBrandModel?: boolean;
  hasUnapprovedBrandModel?: boolean;
  childCount?: number;
  taskStatus?: TaskStatuses;
}

export type TaskStatuses = 'Approved' | 'Unapproved' | 'Rejected' | 'none';

export type CategoryStateShape = {
  childrenCategoryIds: { [id: string]: string[] };
  expandedCategoryIds: string[];
};

export type AssociatedItems = {
  asset: boolean;
  contract: boolean;
  plan: boolean;
  user: boolean;
};
