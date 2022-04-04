import { AppThunk, RootState } from 'RootTypes';
import { PayloadAction, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import { apiCaller, booleanCompare, temporaryModelId } from 'store/common';
import { setBrandIdToRefresh } from './brands/slice';
import { showAddSuccessSnackbar, showDeleteSuccessSnackbar } from './application';
import { v4 as uuid } from 'uuid';
import axios from 'utils/axiosUtils';

export interface Model {
  id?: string;
  name?: string;
  isNew?: boolean;
  image?: string;
  inMemory?: boolean;
  photoPath?: string;
}

const modelsAdapter = createEntityAdapter<Model>({
  sortComparer: (first, second) => {
    let result = booleanCompare(first.id !== temporaryModelId, second.id !== temporaryModelId);
    if (result === 0) {
      result = first.name.localeCompare(second.name);
    }

    return result;
  }
});

type ModelState = {
  displayedModelIds: { [categoryBrandId: string]: string[] };
  searchIds: string[];
};

const initialState: ModelState = {
  displayedModelIds: {},
  searchIds: []
};

function generateCategoryBrandId(categoryId: string, brandId: string) {
  if (!categoryId) {
    return `${brandId}`;
  }

  return `${categoryId};${brandId}`;
}

const modelSlice = createSlice({
  initialState: modelsAdapter.getInitialState(initialState),
  name: 'models',
  reducers: {
    addDisplayedModelId: (
      draft,
      action: PayloadAction<{
        categoryId: string;
        brandId: string;
        modelId: string;
      }>
    ) => {
      const { categoryId, brandId, modelId } = action.payload;

      const displayKey = generateCategoryBrandId(categoryId, brandId);
      if (draft.displayedModelIds[displayKey]) {
        draft.displayedModelIds[displayKey].push(modelId);
      } else {
        draft.displayedModelIds[displayKey] = [modelId];
      }
    },
    addEmptyModel: (draft) => {
      const addEmptyModel: Model = {
        id: temporaryModelId,
        name: ''
      };
      modelsAdapter.addOne(draft, addEmptyModel);
    },
    addModel: modelsAdapter.addOne,
    addSearchId: (draft, action: PayloadAction<string>) => {
      const exists = draft.searchIds.includes(action.payload);
      if (!exists) {
        draft.searchIds.push(action.payload);
      }
    },
    removeAndUpsertModel: (
      draft,
      action: PayloadAction<{
        model: Model;
      }>
    ) => {
      const { model } = action.payload;

      modelsAdapter.removeOne(draft, model.id);
      modelsAdapter.upsertOne(draft, model);
    },
    removeModelById: modelsAdapter.removeOne,
    removeModelIdFromDisplayedIds: (
      draft,
      action: PayloadAction<{
        categoryId: string;
        brandId: string;
        modelId: string;
      }>
    ) => {
      const { categoryId, brandId, modelId } = action.payload;

      const displayKey = generateCategoryBrandId(categoryId, brandId);

      if (draft.displayedModelIds[displayKey]) {
        const index = draft.displayedModelIds[displayKey].findIndex((i) => i === modelId);
        if (index !== -1) {
          draft.displayedModelIds[displayKey].splice(index, 1);
        }
      }
    },
    removeModelIdsFromDisplayedIds: (
      draft,
      action: PayloadAction<{
        modelIds: string[];
      }>
    ) => {
      const { modelIds } = action.payload;
      modelIds.forEach((modelId) => {
        Object.keys(draft.displayedModelIds).forEach((key) => {
          const index = draft.displayedModelIds[key].findIndex((i) => i === modelId);
          if (index !== -1) {
            draft.displayedModelIds[key].splice(index, 1);
          }
        });
      });
    },
    removeModelsById: modelsAdapter.removeMany,
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
      draft.searchIds = action.payload;
    },
    updateModel: modelsAdapter.upsertOne,
    upsertModels: modelsAdapter.upsertMany
  }
});

export const addEmptyModel =
  (categoryId: string, brandId: string): AppThunk =>
  async (dispatch) => {
    dispatch(modelSlice.actions.addEmptyModel());
    dispatch(
      modelSlice.actions.addDisplayedModelId({
        brandId,
        categoryId,
        modelId: temporaryModelId
      })
    );
  };

export const addModel =
  (
    model: Model,
    categoryId: string,
    brandId: string,
    options?: {
      inMemory?: boolean;
      showSnackBar?: boolean;
    }
  ): AppThunk<Promise<Model>> =>
  async (dispatch) => {
    let finalModel = model;
    const { inMemory = false, showSnackBar = true } = options ?? {};

    if (inMemory) {
      finalModel = {
        ...finalModel,
        id: uuid(),
        inMemory: true,
        isNew: true
      };
    } else {
      const requestModel = {
        ...model,
        brandId,
        id: model.id !== temporaryModelId ? model.id : uuid()
      };

      const requestUrl = categoryId
        ? `category/categories/${categoryId}/brands/${brandId}/models`
        : 'category/models';

      const requestBuilder = () => axios.post<Model>(requestUrl, requestModel);
      finalModel = await dispatch(apiCaller(requestBuilder));
    }

    dispatch(modelSlice.actions.addModel(finalModel));

    if (inMemory) {
      dispatch(
        modelSlice.actions.removeModelIdFromDisplayedIds({
          brandId,
          categoryId,
          modelId: temporaryModelId
        })
      );

      dispatch(
        modelSlice.actions.addDisplayedModelId({
          brandId,
          categoryId,
          modelId: finalModel.id
        })
      );
    }
    if (showSnackBar && !inMemory) {
      dispatch(showAddSuccessSnackbar());
    }
    if (!categoryId) {
      dispatch(modelSlice.actions.addSearchId(finalModel.id));
    }
    return finalModel;
  };

