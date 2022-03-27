import { AppThunk, RootState } from 'RootTypes';
import { AssociateItems, Category, DisabledState } from './types';
import { CheckboxState, apiCaller, temporaryCategoryId } from 'store/common';
import { categoriesSlice, categorySelectedForBrand, setDraggingCategoryId } from './slice';
import { compareSortedArray } from 'utils';
import { expandBrand } from '../brands/slice';
import {
  flattenCategoryTreeRecursively,
  selectCategoryById,
  selectCategoryChecked,
  selectCategoryIdsByParentId,
  selectCheckedCategoryIdsByParentId,
  selectDisplayedCategoryIdsByParentId,
  selectDisplayedCheckedCategoryIdsByParentId,
  selectEntities,
  selectInMemoryCategories,
  selectInMemoryCategoryByParentId,
  selectIndeterminateCategoryIdsByParentId,
  selectIsAllDisplayedCategoriesCheckedByParentId,
  selectIsCategoryInSession,
  selectIsCategorySelected,
  selectMultipleCategoriesByIds
} from './selectors';
import { getBrandById } from '../brands/actions';
import { parentCategoryIdOfRoot } from './data';
import {
  showAddSuccessSnackbar,
  showDeleteSuccessSnackbar,
  showUpdateSuccessSnackbar
} from '../application';
import { v4 as uuid } from 'uuid';
import axios from 'utils/axiosUtils';

export const getCategories =
  (parentCategoryId: string): AppThunk<Promise<Category[]>> =>
  async (dispatch, getState) => {
    const requestBuilder = () =>
      axios.get<Category[]>(`category/categories?parentCategoryId=${parentCategoryId ?? ''}`);
    const data: Category[] = await dispatch(apiCaller(requestBuilder));
    const state = getState();

    const inMemoryCategory = selectInMemoryCategoryByParentId(state, parentCategoryId);

    dispatch(categoriesSlice.actions.updateCategories(data));

    dispatch(
      categoriesSlice.actions.setDisplayedCategoryIds({
        categoryIds: data.map((i) => i.id),
        parentId: parentCategoryId
      })
    );

    if (inMemoryCategory) {
      dispatch(
        categoriesSlice.actions.addCategoryToDisplayedIds({
          childId: inMemoryCategory.id,
          parentId: parentCategoryId
        })
      );
    }

    const checked = selectCategoryChecked(state, parentCategoryId);
    if (checked === true) {
      dispatch(
        categoriesSlice.actions.checkMultiple({
          ids: data.map((i) => i.id),
          state: true
        })
      );
    }

    return data;
  };

export const initializeExpandedCategories =
  (expandedCategoryIdsQuery: string): AppThunk<Promise<boolean>> =>
  async (dispatch) => {
    const expandedCategoryIdsFromQuery = expandedCategoryIdsQuery.split(',');

    const lastCategoryId = expandedCategoryIdsFromQuery[expandedCategoryIdsFromQuery.length - 1];

    let actualCategoryIds: string[];

    try {
      const parentCategoriesOfLastCategory: Category[] = await dispatch(
        getMultipleCategoriesWithParentsByIds([lastCategoryId])
      );
      actualCategoryIds = parentCategoriesOfLastCategory
        .map((i) => i.parentCategoryId)
        .filter((i) => i);
      actualCategoryIds.push(lastCategoryId);
    } catch (error: any) {
      dispatch(categoriesSlice.actions.expandedCategoriesInitializedChanged(true));
      return false;
    }

    const categoryIdsEqual = compareSortedArray(actualCategoryIds, expandedCategoryIdsFromQuery);

    if (categoryIdsEqual) {
      dispatch(
        categoriesSlice.actions.setExpandedCategories([
          parentCategoryIdOfRoot,
          ...expandedCategoryIdsFromQuery
        ])
      );
    }

    dispatch(categoriesSlice.actions.expandedCategoriesInitializedChanged(true));
    return categoryIdsEqual;
  };

