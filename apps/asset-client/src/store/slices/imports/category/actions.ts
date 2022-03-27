import { AppThunk } from 'RootTypes';
import { CategoryImport, ImportStatus } from '../types';
import { apiCaller } from 'store/common';
import { categoryImportsSlice } from './slice';
import { saveAs } from 'file-saver';
import { selectCategoryImport } from './selectors';
import { selectSessionUserId } from 'store/slices/session';
import axios from 'utils/axiosUtils';

export const getInvalidEntries =
  (importId: string): AppThunk =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<Blob>(`categoryImport/${importId}/invalid`, { responseType: 'arraybuffer' });
    const data = await dispatch(apiCaller(requestBuilder));

    const blob = new Blob([data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    saveAs(blob, `invalid_entries_/${importId}/.xlsx`);
  };

export const getCategoryImportTemplate = (): AppThunk => async (dispatch) => {
  const requestBuilder = () =>
    axios.get<Blob>('categoryImportTemplate', { responseType: 'arraybuffer' });
  const data = await dispatch(apiCaller(requestBuilder));

  const blob = new Blob([data], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });
  saveAs(blob, 'CategoryImportTemplate.xlsx');
};

export const getCategoryImportByUserId = (): AppThunk => async (dispatch, getState) => {
  const userId = selectSessionUserId(getState());
  const requestBuilder = () => axios.get<CategoryImport>(`categoryImport?userId=${userId}`);
  const data = await dispatch(apiCaller(requestBuilder));

  dispatch(categoryImportsSlice.actions.getCategoryImport(data));
};

export const getCategoryImportStatusById =
  (importId: string): AppThunk =>
  async (dispatch) => {
    const requestBuilder = () => axios.get<ImportStatus>(`categoryImport/${importId}/status`);
    const data = await dispatch(apiCaller(requestBuilder));

    dispatch(categoryImportsSlice.actions.getStatus(data));
  };

export const postCategoryImport =
  (importFile: File): AppThunk =>
  async (dispatch) => {
    const requestBuilder = () => axios.post<CategoryImport>('categoryImport', importFile);
    const data = await dispatch(apiCaller(requestBuilder));

    dispatch(categoryImportsSlice.actions.getCategoryImport(data));
  };

export const confirmCategoryImport = (): AppThunk => async (dispatch, getState) => {
  const categoryImport = { ...selectCategoryImport(getState()), status: 'confirmed' };

  const requestBuilder = () =>
    axios.put<CategoryImport>(`categoryImport/${categoryImport.id}`, categoryImport);
  const data = await dispatch(apiCaller(requestBuilder));

  dispatch(categoryImportsSlice.actions.getCategoryImport(data));
};

export const cancelCategoryImport = (): AppThunk => async (dispatch, getState) => {
  const categoryImport = selectCategoryImport(getState());

  if (categoryImport) {
    const requestBuilder = () =>
      axios.put<CategoryImport>(`categoryImpor/${categoryImport.id}/cancel`, categoryImport);
    await dispatch(apiCaller(requestBuilder));
  }

  dispatch(categoryImportsSlice.actions.clearCategoryImportStatus());
};

export function checkImportStatusIsOnProgress(categoryImport: CategoryImport) {
  return categoryImport.state === 'confirmed' || categoryImport.state === 'validationCheck';
}
