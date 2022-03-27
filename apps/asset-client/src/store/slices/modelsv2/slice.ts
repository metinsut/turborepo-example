import { Model } from './types';
import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { initialState } from './data';

export const modelsAdapter = createEntityAdapter<Model>({
  sortComparer: (first, second) => first.name.localeCompare(second.name)
});

const modelSlice = createSlice({
  initialState: modelsAdapter.getInitialState(initialState),
  name: 'modelsv2',
  reducers: {
    fetchRequiredModelIdRemoved: (draft) => {
      draft.fetchRequiredModelId = initialState.fetchRequiredModelId;
    },
    fetchRequiredModelIdUpdated: (draft, action: PayloadAction<string>) => {
      draft.fetchRequiredModelId = action.payload;
    },
    modelUpdated: modelsAdapter.upsertOne,
    setDisplayedModelIds: (
      draft,
      action: PayloadAction<{
        categoryId: string;
        brandId: string;
        modelIds: string[];
      }>
    ) => {
      const { categoryId, brandId, modelIds } = action.payload;

      const displayKey = generateCategoryBrandId(categoryId, brandId);

      draft.displayedModelIds[displayKey] = modelIds;
    },
    setSearchedIds: (draft, action: PayloadAction<string[]>) => {
      draft.searchIds = [...action.payload];
    },
    upsertModels: modelsAdapter.upsertMany
  }
});

export function generateCategoryBrandId(categoryId: string, brandId: string) {
  if (!categoryId) {
    return `${brandId}`;
  }

  return `${categoryId};${brandId}`;
}

export default modelSlice.reducer;

export const {
  fetchRequiredModelIdRemoved,
  fetchRequiredModelIdUpdated,
  setDisplayedModelIds,
  setSearchedIds,
  upsertModels,
  modelUpdated
} = modelSlice.actions;