export const initializeBrandDialog =
  (querySelectedCategoryId: string, queryExpandedBrandId: string): AppThunk<Promise<boolean>> =>
  async (dispatch) => {
    try {
      const selectedCategory = await dispatch(refreshCategory(querySelectedCategoryId));
      if (selectedCategory.hasChildCategory) {
        return false;
      }

      if (queryExpandedBrandId) {
        const expandedBrand = await dispatch(getBrandById(queryExpandedBrandId));
        if (expandedBrand) {
          dispatch(expandBrand(expandedBrand));
        }
      }
    } catch (error) {
      return false;
    }

    dispatch(categorySelectedForBrand(querySelectedCategoryId));
    return true;
  };

export const refreshCategory =
  (id: string): AppThunk<Promise<Category>> =>
  async (dispatch) => {
    if (!id) {
      return undefined;
    }

    const requestBuilder = () => axios.get<Category>(`category/categories/${id}`);
    const data: Category = await dispatch(apiCaller(requestBuilder));
    dispatch(categoriesSlice.actions.updateCategory(data));

    return data;
  };

export const getMultipleCategoriesByIdsIfNecessary =
  (ids: string[]): AppThunk<Promise<Category[]>> =>
  async (dispatch, getState) => {
    const state = getState();
    let data = selectMultipleCategoriesByIds(state, ids);
    if (data.filter((i) => !i).length > 0) {
      const requestBuilder = () => axios.post<Category[]>('category/categories/basics', ids);
      data = await dispatch(apiCaller(requestBuilder));
      const categories = data.flatMap((i) => flattenCategoryTreeRecursively(i));
      dispatch(categoriesSlice.actions.updateCategories(categories));
    }

    return data;
  };

export const getMultipleCategoriesWithParentsByIds =
  (ids: string[]): AppThunk<Promise<Category[]>> =>
  async (dispatch) => {
    const requestBuilder = () => axios.post<Category[]>('category/categories/parents', ids);
    const data = await dispatch(apiCaller(requestBuilder));
    const categories = data.flatMap((i) => flattenCategoryTreeRecursively(i));
    dispatch(categoriesSlice.actions.updateCategories(categories));

    return data;
  };

const addCategory =
  (category: Category, inMemory: boolean): AppThunk<Promise<Category>> =>
  async (dispatch, getState) => {
    let finalCategory: Category;
    if (inMemory) {
      const parentCategory = selectCategoryById(getState(), category.parentCategoryId);
      finalCategory = {
        ...category,
        hasChildCategory: false,
        id: uuid(),
        inMemory: true,
        level: parentCategory ? parentCategory.level + 1 : 0
      };
    } else {
      const requestBuilder = () => axios.post<Category>('category/categories', category);
      finalCategory = await dispatch(apiCaller(requestBuilder));
    }

    dispatch(categoriesSlice.actions.addCategory(finalCategory));

    if (inMemory) {
      dispatch(
        categoriesSlice.actions.removeCategoryIdFromDisplayedIds({
          childId: temporaryCategoryId,
          parentId: finalCategory.parentCategoryId
        })
      );

      dispatch(
        categoriesSlice.actions.addCategoryToDisplayedIds({
          childId: finalCategory.id,
          parentId: finalCategory.parentCategoryId
        })
      );

      dispatch(categoriesSlice.actions.setSelectedCategory(finalCategory.id));
    }

    return finalCategory;
  };

export const addEmptyCategory =
  (parentCategoryId: string): AppThunk =>
  async (dispatch) => {
    dispatch(categoriesSlice.actions.addEmptyCategory(parentCategoryId));
    dispatch(
      categoriesSlice.actions.addCategoryToDisplayedIds({
        childId: temporaryCategoryId,
        parentId: parentCategoryId
      })
    );
  };

const updateCategory =
  (category: Category): AppThunk<Promise<Category>> =>
  async (dispatch) => {
    let finalCategory = category;
    if (!category.inMemory) {
      const requestBuilder = () =>
        axios.put<Category>(`category/categories/${category.id}`, category);
      finalCategory = await dispatch(apiCaller(requestBuilder));
    }

    dispatch(categoriesSlice.actions.updateCategory(finalCategory));
    return finalCategory;
  };

