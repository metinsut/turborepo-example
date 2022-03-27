import { Brand } from './types';
import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { initialState } from './data';

export const brandsAdapter = createEntityAdapter<Brand>({
  sortComparer: (first, second) => first.name.localeCompare(second.name)
});

const brandSlice = createSlice({
  initialState: brandsAdapter.getInitialState(initialState),
  name: 'brandsv2',
  reducers: {
    removeBrandIdFromDisplayedIds: (
      draft,
      action: PayloadAction<{
        categoryId: string;
        brandId: string;
      }>
    ) => {
      const { categoryId, brandId } = action.payload;
      if (draft.displayedBrandIds[categoryId]) {
        const index = draft.displayedBrandIds[categoryId].findIndex((i) => i === brandId);

        if (index !== -1) {
          draft.displayedBrandIds[categoryId].splice(index, 1);
        }
      }
    },
    removeExpandedBrand: (draft) => {
      delete draft.expandedBrandId;
    },
    setDisplayedBrandIds: (
      draft,
      action: PayloadAction<{
        categoryId: string;
        brandIds: string[];
      }>
    ) => {
      const { categoryId, brandIds } = action.payload;
      draft.displayedBrandIds[categoryId] = brandIds;
    },
    setExpandedBrand: (draft, action: PayloadAction<string>) => {
      draft.expandedBrandId = action.payload;
    },
    upsertBrands: brandsAdapter.upsertMany
  }
});

export default brandSlice.reducer;

export const {
  removeBrandIdFromDisplayedIds,
  removeExpandedBrand,
  setDisplayedBrandIds,
  setExpandedBrand,
  upsertBrands
} = brandSlice.actions;
