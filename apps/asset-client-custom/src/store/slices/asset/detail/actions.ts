import { ASSETLIST } from 'routes/constant-route';
import { AppThunk } from 'RootTypes';
import { Asset, AssetFormField, AssetListItem, PaginatedAssetRequest } from './types';
import { AssetFilter } from '../filter/types';
import { Brand } from 'store/slices/brands/types';
import { Category } from 'store/slices/categories/types';
import {
  CategoryTask,
  getCategoryTaskById,
  getMainCategoryByTask,
  searchCategoryTask
} from 'store/slices/categoryTasks';
import { ContractBasicInformation } from 'store/slices/contracts/types';
import { DataTypes, FormField } from 'store/slices/assetConfiguration/forms/types';
import { Model } from 'store/slices/models';
import { PagedResult, apiCaller } from 'store/common';
import { PlanBasicInformation } from 'store/slices/plans/types';
import {
  addAsset,
  setAssetCategory as setAssetCategoryAction,
  setAssetForm,
  setInitialAssetContractIds,
  setInitialAssetForm,
  setInitialAssetPlanIds
} from './slice';
import {
  addToInSessionsMultiple,
  confirmRemovalOfInSessions,
  updateCategories
} from 'store/slices/categories/slice';
import {
  deleteInMemoryCategories,
  getCategoryWithAncestors
} from 'store/slices/categories/actions';
import {
  flattenCategoryTreeRecursively,
  selectLastRemovedInSessionId
} from 'store/slices/categories/selectors';
import { getFormFieldsByMainCategoryId } from 'store/slices/assetConfiguration/forms/actions';
import { history } from 'utils/history';
import { initialFormData, initialState } from './data';
import { isObjectNullOrEmpty } from 'utils';
import { selectAsset, selectInitialAsset } from './selectors';
import { selectIsUserAuthorized } from 'store/slices/session';
import {
  showSaveSuccessSnackbar,
  showSnackbarMessage,
  showUpdateSuccessSnackbar
} from 'store/slices/application';
import { upsertContracts } from 'store/slices/contracts/slice';
import { upsertPlans } from 'store/slices/plans/slice';
import axios from 'utils/axiosUtils';
import i18n from 'utils/i18n';

export const getPaginatedAssetsByFilter =
  (
    page: number,
    size: number,
    filter: AssetFilter
  ): AppThunk<Promise<PagedResult<AssetListItem>>> =>
  async (dispatch) => {
    const requestData: PaginatedAssetRequest = {
      ...filter,
      page,
      size
    };
    const requestBuilder = () =>
      axios.post<PagedResult<AssetListItem>>('listing/assets/filter', requestData);
    const assetsList = await dispatch(apiCaller(requestBuilder));
    return assetsList;
  };

export const initializeAssetDetailPage =
  (assetId: string): AppThunk<Promise<Asset>> =>
  async (dispatch) => {
    try {
      const asset = await dispatch(getAssetById(assetId));
      return asset;
    } catch (error) {
      history.push(ASSETLIST);
      return undefined;
    }
  };

export const getAssetById =
  (id: string): AppThunk<Promise<Asset>> =>
  async (dispatch) => {
    const requestBuilder = () => axios.get<Asset>(`registration/assets/${id}`);
    const asset = await dispatch(apiCaller(requestBuilder));
    const task = await dispatch(getCategoryTaskById(asset.categoryBrandModelId));
    const mainCategory = getMainCategoryByTask(task);

    const finalAsset: Asset = {
      ...initialFormData,
      ...asset,
      assetFormFields: asset.assetFormFields.map((i) => ({
        ...i,
        value: i.value ?? getInitialFormFieldValue(i.dataType)
      })),
      brandId: task.brand.id,
      categoryId: task.category.id,
      isCategoryAutoAssigned: true,
      mainCategoryId: mainCategory.id,
      modelId: task.model.id
    };

    dispatch(addAsset(finalAsset));
    dispatch(setAssetForm(finalAsset));
    dispatch(setInitialAssetForm(finalAsset));
    return finalAsset;
  };

export const initializeAssetAddWithFormFields =
  (): AppThunk<Promise<Asset>> => async (dispatch, getState) => {
    const currentState = getState();
    const draftAsset = selectAsset(currentState);
    const formFields = await dispatch(getFormFieldsByMainCategoryId(draftAsset.mainCategoryId));

    const finalAsset: Asset = {
      ...draftAsset,
      assetFormFields: formFields.map((formField) => convertFormFieldToAssetFormField(formField)),
      formFieldsInitialized: true
    };

    dispatch(setAssetForm(finalAsset));
    dispatch(setInitialAssetForm(finalAsset));
    return finalAsset;
  };

export const saveAsset = (): AppThunk<Promise<Asset>> => async (dispatch, getState) => {
  const asset = selectAsset(getState());
  let assetToSave: Asset = {
    ...asset,
    assetFormFields: asset.assetFormFields
      .filter((i) => !isObjectNullOrEmpty(i.value))
      .map((i) => ({ formFieldId: i.formFieldId, value: i.value }))
  };
  if (!asset.id) {
    const requestBuilder = () => axios.post<Asset>('registration/assets', assetToSave);
    assetToSave = await dispatch(apiCaller(requestBuilder));
  } else {
    const requestBuilder = () =>
      axios.put<Asset>(`registration/assets/${assetToSave.id}`, assetToSave);
    assetToSave = await dispatch(apiCaller(requestBuilder));
  }

  const finalAsset = {
    ...asset,
    id: assetToSave.id
  };

  dispatch(addAsset(finalAsset));
  dispatch(setInitialAssetForm(finalAsset));

  if (!asset.id) {
    dispatch(showSaveSuccessSnackbar());
  } else {
    dispatch(showUpdateSuccessSnackbar());
  }
  return finalAsset;
};