export const upsertCategory =
  (category: Category, inMemory: boolean = false): AppThunk<Promise<Category>> =>
  async (dispatch, getState) => {
    let finalCategory;
    const addMode = category.id === temporaryCategoryId;
    if (addMode) {
      finalCategory = await dispatch(addCategory(category, inMemory));
    } else {
      finalCategory = await dispatch(updateCategory(category));
    }

    const parent = selectCategoryById(getState(), category.parentCategoryId);

    dispatch(expandCategory(parent, true));
    if (!inMemory) {
      await dispatch(getCategories(parent?.id ?? parentCategoryIdOfRoot));
      dispatch(refreshCategory(category.parentCategoryId));

      if (addMode) {
        dispatch(showAddSuccessSnackbar());
      } else {
        dispatch(showUpdateSuccessSnackbar());
      }
    }

    return finalCategory;
  };

const fillRemoveIdsRecursively = (state: RootState, categoryId: string): string[] => {
  let finalIds = [categoryId];
  const childIds = selectDisplayedCategoryIdsByParentId(state, categoryId);

  childIds.forEach((childId) => {
    finalIds = [...finalIds, ...fillRemoveIdsRecursively(state, childId)];
  });

  return finalIds;
};

export const removeCategory =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    const category = selectCategoryById(state, id);

    if (id === temporaryCategoryId) {
      dispatch(
        categoriesSlice.actions.removeCategoryIdFromDisplayedIds({
          childId: temporaryCategoryId,
          parentId: category?.parentCategoryId ?? parentCategoryIdOfRoot
        })
      );
      dispatch(categoriesSlice.actions.deleteTemporaryCategory());
      return;
    }

    if (selectIsCategoryInSession(state, id)) {
      await dispatch(removeInSessionCategory(id));

      return;
    }

    let removeIds: string[] = [];
    if (!category.inMemory) {
      if (category.parentCategoryId) {
        const requestBuilder = () =>
          axios.delete<Category>('category/categories', {
            data: {
              categoryIds: [id]
            }
          });
        await dispatch(apiCaller(requestBuilder));
      } else {
        const requestBuilder = () => axios.delete(`category/main-categories/${category.id}`);
        await dispatch(apiCaller(requestBuilder));
      }
    }
    removeIds = fillRemoveIdsRecursively(state, id);

    removeIds.forEach((removeId) => {
      const selected = selectIsCategorySelected(state, removeId);
      if (selected) {
        dispatch(categoriesSlice.actions.clearSelectedCategory());
      }

      const deletedCategory = selectCategoryById(state, removeId);
      dispatch(
        categoriesSlice.actions.removeCategoryIdFromDisplayedIds({
          childId: deletedCategory.id,
          parentId: deletedCategory.parentCategoryId
        })
      );
    });

    dispatch(categoriesSlice.actions.deleteCategories(removeIds));

    if (!category.inMemory) {
      dispatch(refreshCategory(category.parentCategoryId));
      dispatch(showDeleteSuccessSnackbar());
    }
  };

const removeInSessionCategory =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    dispatch(categoriesSlice.actions.clearSelectedCategory());

    const allChildrenIds = fillRemoveIdsRecursively(state, id);
    const inSessionIds: string[] = [];
    allChildrenIds.forEach((id) => {
      const child = selectCategoryById(state, id);
      if (child.inMemory) {
        dispatch(removeCategory(child.id));
      } else {
        inSessionIds.push(child.id);
      }
    });

    dispatch(categoriesSlice.actions.addToInSessionRemovedIdsMultiple(inSessionIds.reverse()));
  };

