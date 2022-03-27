import { AppThunk, RootState } from 'RootTypes';
import { apiCaller } from 'store/common';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import {
  showAddSuccessSnackbar,
  showDeleteSuccessSnackbar,
  showUpdateSuccessSnackbar
} from 'store/slices/application';
import axios from 'utils/axiosUtils';

export type BreakdownType = {
  id?: string;
  name: string;
  disabled?: boolean;
};

export const maxBreakdownTypeNumber = 9;

const adapter = createEntityAdapter<BreakdownType>();

const slice = createSlice({
  initialState: adapter.getInitialState(),
  name: 'breakdownType',
  reducers: {
    removeAll: adapter.removeAll,
    setAll: adapter.setAll
  }
});

export const getBreakdownTypes =
  (mainCategoryId: string): AppThunk<Promise<BreakdownType[]>> =>
  async (dispatch) => {
    dispatch(slice.actions.removeAll());
    return dispatch(refreshBreakdownTypes(mainCategoryId));
  };

export const refreshBreakdownTypes =
  (mainCategoryId: string): AppThunk<Promise<BreakdownType[]>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<BreakdownType[]>(`breakdown/breakdowntypes?mainCategoryId=${mainCategoryId}`);

    const breakdownTypes = await dispatch(apiCaller(requestBuilder));

    dispatch(slice.actions.setAll(breakdownTypes));
    return breakdownTypes;
  };

export const addBreakdownType =
  (mainCategoryId: string, type: BreakdownType): AppThunk<Promise<BreakdownType>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.post<BreakdownType>(`breakdown/breakdowntypes`, {
        ...type,
        mainCategoryId
      });

    const addedBreakdownType = await dispatch(apiCaller(requestBuilder));

    await dispatch(refreshBreakdownTypes(mainCategoryId));
    dispatch(showAddSuccessSnackbar());
    return addedBreakdownType;
  };

export const updateBreakdownType =
  (mainCategoryId: string, type: BreakdownType): AppThunk<Promise<BreakdownType>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.put<BreakdownType>(`breakdown/breakdowntypes/${type.id}`, type);

    const updatedBreakdownType = await dispatch(apiCaller(requestBuilder));

    await dispatch(refreshBreakdownTypes(mainCategoryId));
    dispatch(showUpdateSuccessSnackbar());

    return updatedBreakdownType;
  };

export const deleteBreakdownType =
  (mainCategoryId: string, id: string): AppThunk =>
  async (dispatch) => {
    const requestBuilder = () => axios.delete<BreakdownType>(`breakdown/breakdowntypes/${id}`);

    await dispatch(apiCaller(requestBuilder));

    await dispatch(refreshBreakdownTypes(mainCategoryId));
    dispatch(showDeleteSuccessSnackbar());
  };

export const {
  selectById: selectBreakdownTypeById,
  selectIds: selectAllBreakdownTypeIds,
  selectAll: selectAllBreakdownTypes
} = adapter.getSelectors<RootState>((state) => state.taskConfiguration.breakdown.breakdownType);

export default slice.reducer;
