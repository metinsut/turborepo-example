import { AppThunk, RootState } from 'RootTypes';
import { Metric } from '../detail/type';
import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { apiCaller } from 'store/common';
import axios from 'utils/axiosUtils';

const listAdapter = createEntityAdapter<Metric>();

const listSlice = createSlice({
  initialState: listAdapter.getInitialState(),
  name: 'metricConfigurationList',
  reducers: {
    metricsFetched: (draft, action: PayloadAction<Metric[]>) => {
      const metrics = action.payload;
      listAdapter.removeAll(draft);
      listAdapter.setAll(draft, metrics);
    }
  }
});

export const getAssetMetrics =
  (mainCategoryId: string): AppThunk<Promise<Metric[]>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<Metric[]>(`registration/assetmetrics/${mainCategoryId}/by-main-category`);
    const metrics = await dispatch(apiCaller(requestBuilder));
    dispatch(listSlice.actions.metricsFetched(metrics));
    return metrics;
  };

export const {
  selectById: selectMetricById,
  selectIds: selectAllMetricIds,
  selectAll: selectAllMetrics
} = listAdapter.getSelectors<RootState>((state) => state.metricsConfiguration.list);

export default listSlice.reducer;
