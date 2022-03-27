import { AppThunk } from 'RootTypes';
import { SearchResultType } from './type';
import { apiCaller } from 'store/common';
import axios from 'utils/axiosUtils';

export const searchAsset =
  (searchText: string): AppThunk<Promise<SearchResultType[]>> =>
  async (dispatch) => {
    if (searchText) {
      const requestBuilder = () =>
        axios.post<SearchResultType[]>('registration/assets/search', {
          searchText
        });
      const results = await dispatch(apiCaller(requestBuilder));
      return results;
    }
    return [];
  };