export const removeCategories =
  (parentId: string): AppThunk =>
  async (dispatch, getState) => {
    const currentState = getState();
    const checkedCategoryIds = selectDisplayedCheckedCategoryIdsByParentId(currentState, parentId);
    const requestBuilder = () =>
      axios.delete<Category>('category/categories', {
        data: {
          categoryIds: checkedCategoryIds
        }
      });
    await dispatch(apiCaller(requestBuilder));
    checkedCategoryIds.forEach((id) => {
      const deletedCategory = selectCategoryById(currentState, id);
      dispatch(
        categoriesSlice.actions.removeCategoryIdFromDisplayedIds({
          childId: deletedCategory.id,
          parentId: deletedCategory.parentCategoryId
        })
      );
    });

    dispatch(categoriesSlice.actions.deleteCategories(checkedCategoryIds));
    dispatch(refreshCategory(parentId));
    dispatch(showDeleteSuccessSnackbar());
  };

export const checkAllCategoriesInGroup =
  (parentCategoryId: string): AppThunk =>
  async (dispatch, getState) => {
    const currentState = getState();
    const allChecked = selectIsAllDisplayedCategoriesCheckedByParentId(
      currentState,
      parentCategoryId
    );

    const allIds = selectCategoryIdsByParentId(currentState, parentCategoryId);

    allIds.forEach((id) => {
      const category = selectCategoryById(currentState, id);
      if (allChecked) {
        dispatch(checkCategory(category, false));
      } else {
        dispatch(checkCategory(category, true));
      }
    });
  };

export const checkCategory =
  (category: Category, checkTo?: CheckboxState): AppThunk =>
  async (dispatch, getState) => {
    let checkboxState: CheckboxState = false;
    const state = getState();

    if (checkTo) {
      checkboxState = checkTo;
    } else if (selectCategoryChecked(getState(), category.id) !== true) {
      checkboxState = true;
    } else {
      checkboxState = false;
    }

    dispatch(
      categoriesSlice.actions.check({
        id: category.id,
        state: checkboxState
      })
    );

    const childrenIds = selectCategoryIdsByParentId(state, category.id);
    dispatch(checkChildrenRecursively(childrenIds, checkboxState));

    dispatch(checkAncestorsRecursively(category.parentCategoryId));
  };

export const checkMultipleCategories =
  (ids: string[]): AppThunk =>
  async (dispatch, getState) => {
    dispatch(
      categoriesSlice.actions.checkMultiple({
        ids,
        state: true
      })
    );

    const state = getState();
    ids.forEach((id) => {
      const category = selectCategoryById(state, id);
      dispatch(checkAncestorsRecursively(category.parentCategoryId));
    });
  };

const checkChildrenRecursively =
  (childrenIds: string[], checkboxState: CheckboxState): AppThunk =>
  async (dispatch, getState) => {
    if (childrenIds.length > 0) {
      const state = getState();
      dispatch(
        categoriesSlice.actions.checkMultiple({
          ids: childrenIds,
          state: checkboxState
        })
      );
      childrenIds.forEach((id) => {
        const subIds = selectCategoryIdsByParentId(state, id);
        dispatch(checkChildrenRecursively(subIds, checkboxState));
      });
    }
  };

const checkAncestorsRecursively =
  (parentCategoryId: string): AppThunk =>
  async (dispatch, getState) => {
    if (parentCategoryId) {
      const state = getState();
      const parentCategory = selectCategoryById(state, parentCategoryId);
      const childrenIds = selectCategoryIdsByParentId(state, parentCategoryId);
      const checkedIds = selectCheckedCategoryIdsByParentId(state, parentCategoryId);
      const indeterminateIds = selectIndeterminateCategoryIdsByParentId(state, parentCategoryId);

      const childrenCount = parentCategory.childCount ?? childrenIds.length;
      let parentCheckboxState: CheckboxState = false;

      switch (checkedIds.length) {
        case 0:
          if (indeterminateIds.length > 0) {
            parentCheckboxState = 'indeterminate';
          } else {
            parentCheckboxState = false;
          }
          break;
        case childrenCount:
          parentCheckboxState = true;
          break;
        default:
          parentCheckboxState = 'indeterminate';
          break;
      }
      dispatch(
        categoriesSlice.actions.check({
          id: parentCategory.id,
          state: parentCheckboxState
        })
      );

      dispatch(checkAncestorsRecursively(parentCategory.parentCategoryId));
    }
  };

