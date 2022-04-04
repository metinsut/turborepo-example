import { AppThunk } from 'RootTypes';
import { AssetImport, ImportStatus } from '../types';
import { apiCaller } from 'store/common';
import { getAssetImport, getStatus } from './slice';
import { selectCategoryById } from 'store/slices/categories/selectors';
import axios from 'utils/axiosUtils';
import saveAs from 'file-saver';

export const getAssetImportTemplateByCategoryId =
  (categoryId: string): AppThunk =>
  async (dispatch, getState) => {
    const requestBuilder = () =>
      axios.get<Blob>(`assetImportTemplate?categoryId=${categoryId}`, {
        responseType: 'arraybuffer'
      });
    const data = await dispatch(apiCaller(requestBuilder));
    const currentState = getState();
    const category = selectCategoryById(currentState, categoryId);

    const blob = new Blob([data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    saveAs(blob, `AssetImport${category.name}Template.xlsx`);
  };

export const postAssetImportFile =
  (importFile: File): AppThunk =>
  async (dispatch) => {
    const requestBuilder = () => axios.post<AssetImport>('assetImport', importFile);
    const data = await dispatch(apiCaller(requestBuilder));

    dispatch(getAssetImport(data));
  };

export const getAssetImportStatusById =
  (importId: string): AppThunk =>
  async (dispatch) => {
    const requestBuilder = () => axios.get<ImportStatus>(`assetImport/${importId}/status`);
    const data = await dispatch(apiCaller(requestBuilder));

    dispatch(getStatus(data));
  };

export const getAssetImportInvalidEntries =
  (importId: string): AppThunk =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<Blob>(`assetImport/${importId}/invalid`, { responseType: 'arraybuffer' });
    const data = await dispatch(apiCaller(requestBuilder));

    const blob = new Blob([data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    saveAs(blob, `invalid_entries_/${importId}/.xlsx`);
  };

export function checkAssetImportStatusIsOnProgress(assetImport: AssetImport) {
  return assetImport.state === 'confirmed' || assetImport.state === 'validationCheck';
}
