import { RootState } from 'RootTypes';
import { categoriesAdapter } from './slice';

export const {
  selectAll: selectAllCategoriesv2,
  selectById: selectCategoryv2ById,
  selectIds: selectAllCategoryv2Ids,
  selectEntities
} = categoriesAdapter.getSelectors<RootState>((state) => state.categoriesv2);

export const selectChildrenCategoryIdsByParentId = (state: RootState, parentId: string) =>
  state.categoriesv2.childrenCategoryIds[parentId] ?? [];

export const selectExpandedCategoryIds = (state: RootState) =>
  state.categoriesv2.expandedCategoryIds;

export const selectCategoryIsExpanded = (state: RootState, categoryId: string) =>
  state.categoriesv2.expandedCategoryIds.includes(categoryId);

export const selectCategoryIsLastExpanded = (state: RootState, categoryId: string) =>
  state.categoriesv2.expandedCategoryIds.slice(-1)[0] === categoryId;
