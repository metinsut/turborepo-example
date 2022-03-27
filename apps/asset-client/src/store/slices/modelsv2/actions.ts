import { AppThunk } from 'RootTypes';
import { ImageStatus } from 'views/Categoriesv2/BrandModel/Models/ModelImageSection';
import { Model } from './types';
import { apiCaller } from 'store/common';
import {
  fetchRequiredModelIdUpdated,
  modelUpdated,
  setDisplayedModelIds,
  setSearchedIds,
  upsertModels
} from './slice';
import { selectModelById, selectSearchModels } from './selectors';
import {
  showAddSuccessSnackbar,
  showDeleteSuccessSnackbar,
  showSaveSuccessSnackbar
} from '../application';
import axios from 'utils/axiosUtils';

export const getSearchableModels =
  (brandId: string): AppThunk =>
  async (dispatch) => {
    const requestUrl = `category/brands/${brandId}/models`;

    const requestBuilder = () => axios.get<Model[]>(requestUrl);
    const data = await dispatch(apiCaller(requestBuilder));

    dispatch(upsertModels(data));
    dispatch(setSearchedIds(data.map((i) => i.id)));
  };

export const getDisplayedModels =
  (brandId: string, categoryId: string): AppThunk =>
  async (dispatch) => {
    if (brandId) {
      const requestBuilder = () =>
        axios.get<Model[]>(`category/categories/${categoryId}/brands/${brandId}/models`);
      const data = await dispatch(apiCaller(requestBuilder));

      dispatch(upsertModels(data));
      dispatch(
        setDisplayedModelIds({
          brandId,
          categoryId,
          modelIds: data.map((i) => i.id)
        })
      );
    }
  };

export const addModel =
  (
    modelName: string,
    categoryId: string,
    brandId: string,
    imageStatus: ImageStatus,
    imageFile: File
  ): AppThunk =>
  async (dispatch) => {
    const model = await dispatch(addModelToCategoryAndBrand(modelName, categoryId, brandId));
    try {
      await dispatch(modifyModelImage(model.id, imageStatus, imageFile));
    } catch (error: any) {}
  };

export const addModelToCategoryAndBrand =
  (modelName: string, categoryId: string, brandId: string): AppThunk<Promise<Model>> =>
  async (dispatch, getState) => {
    const currentState = getState();
    const models = selectSearchModels(currentState);

    // If a model with this name exist, sending the existing model to backend
    const existingModelWithSameName = models.find((i) => i.name === modelName);

    const modelToAdd: Model = existingModelWithSameName ?? {
      name: modelName
    };

    const requestUrl = `category/categories/${categoryId}/brands/${brandId}/models`;
    const requestBuilder = () => axios.post<Model>(requestUrl, modelToAdd);
    const finalModel = await dispatch(apiCaller(requestBuilder));

    // Refreshing models after adding a new one
    await dispatch(getDisplayedModels(brandId, categoryId));
    dispatch(getSearchableModels(brandId));

    dispatch(showAddSuccessSnackbar());
    return finalModel;
  };

export const removeModelFromCategoryAndBrand =
  (categoryId: string, brandId: string, modelId: string): AppThunk =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.delete<Model>(`category/categories/${categoryId}/brands/${brandId}/models/${modelId}`);
    await dispatch(apiCaller(requestBuilder));

    // Refreshing models after removing
    await dispatch(getDisplayedModels(brandId, categoryId));
    dispatch(getSearchableModels(brandId));

    dispatch(showDeleteSuccessSnackbar());
  };

export const modifyModelImage =
  (modelId: string, imageStatus: ImageStatus, imageFile: File): AppThunk =>
  async (dispatch) => {
    if (imageStatus === 'changed') {
      await dispatch(updateModelImage(modelId, imageFile));
    } else if (imageStatus === 'deleted') {
      await dispatch(deleteModelImage(modelId));
    }
  };

const updateModelImage =
  (modelId: string, file: File): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    const currentModel = selectModelById(state, modelId);
    const oldPhotoPath = currentModel.photoPath;

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

    dispatch(modelUpdated(finalModel));

    // Set refetch flag if image replaced with a new one
    if (oldPhotoPath) {
      dispatch(fetchRequiredModelIdUpdated(modelId));
    }
    dispatch(showSaveSuccessSnackbar());
  };

const deleteModelImage =
  (modelId: string): AppThunk =>
  async (dispatch) => {
    const requestBuilder = () => axios.delete<Model>(`category/models/${modelId}/photo`);
    const finalModel = await dispatch(apiCaller(requestBuilder));

    dispatch(modelUpdated(finalModel));
    dispatch(fetchRequiredModelIdUpdated(modelId));
    dispatch(showDeleteSuccessSnackbar());
  };
