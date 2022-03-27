import { RootState } from 'RootTypes';
import { brandsAdapter } from './slice';
import { createSelector } from '@reduxjs/toolkit';
import { temporaryBrandId } from 'store/common';

export const {
  selectAll: selectAllBrands,
  selectById: selectBrandById,
  selectIds: selectAllBrandIds,
  selectEntities
} = brandsAdapter.getSelectors<RootState>((state) => state.brands);

export const selectExpandedBrandId = (state: RootState) => state.brands.expandedBrandId;

export const selectIsExpanded = (state: RootState, id: string) =>
  state.brands.expandedBrandId === id;

export const selectShouldBrandsRefresh = (state: RootState, relatedIds: string[]) =>
  relatedIds.some((id) => id === state.brands.brandIdToRefresh);

export const selectInMemoryBrandIds = createSelector(selectAllBrands, (allBrands) =>
  allBrands.filter((brand) => brand.inMemory).map((i) => i.id)
);

export const selectSearchBrandIds = (state: RootState) => state.brands.searchIds;

export const selectSearchBrands = createSelector(
  selectEntities,
  selectSearchBrandIds,
  (entities, ids) => ids.map((id) => entities[id])
);

export const selectDisplayedBrandIdsByCategoryId = (state: RootState, categoryId: string) =>
  state.brands.displayedBrandIds[categoryId] ?? [];

export const selectBrandsHasTemporaryChild = (state: RootState, categoryId: string) => {
  const brandIds = state.brands.displayedBrandIds[categoryId];
  return brandIds && brandIds.includes(temporaryBrandId);
};
