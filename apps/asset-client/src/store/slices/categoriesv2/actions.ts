import { AppThunk, RootState } from 'RootTypes';
import { AssociatedItems, Categoryv2 } from './types';
import { apiCaller } from 'store/common';
import {
  categoriesDeleted,
  categoriesFetched,
  categoryCollapsed,
  categoryExpanded,
  categoryUpdated
} from './slice';
import { maxCategoryDepth, parentCategoryIdOfRoot } from './data';
import { selectCategoryv2ById, selectChildrenCategoryIdsByParentId } from './selectors';
import {
  showAddSuccessSnackbar,
  showDeleteSuccessSnackbar,
  showUpdateSuccessSnackbar
} from '../application';
import axios from 'utils/axiosUtils';

export const getCategoriesv2 =
  (parentCategoryId: string): AppThunk<Promise<Categoryv2[]>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<Categoryv2[]>(`category/categories?parentCategoryId=${parentCategoryId ?? ''}`);
    const categories: Categoryv2[] = await dispatch(apiCaller(requestBuilder));

    dispatch(categoriesFetched({ categories, parentCategoryId }));

    return categories;
  };

export const refreshCategoryv2 =
  (id: string): AppThunk<Promise<Categoryv2>> =>
  async (dispatch) => {
    if (!id) {
      return undefined;
    }

    const requestBuilder = () => axios.get<Categoryv2>(`category/categories/${id}`);
    const category = await dispatch(apiCaller(requestBuilder));
    dispatch(categoryUpdated(category));

    return category;
  };

export const expandCategory =
  (category: Categoryv2, expanded: boolean): AppThunk =>
  async (dispatch) => {
    if (expanded) {
      dispatch(categoryExpanded(category));
    } else {
      dispatch(categoryCollapsed(category));
    }
  };

export const addCategory =
  (category: Categoryv2): AppThunk<Promise<Categoryv2>> =>
  async (dispatch) => {
    const requestBuilder = () => axios.post<Categoryv2>('category/categories', category);
    const finalCategory = await dispatch(apiCaller(requestBuilder));

    return finalCategory;
  };

export const updateCategory =
  (category: Categoryv2): AppThunk<Promise<Categoryv2>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.put<Categoryv2>(`category/categories/${category.id}`, category);
    const finalCategory = await dispatch(apiCaller(requestBuilder));

    return finalCategory;
  };

export const upsertCategory =
  (category: Categoryv2): AppThunk<Promise<Categoryv2>> =>
  async (dispatch) => {
    let finalCategory: Categoryv2;
    const addMode = !category.id;
    if (addMode) {
      finalCategory = await dispatch(addCategory(category));
    } else {
      finalCategory = await dispatch(updateCategory(category));
    }

    // Expand added category
    if (addMode && finalCategory.level < maxCategoryDepth) {
      dispatch(expandCategory(finalCategory, true));
    }

    // Retrieving current category group in alphabetical order
    await dispatch(getCategoriesv2(finalCategory?.parentCategoryId ?? parentCategoryIdOfRoot));

    // Retrieving parent category for updating hasChildCategory status
    dispatch(refreshCategoryv2(finalCategory.parentCategoryId));

    if (addMode) {
      dispatch(showAddSuccessSnackbar());
    } else {
      dispatch(showUpdateSuccessSnackbar());
    }
    return finalCategory;
  };

const fillRemoveIdsRecursively = (state: RootState, categoryId: string): string[] => {
  let finalIds = [categoryId];
  const childIds = selectChildrenCategoryIdsByParentId(state, categoryId);

  childIds.forEach((childId) => {
    finalIds = [...finalIds, ...fillRemoveIdsRecursively(state, childId)];
  });

  return finalIds;
};

export const removeMainCategory =
  (categoryId: string): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();

    // Get category detail by category id
    const category = selectCategoryv2ById(state, categoryId);

    // Send delete request
    const requestBuilder = () => axios.delete(`category/main-categories/${categoryId}`);
    await dispatch(apiCaller(requestBuilder));

    // Find all self and sub category ids
    const removeIds = fillRemoveIdsRecursively(state, categoryId);

    // Delete all category ids from entities and ids array
    await dispatch(categoriesDeleted(removeIds));

    // Delete category id from expanded category ids array
    await dispatch(categoryCollapsed(category));

    dispatch(showDeleteSuccessSnackbar());
  };

export const removeSubCategory =
  (categoryId: string): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();

    // Get category detail by category id
    const category = selectCategoryv2ById(state, categoryId);

    // Send delete request
    const requestBuilder = () =>
      axios.delete('category/categories', {
        data: {
          categoryIds: [categoryId]
        }
      });
    await dispatch(apiCaller(requestBuilder));

    // Find all self and sub category ids
    const removeIds = fillRemoveIdsRecursively(state, categoryId);

    // Delete all category ids from entities and ids array
    await dispatch(categoriesDeleted(removeIds));

    // Delete category id from expanded category ids array
    await dispatch(categoryCollapsed(category));

    // Fetch parent category for true data (hasChildCategory)
    await dispatch(refreshCategoryv2(category.parentCategoryId));

    // Show snackbar
    dispatch(showDeleteSuccessSnackbar());
  };

export const getMainCategoryAssociatedItems =
  (categoryId: string): AppThunk<Promise<AssociatedItems>> =>
  async (dispatch) => {
    const requestBuilder = () => axios.get(`category/main-categories/${categoryId}/any-associate`);
    const data = await dispatch(apiCaller(requestBuilder));
    return data;
  };