export const disableCategories =
  (ids: string[]): AppThunk =>
  async (dispatch, getState) => {
    const set = new Set<string>();
    dispatch(disableMultipleDownwardsRecursively(ids, true));

    const state = getState();
    ids.forEach((id) => {
      if (id) {
        const category = selectCategoryById(state, id);
        const ancestorIds = dispatch(getAncestorIdsRecursively(category.parentCategoryId));
        ancestorIds.forEach((i) => set.add(i));
      }
    });

    dispatch(
      categoriesSlice.actions.disableMultiple({
        ids: Array.from(set),
        state: 'checkDisabled'
      })
    );
  };

const disableMultipleDownwardsRecursively =
  (ids: string[], disabledState: DisabledState = true): AppThunk =>
  async (dispatch, getState) => {
    if (ids.length > 0) {
      dispatch(
        categoriesSlice.actions.disableMultiple({
          ids,
          state: disabledState
        })
      );

      const state = getState();

      ids.forEach((id) => {
        const childrenIds = selectCategoryIdsByParentId(state, id);
        dispatch(disableMultipleDownwardsRecursively(childrenIds, disabledState));
      });
    }
  };

const getAncestorIdsRecursively =
  (parentCategoryId: string): AppThunk<string[]> =>
  (dispatch, getState) => {
    if (parentCategoryId) {
      const state = getState();
      const parentCategory = selectCategoryById(state, parentCategoryId);

      const ancestorIds = dispatch(getAncestorIdsRecursively(parentCategory.parentCategoryId));
      return [parentCategoryId, ...ancestorIds];
    }
    return [];
  };

export const getGroupedCheckedCategoryIds =
  (checkedCategoryIds: string[]): AppThunk<string[]> =>
  (dispatch, getState) => {
    const state = getState();
    const set = new Set(checkedCategoryIds);
    const groupedCheckedCategoryIds: string[] = [];
    checkedCategoryIds.forEach((id) => {
      const category = selectCategoryById(state, id);
      if (!set.has(category.parentCategoryId)) {
        groupedCheckedCategoryIds.push(id);
      }
    });

    return groupedCheckedCategoryIds;
  };

export const moveCategories =
  (sourceCategoryId: string, destinationCategoryId: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setDraggingCategoryId());
    const state = getState();
    const sourceCategory = selectCategoryById(state, sourceCategoryId);
    const sourceParentId = sourceCategory.parentCategoryId;

    const selectedCategoryIds = selectDisplayedCheckedCategoryIdsByParentId(state, sourceParentId);
    if (selectedCategoryIds.length === 0) {
      selectedCategoryIds.push(sourceCategoryId);
    }

    if (selectedCategoryIds.includes(destinationCategoryId)) {
      return;
    }

    const requestBuilder = () =>
      axios.put<Category[]>('category/categories/move', {
        destinationCategoryId,
        movingCategoryIds: selectedCategoryIds
      });
    const categories = selectedCategoryIds.map((id) => selectCategoryById(state, id));
    const newCategories = categories.map((c) => {
      const newCategory: Category = {
        ...c,
        parentCategoryId: destinationCategoryId
      };
      return newCategory;
    });

    try {
      dispatch(categoriesSlice.actions.updateCategories(newCategories));
      const updatedCategories = await dispatch(apiCaller(requestBuilder));
      dispatch(categoriesSlice.actions.updateCategories(updatedCategories));

      // Update its group
      dispatch(getCategories(sourceCategory.parentCategoryId));

      dispatch(refreshCategory(destinationCategoryId));
      dispatch(refreshCategory(sourceCategory.parentCategoryId));
    } catch (error) {
      dispatch(categoriesSlice.actions.updateCategories(categories));
      throw error;
    }
  };

export const expandCategory =
  (category: Category, expand: boolean): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    if (expand) {
      dispatch(categoriesSlice.actions.expandCategory(category));

      if (selectIsCategorySelected(state, category?.id)) {
        dispatch(categoriesSlice.actions.clearSelectedCategory());
      }
    } else {
      dispatch(categoriesSlice.actions.collapseCategory(category));
    }
  };