export const addModelToCategoryAndBrand =
  (model: Model, categoryId: string, brandId: string): AppThunk<Promise<Model>> =>
  async (dispatch, getState) => {
    const currentState = getState();
    const existingModelWithSameId = selectModelById(currentState, model.id);

    const modelToAdd: Model = {
      ...model,
      id: model.name === existingModelWithSameId.name ? model.id : undefined
    };
    const finalModel = await dispatch(addModel(modelToAdd, categoryId, brandId));

    dispatch(setBrandIdToRefresh(brandId));
    await dispatch(getModelsForBrandAndCategory(brandId, categoryId));

    dispatch(getModelsForBrand(brandId));
    return finalModel;
  };

export const updateModelImage =
  (modelId: string, file: File): AppThunk =>
  async (dispatch) => {
    const formData = new FormData();
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    const requestBuilder = () =>
      axios.put<Model>(`category/models/${modelId}/photo`, formData, config);
    const finalModel = await dispatch(apiCaller(requestBuilder));
    dispatch(modelSlice.actions.removeAndUpsertModel({ model: finalModel }));
  };

export const deleteModelImage =
  (modelId: string): AppThunk =>
  async (dispatch) => {
    const requestBuilder = () => axios.delete<Model>(`category/models/${modelId}/photo`);
    const finalModel = await dispatch(apiCaller(requestBuilder));

    dispatch(modelSlice.actions.removeAndUpsertModel({ model: finalModel }));
  };

export const getModelsForBrandAndCategory =
  (brandId: string, categoryId: string): AppThunk =>
  async (dispatch) => {
    if (brandId) {
      const requestBuilder = () =>
        axios.get<Model[]>(`category/categories/${categoryId}/brands/${brandId}/models`);
      const data = await dispatch(apiCaller(requestBuilder));

      dispatch(modelSlice.actions.upsertModels(data));
      dispatch(
        modelSlice.actions.setDisplayedModelIds({
          brandId,
          categoryId,
          modelIds: data.map((i) => i.id)
        })
      );
    }
  };

export const getModelsForBrand =
  (brandId: string, mainCategoryId?: string): AppThunk =>
  async (dispatch) => {
    let requestUrl = `category/brands/${brandId}/models`;
    if (mainCategoryId) {
      requestUrl = `category/categories/main/${mainCategoryId}/brands/${brandId}/models`;
    }

    const requestBuilder = () => axios.get<Model[]>(requestUrl);
    const data = await dispatch(apiCaller(requestBuilder));

    dispatch(modelSlice.actions.upsertModels(data));
    dispatch(modelSlice.actions.setSearchedIds(data.map((i) => i.id)));
  };

export const deleteInMemoryModels = (): AppThunk => async (dispatch, getState) => {
  const modelIds = selectInMemoryModelIds(getState()) as string[];

  dispatch(
    modelSlice.actions.removeModelIdsFromDisplayedIds({
      modelIds
    })
  );
  dispatch(modelSlice.actions.removeModelsById(modelIds));
};

export const removeModelFromCategoryAndBrand =
  (categoryId: string, brandId: string, modelId: string): AppThunk =>
  async (dispatch) => {
    if (modelId === temporaryModelId) {
      dispatch(modelSlice.actions.removeModelById(temporaryModelId));
      dispatch(
        modelSlice.actions.removeModelIdFromDisplayedIds({
          brandId,
          categoryId,
          modelId
        })
      );
      return;
    }
    const requestBuilder = () =>
      axios.delete<Model>(`category/categories/${categoryId}/brands/${brandId}/models/${modelId}`);
    await dispatch(apiCaller(requestBuilder));

    dispatch(modelSlice.actions.removeModelById(modelId));
    dispatch(setBrandIdToRefresh(brandId));
    dispatch(getModelsForBrand(brandId));
    dispatch(showDeleteSuccessSnackbar());
  };

export const { upsertModels } = modelSlice.actions;

export const {
  selectAll: selectAllModels,
  selectById: selectModelById,
  selectEntities
} = modelsAdapter.getSelectors<RootState>((state) => state.models);

export const selectSearchModelIds = (state: RootState) => state.models.searchIds ?? [];

export const selectSearchModels = createSelector(
  selectEntities,
  selectSearchModelIds,
  (entities, ids) => ids.map((id) => entities[id])
);

export const selectModelImageByIds = createSelector(
  selectModelById,
  (state: RootState, modelId: string) => modelId,
  (model) => model.id
);

const selectInMemoryModelIds = createSelector(selectAllModels, (models) =>
  models.filter((model) => model.inMemory).map((model) => model.id)
);

export const selectDisplayedModelIdsByCategoryAndBrandId = (
  state: RootState,
  categoryId: string,
  brandId: string
) => state.models.displayedModelIds[generateCategoryBrandId(categoryId, brandId)] ?? [];

export const selectModelsHasTemporaryChild = (
  state: RootState,
  categoryId: string,
  brandId: string
) => {
  const modelIds = state.models.displayedModelIds[generateCategoryBrandId(categoryId, brandId)];
  return modelIds && modelIds.includes(temporaryModelId);
};

export default modelSlice.reducer;
