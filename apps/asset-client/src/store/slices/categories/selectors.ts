import { Category } from './types';
import { RootState } from 'RootTypes';
import { categoriesAdapter } from './slice';
import { createDequalSelector, temporaryCategoryId } from 'store/common';
import { createSelector } from '@reduxjs/toolkit';
import createCachedSelector from 're-reselect';

export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
  selectIds: selectAllCategoryIds,
  selectEntities
} = categoriesAdapter.getSelectors<RootState>((state) => state.categories);

export const selectIsInSessionsById = (state: RootState) => state.categories.isInSessionsById;

export const selectIsInSessionRemovedById = (state: RootState) =>
  state.categories.isInSessionRemovedById;

export const selectLastRemovedInSessionId = (state: RootState) =>
  state.categories.lastRemovedInSessionId;

export const selectMultipleCategoriesByIds = createSelector(
  selectEntities,
  (state: RootState, ids: string[]) => ids,
  (entities, ids) => ids.map((id) => entities[id])
);

// TODO: Bu selectorü kaldırmamız gerekiyor, displayedId'den gelmeli
export const selectCategoriesByParentId = createSelector(
  selectAllCategories,
  (state: RootState, parentId: string) => parentId,
  (allCategories, parentId) => allCategories.filter((i) => i.parentCategoryId === parentId)
);

export const selectCategoryIdsByParentId = createCachedSelector(
  selectCategoriesByParentId,
  (categories) => categories.map((i) => i.id)
)({
  keySelector: (state, parentId) => parentId ?? '',
  selectorCreator: createDequalSelector
});

export const selectDisplayedCategoryIdsByParentId = (state: RootState, parentId: string) =>
  state.categories.displayedCategoryIds[parentId] ?? [];

export const selectCategoryGroupHasInMemoryChild = createSelector(
  selectCategoriesByParentId,
  (categories) => categories.some((i) => i.inMemory)
);

// TODO: inMemory için refactor selectCategoriesByParentId yi değiştirelim
export const selectInMemoryCategoryByParentId = createSelector(
  selectCategoriesByParentId,
  (categories) => categories.find((i) => i.inMemory)
);

export const selectCategoryGroupHasInSessionChild = createSelector(
  selectDisplayedCategoryIdsByParentId,
  selectIsInSessionsById,
  selectIsInSessionRemovedById,
  (ids, isInSessionsById, isInSessionRemovedById) =>
    ids.some((id) => !!isInSessionsById[id] && !isInSessionRemovedById[id])
);

export const selectHasChildCategoryIncludingInSessions = createSelector(
  selectDisplayedCategoryIdsByParentId,
  selectIsInSessionsById,
  selectIsInSessionRemovedById,
  (ids, isInSessionsById, isInSessionRemovedById) => {
    // Child kategorilerin hiç biri inSession değilse
    // ids.length > 0 kontrolüne gerek yok çünkü bu kod zaten hasChildCategory varsa çalışıyor
    if (ids.every((id) => !isInSessionsById[id])) {
      return true;
    }

    const removedCount = ids.filter((id) => !!isInSessionRemovedById[id]).length;
    return ids.length - removedCount > 0;
  }
);

export const selectCategoryGroupHasTemporaryChild = (
  state: RootState,
  parentCategoryId: string
) => {
  const displayedCategoryIds = state.categories.displayedCategoryIds[parentCategoryId];
  return displayedCategoryIds && displayedCategoryIds.includes(temporaryCategoryId);
};

export const selectInMemoryCategories = createSelector(selectAllCategories, (categories) =>
  categories.filter((i) => i.inMemory)
);

export const selectInMemoryCategoryExists = createSelector(selectAllCategories, (categories) =>
  categories.some((i) => i.inMemory)
);

export const selectInSessionCategoryExists = createSelector(
  selectIsInSessionsById,
  selectIsInSessionRemovedById,
  (isInSessionsById, isInSessionRemovedById) =>
    Object.keys(isInSessionsById).some((id) => !isInSessionRemovedById[id])
);

export const selectCheckedEntities = (state: RootState) => state.categories.checkedEntities;
export const selectAllCheckedCategoryIds = createSelector(
  [selectCheckedEntities],
  (checkedEntities) => Object.keys(checkedEntities).filter((key) => checkedEntities[key] === true)
);

export const selectCategoryChecked = createSelector(
  [selectCheckedEntities, (state: RootState, id: string) => id],
  (checkedEntities, id) => checkedEntities[id]
);

export const selectDisplayedCheckedCategoryIdsByParentId = createSelector(
  selectCheckedEntities,
  selectDisplayedCategoryIdsByParentId,
  (checkedEntities, allIds) => allIds.filter((i) => checkedEntities[i] === true)
);

export const selectCheckedCategoryIdsByParentId = createSelector(
  selectCheckedEntities,
  selectCategoryIdsByParentId,
  (checkedEntities, allIds) => allIds.filter((i) => checkedEntities[i] === true)
);

export const selectIndeterminateCategoryIdsByParentId = createSelector(
  selectCheckedEntities,
  selectCategoryIdsByParentId,
  (checkedEntities, allIds) => allIds.filter((i) => checkedEntities[i] === 'indeterminate')
);

export const selectIsAllDisplayedCategoriesCheckedByParentId = createSelector(
  selectDisplayedCheckedCategoryIdsByParentId,
  selectDisplayedCategoryIdsByParentId,
  (checkedIds, allIds) => checkedIds.length === allIds.length
);

const selectDisabledEntities = (state: RootState) => state.categories.disabledEntities;

export const selectCategoryDisabled = createSelector(
  [selectDisabledEntities, (state: RootState, id: string) => id],
  (disabledEntities, id) => disabledEntities[id]
);

export const selectExpandedIds = (state: RootState) => state.categories.expandedCategoryIds;
export const selectIsExpanded = createSelector(
  selectExpandedIds,
  (state: RootState, id: string) => id,
  (expandedIds, id) => expandedIds.includes(id)
);

export const selectSelectedCategoryId = (state: RootState) => state.categories.selectedCategoryId;

export const selectIsCategorySelected = createSelector(
  selectSelectedCategoryId,
  (state: RootState, id: string) => id,
  (selectedId, id) => selectedId === id
);

export const selectIsCategoryInSession = createSelector(
  selectIsInSessionsById,
  selectIsInSessionRemovedById,
  (state: RootState, id: string) => id,
  (isInSessionsById, inSessionRemovedById, id) =>
    !!isInSessionsById[id] && !inSessionRemovedById[id]
);

export const selectDraggingCategory = (state: RootState) =>
  state.categories.entities[state.categories.draggingCategoryId];

export const selectDraggedOverCategoryId = (state: RootState) =>
  state.categories.entities[state.categories.draggedOverCategoryId];

export const flattenCategoryTreeRecursively = (category: Category): Category[] => {
  if (!category) {
    return [];
  }
  const fromParent = flattenCategoryTreeRecursively(category.parentCategory);
  return [category, ...fromParent];
};

export const selectExpandedCategoriesInitialized = (state: RootState) =>
  state.categories.expandedCategoriesInitialized;
export const selectBrandDialog = (state: RootState) => state.categories.brandDialog;
