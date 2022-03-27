import { RootState } from 'RootTypes';
import { brandsAdapter } from './slice';

export const {
  selectAll: selectAllBrands,
  selectById: selectBrandById,
  selectIds: selectAllBrandIds,
  selectEntities
} = brandsAdapter.getSelectors<RootState>((state) => state.brandsv2);

export const selectExpandedBrandId = (state: RootState) => state.brandsv2.expandedBrandId;

export const selectBrandByName = (state: RootState) => state.brandsv2.entities.values.name;

export const selectDisplayedBrandIdsByCategoryId = (state: RootState, categoryId: string) =>
  state.brandsv2.displayedBrandIds[categoryId] ?? [];
