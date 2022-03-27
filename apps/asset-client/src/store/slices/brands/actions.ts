import { AppThunk } from 'RootTypes';
import { Brand } from './types';
import {
  addDisplayedBrandId,
  brandAdded,
  clearBrandIdToRefresh,
  emptyBrandAdded,
  removeBrand,
  removeBrandIdFromDisplayedIds,
  removeBrandIdsFromDisplayedIds,
  removeBrandsById,
  removeExpandedBrand,
  setDisplayedBrandIds,
  setExpandedBrand,
  setSearchedIds,
  upsertBrand,
  upsertBrands
} from './slice';
import { apiCaller, temporaryBrandId } from 'store/common';
import { collapseCategory } from '../categories/slice';
import { selectBrandById, selectInMemoryBrandIds } from './selectors';
import { selectCategoryById } from '../categories/selectors';
import { showAddSuccessSnackbar, showDeleteSuccessSnackbar } from '../application';
import { v4 as uuid } from 'uuid';
import axios from 'utils/axiosUtils';

export const toggleExpandedBrand =
  (brandId: string): AppThunk =>
  async (dispatch, getState) => {
    const { expandedBrandId } = getState().brands;
    if (expandedBrandId === brandId) {
      dispatch(removeExpandedBrand());
    } else {
      dispatch(setExpandedBrand(brandId));
    }
  };

export const addEmptyBrand =
  (categoryId: string): AppThunk =>
  async (dispatch) => {
    dispatch(emptyBrandAdded());
    dispatch(
      addDisplayedBrandId({
        brandId: temporaryBrandId,
        categoryId
      })
    );
  };

export const addBrand =
  (
    brand: Brand,
    categoryId: string,
    options?: {
      inMemory?: boolean;
      showSnackBar?: boolean;
    }
  ): AppThunk<Promise<Brand>> =>
  async (dispatch) => {
    let finalBrand = brand;
    const { inMemory = false, showSnackBar = true } = options ?? {};

    if (inMemory) {
      finalBrand = {
        ...finalBrand,
        id: uuid(),
        inMemory: true,
        isNew: true
      };
    } else {
      const requestBrand = {
        ...brand,
        id: brand.id !== temporaryBrandId ? brand.id : uuid()
      };

      const requestUrl = categoryId
        ? `category/categories/${categoryId}/brands`
        : 'category/brands';

      const requestBuilder = () => axios.post<Brand>(requestUrl, requestBrand);
      finalBrand = await dispatch(apiCaller(requestBuilder));
    }

    dispatch(brandAdded(finalBrand));

    if (inMemory) {
      dispatch(
        removeBrandIdFromDisplayedIds({
          brandId: temporaryBrandId,
          categoryId
        })
      );

      dispatch(
        addDisplayedBrandId({
          brandId: finalBrand.id,
          categoryId
        })
      );
    }
    if (showSnackBar && !inMemory) {
      dispatch(showAddSuccessSnackbar());
    }
    return finalBrand;
  };

export const addBrandToCategory =
  (brand: Brand, categoryId: string): AppThunk<Promise<Brand>> =>
  async (dispatch, getState) => {
    const currentState = getState();
    const existingBrandWithSameId = selectBrandById(currentState, brand.id);
    const brandToAdd: Brand = {
      ...brand,
      id: brand.name === existingBrandWithSameId.name ? brand.id : undefined
    };
    const finalBrand = await dispatch(addBrand(brandToAdd, categoryId));

    await dispatch(getBrandsForCategory(categoryId));
    dispatch(getAllBrands());

    const category = selectCategoryById(currentState, categoryId);
    dispatch(collapseCategory(category));

    return finalBrand;
  };

export const getBrandById =
  (brandId: string): AppThunk<Promise<Brand>> =>
  async (dispatch) => {
    const requestBuilder = () => axios.get<Brand>(`category/brands/${brandId}`);
    const brand = await dispatch(apiCaller(requestBuilder));

    dispatch(upsertBrand(brand));
    return brand;
  };

export const deleteInMemoryBrands = (): AppThunk => async (dispatch, getState) => {
  const brandIds = selectInMemoryBrandIds(getState()) as string[];

  dispatch(removeBrandIdsFromDisplayedIds({ brandIds }));
  dispatch(removeBrandsById(brandIds));
};

export const getAllBrands = (): AppThunk => async (dispatch) => {
  const requestBuilder = () => axios.get<Brand[]>('category/brands');
  const data = await dispatch(apiCaller(requestBuilder));

  dispatch(upsertBrands(data));
  dispatch(setSearchedIds(data.map((i) => i.id)));
};

export const getBrandsForCategory =
  (categoryId: string): AppThunk =>
  async (dispatch) => {
    const requestBuilder = () => axios.get<Brand[]>(`category/categories/${categoryId}/brands`);
    const data = await dispatch(apiCaller(requestBuilder));

    const brandIds = data.map((i) => i.id);
    dispatch(upsertBrands(data));
    dispatch(
      setDisplayedBrandIds({
        brandIds,
        categoryId
      })
    );

    dispatch(clearBrandIdToRefresh());
  };

export const removeBrandFromCategory =
  (categoryId: string, brandId: string): AppThunk =>
  async (dispatch) => {
    if (brandId === temporaryBrandId) {
      dispatch(
        removeBrandIdFromDisplayedIds({
          brandId,
          categoryId
        })
      );

      dispatch(removeBrand(temporaryBrandId));
      return;
    }

    const requestBuilder = () =>
      axios.delete<Brand>(`category/categories/${categoryId}/brands/${brandId}`);
    await dispatch(apiCaller(requestBuilder));

    dispatch(
      removeBrandIdFromDisplayedIds({
        brandId,
        categoryId
      })
    );
    dispatch(removeBrand(brandId));
    dispatch(removeExpandedBrand());
    dispatch(getAllBrands());
    dispatch(showDeleteSuccessSnackbar());
  };
