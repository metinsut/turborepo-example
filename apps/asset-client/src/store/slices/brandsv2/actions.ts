import { AppThunk } from 'RootTypes';
import { Brand } from './types';
import { apiCaller } from 'store/common';
import { categoryCollapsed } from '../categoriesv2/slice';
import {
  removeBrandIdFromDisplayedIds,
  removeExpandedBrand,
  setDisplayedBrandIds,
  setExpandedBrand,
  upsertBrands
} from './slice';
import { selectAllBrands } from './selectors';
import { selectCategoryv2ById } from '../categoriesv2/selectors';
import { showAddSuccessSnackbar, showDeleteSuccessSnackbar } from '../application';
import axios from 'utils/axiosUtils';

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
  };

export const addBrandToCategory =
  (brandName: string, categoryId: string): AppThunk<Promise<Brand>> =>
  async (dispatch, getState) => {
    const currentState = getState();
    const brands = selectAllBrands(currentState);
    // If a brand with this name exist, sending the existing brand to backend
    const existingBrandWithSameName = brands.find((i) => i.name === brandName);

    const brandToAdd: Brand = existingBrandWithSameName ?? {
      name: brandName
    };

    const requestUrl = `category/categories/${categoryId}/brands`;
    const requestBuilder = () => axios.post<Brand>(requestUrl, brandToAdd);
    const finalBrand = await dispatch(apiCaller(requestBuilder));

    // Refreshing brands after adding a new one
    await dispatch(getBrandsForCategory(categoryId));
    dispatch(getAllBrands());

    const category = selectCategoryv2ById(currentState, categoryId);

    // Collapse category so that user cannot add subcategories
    dispatch(categoryCollapsed(category));
    dispatch(showAddSuccessSnackbar());

    // Expand added brand
    dispatch(setExpandedBrand(finalBrand.id));
    return finalBrand;
  };

export const getAllBrands = (): AppThunk => async (dispatch) => {
  const requestBuilder = () => axios.get<Brand[]>('category/brands');
  const data = await dispatch(apiCaller(requestBuilder));

  dispatch(upsertBrands(data));
};

export const removeBrandFromCategory =
  (categoryId: string, brandId: string): AppThunk =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.delete<Brand>(`category/categories/${categoryId}/brands/${brandId}`);
    await dispatch(apiCaller(requestBuilder));
    dispatch(
      removeBrandIdFromDisplayedIds({
        brandId,
        categoryId
      })
    );
    dispatch(removeExpandedBrand());
    dispatch(getAllBrands());
    dispatch(showDeleteSuccessSnackbar());
  };
