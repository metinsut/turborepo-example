import { CategoryStateShape } from './types';

export const maxMainCategoryNumber = 9;
export const maxCategoryDepth = 6;
export const parentCategoryIdOfRoot: string = null;

export const initialCategoryState: CategoryStateShape = {
  childrenCategoryIds: {},
  expandedCategoryIds: [parentCategoryIdOfRoot]
};