export const setSelectedCategory =
  (category: Category): AppThunk =>
  async (dispatch, _getState) => {
    if (category) {
      dispatch(categoriesSlice.actions.collapseCategory(category));
      dispatch(categoriesSlice.actions.setSelectedCategory(category.id));
    } else {
      dispatch(categoriesSlice.actions.setSelectedCategory(undefined));
    }
  };

export const expandAllCategoryTreeByLeafCategory =
  (category: Category): AppThunk =>
  async (dispatch, _getState) => {
    const flattenCategoryIdTreeRecursively = (node: Category): string[] => {
      if (!node) {
        return [parentCategoryIdOfRoot];
      }

      const temp = flattenCategoryIdTreeRecursively(node.parentCategory);

      if (node === category) {
        return temp;
      }

      return [...temp, node.id];
    };

    const arr = flattenCategoryIdTreeRecursively(category);
    dispatch(categoriesSlice.actions.setExpandedCategories(arr));
  };

export const getCategoryWithAncestors =
  (categoryId: string, stopOnInMemory = false): AppThunk<Promise<Category>> =>
  async (dispatch, getState) => {
    const state = getState();
    const getCategoryWithAncestorsRecursively = (id: string): Category => {
      if (!id) {
        return undefined;
      }

      const category = {
        ...selectCategoryById(state, id)
      };

      category.parentCategory =
        stopOnInMemory && !category.inMemory
          ? null
          : getCategoryWithAncestorsRecursively(category.parentCategoryId);

      return category;
    };

    const category = getCategoryWithAncestorsRecursively(categoryId);
    return category;
  };

export const deleteInMemoryCategories = (): AppThunk => async (dispatch, getState) => {
  const categories = selectInMemoryCategories(getState()) as Category[];
  const categoryIds = categories.map((i) => i.id);
  categories.forEach((c) => {
    dispatch(
      categoriesSlice.actions.removeCategoryIdFromDisplayedIds({
        childId: c.id,
        parentId: c.parentCategoryId
      })
    );
  });

  dispatch(categoriesSlice.actions.deleteCategories(categoryIds));
};

export const cancelCategorySelectionForTask =
  (previousCategory: Category): AppThunk =>
  async (dispatch) => {
    const getInMemoryAncestorsRecursively = (node: Category): Category[] => {
      if (!node || !node.inMemory) {
        return [];
      }
      const temp = getInMemoryAncestorsRecursively(node.parentCategory);

      return [...temp, node];
    };

    const inMemoryAncestors = getInMemoryAncestorsRecursively(previousCategory).map((i) => ({
      ...i,
      parentCategory: undefined
    }));

    dispatch(deleteInMemoryCategories());
    dispatch(categoriesSlice.actions.setSelectedCategory(previousCategory?.id));
    dispatch(categoriesSlice.actions.updateCategories(inMemoryAncestors));
  };

export const cancelCategorySelectionForAsset =
  (previousCategory: Category): AppThunk =>
  async (dispatch) => {
    dispatch(deleteInMemoryCategories());
    dispatch(categoriesSlice.actions.setSelectedCategory(previousCategory?.id));
    dispatch(categoriesSlice.actions.clearInSessionRemovedCategories());
  };

export const getMultipleCategoriesByIdsFromStore =
  (ids: string[]): AppThunk<Category[]> =>
  (dispatch, getState) => {
    const state = getState();
    const entities = selectEntities(state);

    return ids.map((id) => entities[id]);
  };

export const getMainCategoryIdFromCategoryRecursively = (category: Category): string => {
  if (!category) {
    return null;
  }

  if (!category.parentCategory) {
    return category.id;
  }

  return getMainCategoryIdFromCategoryRecursively(category.parentCategory);
};

export const getMainCategoryAssociate =
  (categoryId: string): AppThunk<Promise<AssociateItems>> =>
  async (dispatch) => {
    const requestBuilder = () => axios.get(`category/main-categories/${categoryId}/any-associate`);
    const data = await dispatch(apiCaller(requestBuilder));
    return data;
  };
