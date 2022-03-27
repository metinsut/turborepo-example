import { Brand } from './types';
import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { booleanCompare, temporaryBrandId } from 'store/common';
import { initialState } from './data';

export const brandsAdapter = createEntityAdapter<Brand>({
  sortComparer: (first, second) => {
    let result = booleanCompare(first.id !== temporaryBrandId, second.id !== temporaryBrandId);
    if (result === 0) {
      result = first.name.localeCompare(second.name);
    }

    return result;
  }
});

const brandSlice = createSlice({
  initialState: brandsAdapter.getInitialState(initialState),
  name: 'brands',
  reducers: {
    addDisplayedBrandId: (
      draft,
      action: PayloadAction<{
        categoryId: string;
        brandId: string;
      }>
    ) => {
      const { categoryId, brandId } = action.payload;
      if (draft.displayedBrandIds[categoryId]) {
        draft.displayedBrandIds[categoryId].push(brandId);
      } else {
        draft.displayedBrandIds[categoryId] = [brandId];
      }
    },
    brandAdded: brandsAdapter.addOne,
    clearBrandIdToRefresh: (draft) => {
      draft.brandIdToRefresh = undefined;
    },
    emptyBrandAdded: (draft) => {
      const emptyBrand: Brand = {
        id: temporaryBrandId,
        name: ''
      };
      brandsAdapter.addOne(draft, emptyBrand);
    },
    expandBrand: (draft, action: PayloadAction<Brand>) => {
      draft.expandedBrandId = action.payload.id;
    },
    removeBrand: brandsAdapter.removeOne,
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
    removeBrandIdsFromDisplayedIds: (
      draft,
      action: PayloadAction<{
        brandIds: string[];
      }>
    ) => {
      const { brandIds } = action.payload;
      brandIds.forEach((brandId) => {
        Object.keys(draft.displayedBrandIds).forEach((categoryId) => {
          const index = draft.displayedBrandIds[categoryId].findIndex((i) => i === brandId);
          if (index !== -1) {
            draft.displayedBrandIds[categoryId].splice(index, 1);
          }
        });
      });
    },
    removeBrandsById: brandsAdapter.removeMany,
    removeExpandedBrand: (draft) => {
      delete draft.expandedBrandId;
    },
    setAllBrands: brandsAdapter.setAll,
    setBrandIdToRefresh: (draft, action: PayloadAction<string>) => {
      draft.brandIdToRefresh = action.payload;
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
    setSearchedIds: (draft, action: PayloadAction<string[]>) => {
      draft.searchIds = action.payload;
    },
    upsertBrand: brandsAdapter.upsertOne,
    upsertBrands: brandsAdapter.upsertMany
  }
});

export default brandSlice.reducer;

export const {
  brandAdded,
  addDisplayedBrandId,
  emptyBrandAdded,
  clearBrandIdToRefresh,
  expandBrand,
  removeBrand,
  removeBrandIdFromDisplayedIds,
  removeBrandIdsFromDisplayedIds,
  removeBrandsById,
  removeExpandedBrand,
  setAllBrands,
  setBrandIdToRefresh,
  setDisplayedBrandIds,
  setExpandedBrand,
  setSearchedIds,
  upsertBrand,
  upsertBrands
} = brandSlice.actions;
