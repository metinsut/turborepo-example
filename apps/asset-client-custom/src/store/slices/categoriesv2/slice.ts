import { Categoryv2 } from './types';
import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { initialCategoryState, parentCategoryIdOfRoot } from './data';

export const categoriesAdapter = createEntityAdapter<Categoryv2>({
  sortComparer: (first, second) => first.name.localeCompare(second.name)
});

export const categoriesv2Slice = createSlice({
  initialState: categoriesAdapter.getInitialState(initialCategoryState),
  name: 'categoriesv2',
  reducers: {
    categoriesDeleted: (draft, action: PayloadAction<string[]>) => {
      categoriesAdapter.removeMany(draft, action.payload);
    },
    categoriesFetched: (
      draft,
      action: PayloadAction<{ categories: Categoryv2[]; parentCategoryId: string }>
    ) => {
      const { categories, parentCategoryId } = action.payload;
      categoriesAdapter.upsertMany(draft, categories);

      const childrenIds = categories.map((i) => i.id);
      draft.childrenCategoryIds[parentCategoryId] = childrenIds;
    },
    categoryCollapsed: (draft, action: PayloadAction<Categoryv2>) => {
      const category = action.payload;
      const index = draft.expandedCategoryIds.findIndex((i) => i === category.parentCategoryId) + 1;

      draft.expandedCategoryIds.splice(index, draft.expandedCategoryIds.length - index);
    },
    categoryExpanded: (draft, action: PayloadAction<Categoryv2>) => {
      const category = action.payload;
      const index =
        draft.expandedCategoryIds.findIndex(
          (i) => i === category?.parentCategoryId ?? parentCategoryIdOfRoot
        ) + 1;

      draft.expandedCategoryIds.splice(
        index,
        draft.expandedCategoryIds.length - index,
        category?.id ?? parentCategoryIdOfRoot
      );
    },
    categoryUpdated: categoriesAdapter.upsertOne,
    expandedCategoryIdsCleared: (draft) => {
      draft.expandedCategoryIds = { ...initialCategoryState.expandedCategoryIds };
    }
  }
});

export default categoriesv2Slice.reducer;

export const {
  categoriesFetched,
  categoryCollapsed,
  categoriesDeleted,
  categoryExpanded,
  categoryUpdated,
  expandedCategoryIdsCleared
} = categoriesv2Slice.actions;
