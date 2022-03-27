import { AppThunk } from 'RootTypes';
import {
  AssetFilter,
  ContractFilter,
  DefinitionPlanTypes,
  FilterModelWithBrand,
  InformationFilter,
  ModelFilterResponse,
  PlanDefinitionsFilter,
  SavedFilter,
  SavedFilterResponse
} from './types';
import { Category } from 'store/slices/categories/types';
import { Location } from '../locations/types';
import { PagedResult, apiCaller } from 'store/common';
import {
  changeSelectedFilter,
  removeSelectedSavedFilter,
  setAllSavedFilters,
  setDraftContractEmpty,
  setDraftDefinitionEmpty,
  setFilterDefinitionsDoesNotNeedPlan,
  setFilterDefinitionsNoPlan,
  setFilterNoContractAssigned,
  setFilterNoContractTypes,
  setSelectableFilterModelWithBrand
} from './slice';
import { dequal } from 'dequal';
import { emptyFilter, emptyPlanDefinitionsFilter } from 'store/slices/asset/filter/data';
import { getMultipleCategoriesWithParentsByIds } from 'store/slices/categories/actions';
import { getMultipleLocationsFullPath } from '../locations/actions';
import { getPersonsByIds } from 'store/slices/persons';
import { isArrayNullOrEmpty } from 'utils';
import {
  selectDraftFilter,
  selectDraftFilterDefinitionsDoesNotNeedPlan,
  selectDraftFilterDefinitionsNoPlan,
  selectDraftFilterInformationBranches,
  selectDraftFilterInformationCategories,
  selectDraftFilterInformationCreatedBy,
  selectDraftFilterInformationCustodian,
  selectDraftFilterInformationLocations,
  selectDraftFilterNoContractAssigned,
  selectSavedFiltersById,
  selectSelectedFilterId
} from './selectors';
import { showDeleteSuccessSnackbar, showSaveSuccessSnackbar } from 'store/slices/application';
import { upsertModels } from 'store/slices/models';
import axios from 'utils/axiosUtils';

export const deleteSavedFilter =
  (filterId: string): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    const requestBuilder = () => axios.delete(`listing/filters/${filterId}`);
    const selectedFilterId = selectSelectedFilterId(state);
    if (selectedFilterId === filterId) {
      dispatch(changeSelectedFilter(undefined));
    }
    await dispatch(apiCaller(requestBuilder));

    await dispatch(getSavedFilters());
    dispatch(showDeleteSuccessSnackbar());
  };

export const saveFilter =
  (title: string): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    const draftFilter = selectDraftFilter(state);
    const fieldCount = getCriteriaCount(draftFilter);
    const requestBuilder = () =>
      axios.post<SavedFilterResponse>('listing/filters', {
        fieldCount,
        filterJSON: JSON.stringify(draftFilter),
        title
      });

    const savedFilter = await dispatch(apiCaller(requestBuilder));

    dispatch(showSaveSuccessSnackbar());
    await dispatch(getSavedFilters());
    dispatch(changeSelectedFilter(savedFilter.id));
  };

export const checkFilterDropdown = (): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const draftFilter = selectDraftFilter(state);
  const selectedFilterId = selectSelectedFilterId(state);
  const selectedFilter = selectSavedFiltersById(state, selectedFilterId);

  if (selectedFilter && !dequal(selectedFilter?.filter, draftFilter)) {
    dispatch(removeSelectedSavedFilter());
  }
};

export const getSavedFilters = (): AppThunk => async (dispatch) => {
  const requestBuilder = () => axios.get<SavedFilterResponse[]>('listing/filters');
  const results = await dispatch(apiCaller(requestBuilder));
  const parsedResult: SavedFilter[] = results.map((result) => ({
    createdDate: result.createdDate,
    fieldCount: result.fieldCount,
    filter: JSON.parse(result.filterJson),
    id: result.id,
    title: result.title
  }));
  dispatch(setAllSavedFilters(parsedResult));
};

export const doesNotHaveContractCheckbox = (): AppThunk => async (dispatch, getState) => {
  const noContract = selectDraftFilterNoContractAssigned(getState());
  dispatch(setDraftContractEmpty());
  dispatch(setFilterNoContractAssigned(!noContract));
  dispatch(setFilterNoContractTypes([]));
};

