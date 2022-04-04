import { AppThunk, RootState } from 'RootTypes';
import { Brand } from './brands/types';
import { Category } from './categories/types';
import {
  Model,
  deleteInMemoryModels,
  deleteModelImage,
  updateModelImage,
  upsertModels
} from './models';
import { PayloadAction, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import { apiCaller } from 'store/common';
import { deleteInMemoryBrands } from './brands/actions';
import { deleteInMemoryCategories, getCategoryWithAncestors } from './categories/actions';
import { flattenCategoryTreeRecursively } from './categories/selectors';
import { updateCategories } from './categories/slice';
import { upsertBrands } from './brands/slice';
import axios from 'utils/axiosUtils';

export type ImageState = {
  file: File;
  imageStatus: 'idle' | 'changed' | 'deleted';
};

export interface CategoryTask {
  id?: string;
  brand?: Brand;
  brandId?: string;
  category?: Category;
  categoryId?: string;
  createdBy?: string;
  createdByUser?: string;
  createdDate?: string;
  model?: Model;
  modelId?: string;
  numberOfAssets?: number;
  status?: CategoryTaskStatus;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  company: string;
  position: string;
}

export type CategoryTaskStatus = 'Unapproved' | 'Approved' | 'Rejected' | 'Inconsistent';

const categoryTasksAdapter = createEntityAdapter<CategoryTask>();

export type FilterDateType = 'day' | 'week' | 'month' | 'all';

type CategoryTaskState = {
  displayedIds: string[];
  filter: {
    showCompleted?: boolean;
    intervalDateType?: FilterDateType;
  };
  taskIdInProgress?: string;
};

const initialState: CategoryTaskState = {
  displayedIds: [],
  filter: {
    intervalDateType: 'all',
    showCompleted: false
  }
};

const categoryTasksSlice = createSlice({
  initialState: categoryTasksAdapter.getInitialState(initialState),
  name: 'categoryTasks',
  reducers: {
    changeDateFilter: (draft, action: PayloadAction<FilterDateType>) => {
      draft.filter.intervalDateType = action.payload;
    },
    removeInProgressTaskIds: (draft) => {
      delete draft.taskIdInProgress;
    },
    setDisplayIds: (draft, action: PayloadAction<string[]>) => {
      draft.displayedIds = action.payload;
    },
    toggleShowComplete: (draft) => {
      draft.filter.showCompleted = !draft.filter.showCompleted;
      draft.filter.intervalDateType = draft.filter.showCompleted ? 'day' : 'all';
    },
    updateAssetCount: (draft, action: PayloadAction<{ id: string; assetCount: number }>) => {
      const { id, assetCount } = action.payload;
      draft.entities[id].numberOfAssets = assetCount;
    },
    updateTask: (draft, action: PayloadAction<CategoryTask>) => {
      const task = action.payload;

      if (task.status === 'Unapproved') {
        draft.taskIdInProgress = task.id;
      } else {
        delete draft.taskIdInProgress;
      }

      categoryTasksAdapter.upsertOne(draft, task);
    },
    upsertTasks: categoryTasksAdapter.upsertMany
  }
});

export const getCategoryTasks =
  (showComplete?: boolean, dateFilter?: FilterDateType): AppThunk =>
  async (dispatch, getState) => {
    let internalShowComplete = showComplete;
    let internalDateFilter = dateFilter;
    if (!showComplete || !dateFilter) {
      const state = getState();
      internalShowComplete = selectShowComplete(state);
      internalDateFilter = selectDateFilter(state);
    }

    const requestBuilder = () =>
      axios.get<CategoryTask[]>(
        `category/tasks?showCompleted=${internalShowComplete}&dateFilter=${internalDateFilter}`
      );
    const data = await dispatch(apiCaller(requestBuilder));

    const categories = data.flatMap((task) => flattenCategoryTreeRecursively(task.category));
    const brands = data.map((task) => task.brand);
    const models = data.map((task) => task.model);

    dispatch(upsertBrands(brands));
    dispatch(upsertModels(models));
    dispatch(updateCategories(categories));

    dispatch(categoryTasksSlice.actions.upsertTasks(data));
    dispatch(categoryTasksSlice.actions.setDisplayIds(data.map((i) => i.id)));
  };

export const getCategoryTaskById =
  (id: string): AppThunk<Promise<CategoryTask>> =>
  async (dispatch) => {
    const requestBuilder = () => axios.get<CategoryTask>(`category/tasks/${id}`);
    const task = await dispatch(apiCaller(requestBuilder));

    const categories = flattenCategoryTreeRecursively(task.category);
    dispatch(upsertBrands([task.brand]));
    dispatch(upsertModels([task.model]));
    dispatch(updateCategories(categories));

    return task;
  };

export const searchCategoryTask =
  (mainCategoryId: string, brandId: string, modelId: string): AppThunk<Promise<CategoryTask>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<CategoryTask>(
        `category/tasks/mainCategory/${mainCategoryId}/brand/${brandId}/model/${modelId}`
      );
    const task = await dispatch(apiCaller(requestBuilder, { autoHandleExceptions: [404] }));

    const categories = flattenCategoryTreeRecursively(task.category);
    dispatch(upsertBrands([task.brand]));
    dispatch(upsertModels([task.model]));
    dispatch(updateCategories(categories));

    return task;
  };

