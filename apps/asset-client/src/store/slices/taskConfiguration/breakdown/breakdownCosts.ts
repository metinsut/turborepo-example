import { AppThunk, RootState } from 'RootTypes';
import { PayloadAction, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import { apiCaller } from 'store/common';
import { isArrayNullOrEmpty } from 'utils';
import {
  showAddSuccessSnackbar,
  showDeleteSuccessSnackbar,
  showUpdateSuccessSnackbar
} from 'store/slices/application';
import axios from 'utils/axiosUtils';

export type BreakdownCostType = {
  id?: string;
  name?: string;
  parentCostTypeId?: string;
  subCostTypes?: BreakdownCostType[];
};

type BreakdownCostStateShape = {
  expandedBreakdownCostIds: string[];
};
export const initialState: BreakdownCostStateShape = {
  expandedBreakdownCostIds: [null]
};

export const maxBreakdownCostNumber = 9;

const adapter = createEntityAdapter<BreakdownCostType>();

const slice = createSlice({
  initialState: adapter.getInitialState(initialState),
  name: 'breakdownCosts',
  reducers: {
    clearExpandedCostIds: (draft) => {
      draft.expandedBreakdownCostIds = [null];
    },
    collapseCostType: (draft) => {
      draft.expandedBreakdownCostIds.pop();
    },
    expandCostType: (draft, action: PayloadAction<BreakdownCostType>) => {
      if (draft.expandedBreakdownCostIds.length > 1) {
        draft.expandedBreakdownCostIds.pop();
      }
      draft.expandedBreakdownCostIds.push(action.payload.id);
    },
    removeAll: adapter.removeAll,
    setAll: adapter.setAll,
    setByParentId: (
      draft,
      action: PayloadAction<{ parentId: string; subCostTypes: BreakdownCostType[] }>
    ) => {
      const { parentId, subCostTypes } = action.payload;
      const parentCostType = draft.entities[parentId];
      parentCostType.subCostTypes = subCostTypes;
    }
  }
});

export const getBreakdownCostTypes =
  (mainCategoryId: string): AppThunk<Promise<BreakdownCostType[]>> =>
  (dispatch) => {
    dispatch(slice.actions.removeAll());
    dispatch(slice.actions.clearExpandedCostIds());
    return dispatch(refreshBreakdownCostTypes(mainCategoryId));
  };

export const refreshBreakdownCostTypes =
  (
    mainCategoryId: string,
    parentCostTypeId: string = undefined
  ): AppThunk<Promise<BreakdownCostType[]>> =>
  async (dispatch) => {
    let costTypes: BreakdownCostType[];
    if (parentCostTypeId) {
      costTypes = await dispatch(
        refreshBreakdownCostTypesByParentId(mainCategoryId, parentCostTypeId)
      );
    } else {
      costTypes = await dispatch(refreshAllBreakdownCostTypes(mainCategoryId));
    }

    return costTypes;
  };

const refreshAllBreakdownCostTypes =
  (mainCategoryId: string): AppThunk<Promise<BreakdownCostType[]>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<BreakdownCostType[]>(
        `breakdown/breakdowncosttypes?mainCategoryId=${mainCategoryId}`
      );

    const breakdownCosts = await dispatch(apiCaller(requestBuilder));

    dispatch(slice.actions.setAll(breakdownCosts));
    return breakdownCosts;
  };

const refreshBreakdownCostTypesByParentId =
  (mainCategoryId: string, parentCostTypeId: string): AppThunk<Promise<BreakdownCostType[]>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<BreakdownCostType[]>(
        `breakdown/breakdowncosttypes/by-parent?mainCategoryId=${mainCategoryId}&parentId=${parentCostTypeId}`
      );

    const breakdownCosts = await dispatch(apiCaller(requestBuilder));

    dispatch(
      slice.actions.setByParentId({
        parentId: parentCostTypeId,
        subCostTypes: breakdownCosts
      })
    );

    return breakdownCosts;
  };

export const addBreakdownCostType =
  (
    mainCategoryId: string,
    parentCostTypeId: string,
    costType: BreakdownCostType
  ): AppThunk<Promise<BreakdownCostType>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.post<BreakdownCostType>(`breakdown/breakdowncosttypes`, {
        ...costType,
        mainCategoryId,
        parentCostTypeId
      });

    const addedBreakdownCost = await dispatch(apiCaller(requestBuilder));
    if (!addedBreakdownCost.parentCostTypeId) {
      dispatch(slice.actions.clearExpandedCostIds());
    }

    await dispatch(refreshBreakdownCostTypes(mainCategoryId, parentCostTypeId));
    dispatch(showAddSuccessSnackbar());
    return addedBreakdownCost;
  };

export const updateBreakdownCostType =
  (mainCategoryId: string, costType: BreakdownCostType): AppThunk<Promise<BreakdownCostType>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.put<BreakdownCostType>(`breakdown/breakdowncosttypes/${costType.id}`, costType);

    const updatedCostType = await dispatch(apiCaller(requestBuilder));

    await dispatch(refreshBreakdownCostTypes(mainCategoryId, updatedCostType.parentCostTypeId));
    dispatch(showUpdateSuccessSnackbar());

    return updatedCostType;
  };

export const deleteBreakdownCostType =
  (mainCategoryId: string, id: string): AppThunk =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.delete<BreakdownCostType>(`breakdown/breakdowncosttypes/${id}`);

    await dispatch(apiCaller(requestBuilder));

    await dispatch(refreshBreakdownCostTypes(mainCategoryId));
    dispatch(showDeleteSuccessSnackbar());
  };

export const expandCostType =
  (costType: BreakdownCostType, expand: boolean): AppThunk =>
  async (dispatch) => {
    if (expand) {
      dispatch(slice.actions.expandCostType(costType));
    } else {
      dispatch(slice.actions.collapseCostType());
    }
  };

export const {
  selectById: selectBreakdownCostTypeById,
  selectIds: selectAllBreakdownCostTypeIds,
  selectAll: selectAllBreakdownCostTypes
} = adapter.getSelectors<RootState>((state) => state.taskConfiguration.breakdown.breakdownCost);

export const selectBreakdownCostTypesByParentId = (state: RootState, parentId: string) => {
  if (!parentId) {
    return selectAllBreakdownCostTypes(state);
  }
  const parent = selectBreakdownCostTypeById(state, parentId);

  return parent?.subCostTypes;
};

export const selectCostTypeDisplayValue = (state: RootState, costType: BreakdownCostType) => {
  if (!costType) {
    return '';
  }

  if (costType.parentCostTypeId) {
    const parent = selectBreakdownCostTypeById(state, costType.parentCostTypeId);
    return `${parent.name} > ${costType.name}`;
  }

  const detailedCost = selectBreakdownCostTypeById(state, costType.id);

  if (isArrayNullOrEmpty(detailedCost?.subCostTypes)) {
    return costType.name;
  }

  return '';
};

export const selectExpandedCostTypeIds = (state: RootState) =>
  state.taskConfiguration.breakdown.breakdownCost.expandedBreakdownCostIds;

export const selectCostTypeIsExpanded = createSelector(
  selectExpandedCostTypeIds,
  (state: RootState, id: string) => id,
  (expandedIds, id) => expandedIds.includes(id)
);

export default slice.reducer;