export const doesNotNeedPlanCheckbox =
  (planType: DefinitionPlanTypes): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    const noNeedPlan = selectDraftFilterDefinitionsDoesNotNeedPlan(state, planType);
    dispatch(setDraftDefinitionEmpty(planType));
    dispatch(setFilterDefinitionsDoesNotNeedPlan({ doesNotNeed: !noNeedPlan, planType }));
  };

export const doesNotHavePlanCheckbox =
  (planType: DefinitionPlanTypes): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    const noPlan = selectDraftFilterDefinitionsNoPlan(state, planType);
    dispatch(setDraftDefinitionEmpty(planType));
    dispatch(setFilterDefinitionsNoPlan({ noPlan: !noPlan, planType }));
  };

export const getCriteriaCount = (draftFilter: AssetFilter) => {
  let count = 0;
  const draftFilterInformationKeys = Object.keys(draftFilter.information);
  const draftFilterContractKeys = Object.keys(draftFilter.contract);
  const draftFilterDefinitionCalibrationKeys = Object.keys(draftFilter.definition.calibration);
  const draftFilterDefinitionMaintenanceKeys = Object.keys(draftFilter.definition.maintenance);

  draftFilterInformationKeys.forEach((draftFilterInformationKey) => {
    const key = draftFilterInformationKey as keyof InformationFilter;
    count = !dequal(draftFilter.information[key], emptyFilter.information[key]) ? count + 1 : count;

    if (draftFilterInformationKey === 'brandModels') {
      const modelFiltered = draftFilter.information.brandModels.some(
        (brandModel) => !isArrayNullOrEmpty(brandModel.models)
      );
      count = modelFiltered ? count + 1 : count;
    }
  });

  draftFilterContractKeys.forEach((draftFilterContractKey) => {
    const key = draftFilterContractKey as keyof ContractFilter;
    count = !dequal(draftFilter.contract[key], emptyFilter.contract[key]) ? count + 1 : count;
  });

  draftFilterDefinitionCalibrationKeys.forEach((draftFilterDefinitionCalibrationKey) => {
    const key = draftFilterDefinitionCalibrationKey as keyof PlanDefinitionsFilter;
    count = !dequal(draftFilter.definition.calibration[key], emptyPlanDefinitionsFilter[key])
      ? count + 1
      : count;
  });

  draftFilterDefinitionMaintenanceKeys.forEach((draftFilterDefinitionMaintenanceKey) => {
    const key = draftFilterDefinitionMaintenanceKey as keyof PlanDefinitionsFilter;
    count = !dequal(draftFilter.definition.maintenance[key], emptyPlanDefinitionsFilter[key])
      ? count + 1
      : count;
  });

  return count;
};

export const getModelsByBrandIds =
  (brandIds: string[]): AppThunk<Promise<FilterModelWithBrand[]>> =>
  async (dispatch) => {
    if (brandIds.length > 0) {
      const requestBuilder = () =>
        axios.post<ModelFilterResponse[]>('category/brands/models', brandIds);
      const modelListResponse = await dispatch(apiCaller(requestBuilder));
      const modelList: FilterModelWithBrand[] = modelListResponse.reduce<FilterModelWithBrand[]>(
        (list, value) => {
          const models = value.models.map((m) => ({
            brandId: value.id,
            brandName: value.name,
            id: m.id,
            name: m.name
          }));
          return [...list, ...models];
        },
        []
      );
      dispatch(setSelectableFilterModelWithBrand(modelList));
      dispatch(
        upsertModels(
          modelList.map((m) => ({
            id: m.id,
            name: m.name
          }))
        )
      );

      return modelList;
    }

    return [];
  };

export const searchAssetCode =
  (searchText: string, page = 1, size = 400): AppThunk<Promise<string[]>> =>
  async (dispatch, getState) => {
    const state = getState();
    const branchIds = selectDraftFilterInformationBranches(state);
    const requestBuilder = () =>
      axios.post<PagedResult<string>>('registration/assets/codes/search', {
        branchIds,
        code: searchText,
        page,
        size
      });
    const results = await dispatch(apiCaller(requestBuilder));
    return results.items;
  };

