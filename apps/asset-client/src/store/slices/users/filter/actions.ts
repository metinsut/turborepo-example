import { AppThunk } from 'RootTypes';
import { PagedResult, apiCaller } from 'store/common';
import axios from 'utils/axiosUtils';

const fetchJobTitles =
  (searchText: string, page = 1, size = 400): AppThunk<Promise<string[]>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<PagedResult<string>>(
        `recommendation/user/job-title/search?text=${searchText}&page=${page}&size=${size}`
      );
    const results = await dispatch(apiCaller(requestBuilder));
    return results.items;
  };

export { fetchJobTitles };