export const approveCategoryTask =
  (task: CategoryTask, imageState: ImageState): AppThunk =>
  async (dispatch) => {
    const taskCategory = await dispatch(getCategoryWithAncestors(task.category.id, true));
    const finalTask = {
      ...task,
      category: taskCategory
    };

    const requestBuilder = () =>
      axios.put<CategoryTask>(`category/tasks/${task.id}/approve`, finalTask);
    const data = await dispatch(apiCaller(requestBuilder));

    if (imageState.imageStatus === 'changed') {
      dispatch(updateModelImage(data.model.id, imageState.file));
    } else if (imageState.imageStatus === 'deleted') {
      dispatch(deleteModelImage(data.model.id));
    }

    dispatch(categoryTasksSlice.actions.updateTask(data));
    dispatch(removeInMemoryItems());
    await dispatch(getCategoryTasks());
  };

export const checkAssetCountOfCategoryTask =
  (id: string): AppThunk<Promise<number>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<{ assetCount: number }>(`registration/assets/categorybrandmodel/${id}/count`);
    const data = await dispatch(apiCaller(requestBuilder));

    dispatch(
      categoryTasksSlice.actions.updateAssetCount({
        assetCount: data.assetCount,
        id
      })
    );

    return data.assetCount;
  };

export const rejectCategoryTask =
  (task: CategoryTask): AppThunk =>
  async (dispatch) => {
    const requestBuilder = () => axios.put<CategoryTask>(`category/tasks/${task.id}/reject`);
    const data = await dispatch(apiCaller(requestBuilder));

    dispatch(categoryTasksSlice.actions.updateTask(data));

    dispatch(removeInMemoryItems());
    await dispatch(getCategoryTasks());
  };

const removeInMemoryItems = (): AppThunk => async (dispatch) => {
  dispatch(deleteInMemoryCategories());
  dispatch(deleteInMemoryBrands());
  dispatch(deleteInMemoryModels());
};

export const updateTaskCategory =
  (task: CategoryTask, categoryId: string): AppThunk =>
  async (dispatch) => {
    const category = await dispatch(getCategoryWithAncestors(categoryId));
    const taskToUpdate: CategoryTask = {
      ...task,
      category,
      categoryId
    };

    dispatch(categoryTasksSlice.actions.updateTask(taskToUpdate));
  };

export const getMainCategoryByTask = (task: CategoryTask): Category => {
  const categories = flattenCategoryTreeRecursively(task.category);
  return categories.find((i) => !i.parentCategoryId);
};

export const {
  selectAll: selectAllCategoryTasks,
  selectById: selectCategoryTaskById,
  selectEntities
} = categoryTasksAdapter.getSelectors<RootState>((state) => state.categoryTasks);

export const selectShowComplete = (state: RootState) => state.categoryTasks.filter.showCompleted;
export const selectDateFilter = (state: RootState) => state.categoryTasks.filter.intervalDateType;

export const selectDisplayedTaskIds = (state: RootState) => state.categoryTasks.displayedIds;

export const selectTaskIsEnabled = createSelector(
  (state: RootState) => state.categoryTasks.taskIdInProgress,
  selectCategoryTaskById,
  (taskIdInProgress, task) =>
    task.status !== 'Rejected' &&
    task.status !== 'Approved' &&
    (!taskIdInProgress || taskIdInProgress === task.id)
);

export const {
  changeDateFilter,
  removeInProgressTaskIds,
  toggleShowComplete,
  updateTask,
  upsertTasks
} = categoryTasksSlice.actions;

export default categoryTasksSlice.reducer;
