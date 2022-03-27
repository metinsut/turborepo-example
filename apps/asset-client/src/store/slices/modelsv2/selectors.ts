import { RootState } from 'RootTypes';
import { createSelector } from '@reduxjs/toolkit';
import { generateCategoryBrandId, modelsAdapter } from './slice';

export const {
  selectAll: selectAllModels,
  selectById: selectModelById,
  selectEntities
} = modelsAdapter.getSelectors<RootState>((state) => state.modelsv2);

export const selectSearchModelIds = (state: RootState) => state.modelsv2.searchIds ?? [];

export const selectSearchModels = createSelector(
  selectEntities,
  selectSearchModelIds,
  (entities, ids) => ids.map((id) => entities[id])
);

export const selectDisplayedModelIdsByCategoryAndBrandId = (
  state: RootState,
  categoryId: string,
  brandId: string
) => state.modelsv2.displayedModelIds[generateCategoryBrandId(categoryId, brandId)] ?? [];

export const selectFetchRequiredModelId = (state: RootState) => state.modelsv2.fetchRequiredModelId;
