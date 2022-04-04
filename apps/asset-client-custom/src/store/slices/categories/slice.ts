import { Category, DisabledState } from './types';
import { CheckboxState, booleanCompare, temporaryCategoryId } from 'store/common';
import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { initialState, parentCategoryIdOfRoot } from './data';
import _ from 'lodash';

export const categoriesAdapter = createEntityAdapter<Category>({
  sortComparer: (first, second) => {
    let result = booleanCompare(
      first.id !== temporaryCategoryId,
      second.id !== temporaryCategoryId
    );

    if (result === 0) {
      result = first.name.localeCompare(second.name);
    }

    return result;
  }
});

export const categoriesSlice = createSlice({
  initialState: categoriesAdapter.getInitialState(initialState),
  name: 'categories',
  reducers: {
    addCategory: categoriesAdapter.addOne,
    addCategoryToDisplayedIds: (
      draft,
      action: PayloadAction<{
        parentId: string;
        childId: string;
      }>
    ) => {
      const { parentId, childId } = action.payload;
      draft.displayedCategoryIds[parentId].push(childId);
    },
    addEmptyCategory: (draft, action: PayloadAction<string>) => {
      const addEmptyModel: Category = {
        code: '',
        draft: true,
        id: temporaryCategoryId,
        name: '',
        parentCategoryId: action.payload
      };
      draft.checkedEntities = {};
      categoriesAdapter.upsertOne(draft, addEmptyModel);
    },
    addToInSessionRemovedIdsMultiple: (draft, action: PayloadAction<string[]>) => {
      const ids = action.payload;
      ids.forEach((id) => {
        draft.isInSessionRemovedById[id] = true;
        draft.lastRemovedInSessionId = id;
      });
    },
    addToInSessionsMultiple: (draft, action: PayloadAction<string[]>) => {
      action.payload.forEach((id) => {
        draft.isInSessionsById[id] = true;
      });
    },
    brandDialogCleared: (draft) => {
      draft.brandDialog = { ...draft.brandDialog };
    },
    brandDialogClosed: (draft) => {
      draft.brandDialog.selectedCategoryId = initialState.brandDialog.selectedCategoryId;
      draft.brandDialog.open = initialState.brandDialog.open;
    },
    brandDialogInitializedChanged: (draft, action: PayloadAction<boolean>) => {
      draft.brandDialog.initialized = action.payload;
    },
    categorySelectedForBrand: (draft, action: PayloadAction<string>) => {
      const categoryId = action.payload;
      draft.brandDialog.open = true;
      draft.brandDialog.selectedCategoryId = categoryId;
    },
    check: (draft, action: PayloadAction<{ id: string; state: CheckboxState }>) => {
      const { id, state } = action.payload;
      if (action.payload.state === false) {
        delete draft.checkedEntities[id];
      } else {
        draft.checkedEntities[id] = state;
      }
    },
    checkMultiple: (
      draft,
      action: PayloadAction<{
        ids: string[];
        state: CheckboxState;
      }>
    ) => {
      const { ids, state } = action.payload;
      ids.forEach((id) => {
        draft.checkedEntities[id] = state;
      });
    },
    clearCheckedCategories: (draft) => {
      draft.checkedEntities = {};
    },
    clearDisabledCategories: (draft) => {
      draft.disabledEntities = {};
    },
    clearExpandedCategories: (draft) => {
      draft.expandedCategoryIds = [parentCategoryIdOfRoot];
    },
    clearInSessionCategories: (draft) => {
      draft.isInSessionsById = {};
    },
    clearInSessionRemovedCategories: (draft) => {
      draft.isInSessionRemovedById = {};
      draft.lastRemovedInSessionId = undefined;
    },
    clearSelectedCategory: (draft) => {
      draft.selectedCategoryId = undefined;
    },
    collapseCategory: (draft, action: PayloadAction<Category>) => {
      const index =
        draft.expandedCategoryIds.findIndex((i) => i === action.payload.parentCategoryId) + 1;

      draft.expandedCategoryIds.splice(index, draft.expandedCategoryIds.length - index);
    },
    confirmRemovalOfInSessions: (draft) => {
      const ids = Object.keys(draft.isInSessionRemovedById);
      ids.forEach((id) => {
        delete draft.isInSessionsById[id];
      });

      draft.isInSessionRemovedById = {};
      draft.lastRemovedInSessionId = undefined;
    },
    deleteCategories: (draft, action: PayloadAction<string[]>) => {
      categoriesAdapter.removeMany(draft, action.payload);
      action.payload.forEach((id) => {
        delete draft.checkedEntities[id];
        _.remove(draft.expandedCategoryIds, (expandedId) => id === expandedId);
      });
    },
    deleteTemporaryCategory: (draft) => {
      categoriesAdapter.removeOne(draft, temporaryCategoryId);
    },
    disableMultiple: (
      draft,
      action: PayloadAction<{
        ids: string[];
        state: DisabledState;
      }>
    ) => {
      const { ids, state } = action.payload;
      ids.forEach((id) => {
        draft.disabledEntities[id] = state;
      });
    },
    expandCategory: (draft, action: PayloadAction<Category>) => {
      const index =
        draft.expandedCategoryIds.findIndex(
          (i) => i === action.payload?.parentCategoryId ?? parentCategoryIdOfRoot
        ) + 1;

      draft.expandedCategoryIds.splice(
        index,
        draft.expandedCategoryIds.length - index,
        action.payload?.id ?? parentCategoryIdOfRoot
      );
    },
    expandedCategoriesInitializedChanged: (draft, action: PayloadAction<boolean>) => {
      draft.expandedCategoriesInitialized = action.payload;
    },
    expandedCategoriesInitializedCleared: (draft) => {
      draft.expandedCategoriesInitialized = initialState.expandedCategoriesInitialized;
    },
    removeCategoryIdFromDisplayedIds: (
      draft,
      action: PayloadAction<{
        parentId: string;
        childId: string;
      }>
    ) => {
      const { parentId, childId } = action.payload;
      const index = draft.displayedCategoryIds[parentId].findIndex((i) => i === childId);

      if (index !== -1) {
        draft.displayedCategoryIds[parentId].splice(index, 1);
      }
    },
    setDisplayedCategoryIds: (
      draft,
      action: PayloadAction<{
        parentId: string;
        categoryIds: string[];
      }>
    ) => {
      const { parentId, categoryIds } = action.payload;
      draft.displayedCategoryIds[parentId] = categoryIds;
    },
    setDraggedOverCategoryId: (draft, action: PayloadAction<string>) => {
      draft.draggedOverCategoryId = action.payload;
    },
    setDraggingCategoryId: (draft, action: PayloadAction<string>) => {
      draft.draggingCategoryId = action.payload;
    },
    setExpandedCategories: (draft, action: PayloadAction<string[]>) => {
      const categoryIds = action.payload;
      const finalCategoryIds = categoryIds.filter((id) =>
        id ? !draft.entities[id].hasBrandModel : true
      );
      draft.expandedCategoryIds = finalCategoryIds;
    },
    setSelectedCategory: (draft, action: PayloadAction<string>) => {
      draft.selectedCategoryId = action.payload;
    },
    updateCategories: categoriesAdapter.upsertMany,
    updateCategory: categoriesAdapter.upsertOne
  }
});

export default categoriesSlice.reducer;

export const {
  addToInSessionsMultiple,
  addEmptyCategory,
  clearCheckedCategories,
  clearExpandedCategories,
  clearInSessionCategories,
  clearSelectedCategory,
  clearDisabledCategories,
  confirmRemovalOfInSessions,
  collapseCategory,
  deleteTemporaryCategory,
  setDisplayedCategoryIds,
  setDraggingCategoryId,
  setDraggedOverCategoryId,
  setExpandedCategories,
  updateCategories,
  expandedCategoriesInitializedChanged,
  expandedCategoriesInitializedCleared,
  brandDialogInitializedChanged,
  brandDialogCleared,
  categorySelectedForBrand,
  brandDialogClosed
} = categoriesSlice.actions;