export const getAssetCategory =
  (mainCategoryId: string, brandId: string, modelId: string): AppThunk =>
  async (dispatch, getState) => {
    const initialAsset = selectInitialAsset(getState());
    const asset = selectAsset(getState());

    // Initial page load
    if (
      initialAsset.brandId === brandId &&
      initialAsset.modelId === modelId &&
      asset.isCategoryAutoAssigned
    ) {
      return;
    }

    const task = await dispatch(searchCategoryTask(mainCategoryId, brandId, modelId));
    if (task) {
      dispatch(
        setAssetCategoryAction({
          autoAssigned: true,
          categoryBrandModelId: task.id,
          categoryId: task.category.id
        })
      );
    }
  };

export const setAssetBrand =
  (brand: Brand): AppThunk<Promise<Brand>> =>
  async (dispatch, getState) => {
    const state = getState();
    const currentAsset = selectAsset(state);

    dispatch(
      setAssetForm({
        ...currentAsset,
        brandId: brand.id,
        categoryBrandModelId: initialState.assetForm.categoryBrandModelId,
        categoryId: initialState.assetForm.categoryId,
        isCategoryAutoAssigned: false,
        modelId: initialState.assetForm.modelId
      })
    );

    return brand;
  };

export const setAssetModel =
  (model: Model): AppThunk<Promise<Model>> =>
  async (dispatch, getState) => {
    const state = getState();
    const currentAsset = selectAsset(state);

    dispatch(
      setAssetForm({
        ...currentAsset,
        categoryBrandModelId: initialState.assetForm.categoryBrandModelId,
        categoryId: initialState.assetForm.categoryId,
        isCategoryAutoAssigned: false,
        modelId: model.id
      })
    );

    return model;
  };

export const setAssetCategory =
  (categoryId: string, brandId: string, modelId: string): AppThunk<Promise<Category>> =>
  async (dispatch, getState) => {
    const category = await dispatch(getCategoryWithAncestors(categoryId, true));
    const state = getState();
    const asset = selectAsset(state);
    let finalTask;
    if (asset.categoryBrandModelId && !asset.isCategoryAutoAssigned) {
      // Update
      const lastRemovedId = selectLastRemovedInSessionId(state);
      const requestBuilder = () =>
        axios.put<CategoryTask>(`category/tasks/${asset.categoryBrandModelId}`, {
          brandId,
          category,
          lastDeletedCategoryId: lastRemovedId,
          modelId
        });

      finalTask = await dispatch(apiCaller(requestBuilder));
      dispatch(confirmRemovalOfInSessions());
    } else {
      // Add
      const requestBuilder = () =>
        axios.post<CategoryTask>('category/tasks', {
          brandId,
          category,
          modelId
        });
      finalTask = await dispatch(apiCaller(requestBuilder));
    }
    const newCategories = flattenCategoryTreeRecursively(finalTask.category);

    const previousCategories = flattenCategoryTreeRecursively(category);
    const inSessionIds: string[] = [];
    previousCategories.forEach((prevCategory) => {
      // TODO: level aynı, id'ler farklı diye kontrol edilebilir
      const matchedNewCategory = newCategories.find(
        (i) =>
          prevCategory.inMemory && i.level === prevCategory.level && i.name === prevCategory.name
      );

      if (matchedNewCategory) {
        inSessionIds.push(matchedNewCategory.id);
      }
    });

    await dispatch(deleteInMemoryCategories());
    dispatch(updateCategories(newCategories));
    dispatch(addToInSessionsMultiple(inSessionIds));

    dispatch(
      setAssetCategoryAction({
        autoAssigned: false,
        categoryBrandModelId: finalTask.id,
        categoryId: finalTask.category.id
      })
    );

    const userAuthorized = selectIsUserAuthorized(state, 'assetDetail_CategoryBrandModelCreate');
    if (!userAuthorized) {
      dispatch(
        showSnackbarMessage(
          i18n.t('assets.asset_edit.category_brand_model_snackbar_message'),
          'success'
        )
      );
    }

    return category;
  };

export const getAssetContracts =
  (assetId: string): AppThunk<Promise<ContractBasicInformation[]>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<ContractBasicInformation[]>(`registration/assets/${assetId}/contracts`);

    const data = await dispatch(apiCaller(requestBuilder));
    dispatch(upsertContracts(data));

    const contractIds = data.map((i) => i.id);
    dispatch(setInitialAssetContractIds(contractIds));

    return data;
  };

export const getAssetPlans =
  (assetId: string): AppThunk<Promise<PlanBasicInformation[]>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<PlanBasicInformation[]>(`registration/assets/${assetId}/plans`);

    const data = await dispatch(apiCaller(requestBuilder));
    dispatch(upsertPlans(data));

    const planIds = data.map((i) => i.id);
    dispatch(setInitialAssetPlanIds(planIds));

    return data;
  };

const getInitialFormFieldValue = (dataType: DataTypes) => (dataType === 'dateTime' ? null : '');

const convertFormFieldToAssetFormField = (formField: FormField) => {
  const assetFormField: AssetFormField = {
    dataType: formField.dataType,
    formFieldId: formField.id,
    isRequired: formField.isRequired,
    isUnique: formField.isUnique,
    section: formField.section,
    title: formField.title,
    value: getInitialFormFieldValue(formField.dataType)
  };
  return assetFormField;
};