export const searchAssetFCode =
  (searchText: string, page = 1, size = 400): AppThunk<Promise<PagedResult<string>>> =>
  async (dispatch, getState) => {
    const state = getState();
    const branchIds = selectDraftFilterInformationBranches(state);
    const requestBuilder = () =>
      axios.post<PagedResult<string>>('registration/assets/f-codes/search', {
        branchIds,
        fCode: searchText,
        page,
        size
      });
    const results = await dispatch(apiCaller(requestBuilder));
    return results;
  };

export const searchContractContact =
  (searchText: string, page = 1, size = 400): AppThunk<Promise<string[]>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<PagedResult<string>>(
        `recommendation/registration/firm-contact-person/search?text=${searchText}&page=${page}&size=${size}`
      );
    const results = await dispatch(apiCaller(requestBuilder));
    return results.items;
  };

export const searchDefinitionsTitle =
  (searchText: string, key: DefinitionPlanTypes): AppThunk<Promise<string[]>> =>
  async (dispatch) => {
    let searchResults: string[] = [];
    try {
      const requestBuilder = () =>
        axios.get<string[]>(
          `recommendation/registration/definitions-${key}-title/${searchText}/search`
        );
      searchResults = await dispatch(apiCaller(requestBuilder));
      return searchResults;
    } catch (error: any) {
      if (error?.response?.status !== 404) {
        throw error;
      }
      return searchResults;
    }
  };

export const searchContractFirm =
  (searchText: string, page = 1, size = 400): AppThunk<Promise<string[]>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<PagedResult<string>>(
        `recommendation/registration/firm-name/search?text=${searchText}&page=${page}&size=${size}`
      );
    const results = await dispatch(apiCaller(requestBuilder));
    return results.items;
  };

export const searchAssetPurchaseContact =
  (searchText: string, page = 1, size = 400): AppThunk<Promise<PagedResult<string>>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<PagedResult<string>>(
        `recommendation/registration/contact-person/search?text=${searchText}&page=${page}&size=${size}`
      );
    const results = await dispatch(apiCaller(requestBuilder));
    return results;
  };

export const searchAssetPurchasedFirm =
  (searchText: string, page = 1, size = 400): AppThunk<Promise<string[]>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<PagedResult<string>>(
        `recommendation/registration/purchased-firm/search?text=${searchText}&page=${page}&size=${size}`
      );
    const results = await dispatch(apiCaller(requestBuilder));
    return results.items;
  };

export const getAssetFilterCategoriesWithParents =
  (): AppThunk<Promise<Category[]>> => async (dispatch, getState) => {
    const currentState = getState();
    const assetFilterCategoryIds = selectDraftFilterInformationCategories(currentState);
    if (isArrayNullOrEmpty(assetFilterCategoryIds)) {
      return [];
    }

    const categories = await dispatch(
      getMultipleCategoriesWithParentsByIds(assetFilterCategoryIds)
    );

    return categories;
  };

export const getAssetFilterLocationsWithParents =
  (): AppThunk<Promise<Location[]>> => async (dispatch, getState) => {
    const currentState = getState();
    const assetFilterLocationIds = selectDraftFilterInformationLocations(currentState);
    if (isArrayNullOrEmpty(assetFilterLocationIds)) {
      return [];
    }

    const locations = await dispatch(getMultipleLocationsFullPath(assetFilterLocationIds));

    return locations;
  };

export const getAssetFilterCustodianPersons =
  (): AppThunk<Promise<Location[]>> => async (dispatch, getState) => {
    const currentState = getState();
    const custodianPersonIds = selectDraftFilterInformationCustodian(currentState);
    if (isArrayNullOrEmpty(custodianPersonIds)) {
      return [];
    }

    const custodianPersons = await dispatch(getPersonsByIds(custodianPersonIds));

    return custodianPersons;
  };

export const getAssetFilterCreatedByPerson =
  (): AppThunk<Promise<Location[]>> => async (dispatch, getState) => {
    const currentState = getState();
    const createdByPersonIds = selectDraftFilterInformationCreatedBy(currentState);
    if (isArrayNullOrEmpty(createdByPersonIds)) {
      return [];
    }

    const createdByPersons = await dispatch(getPersonsByIds(createdByPersonIds));

    return createdByPersons;
  };
