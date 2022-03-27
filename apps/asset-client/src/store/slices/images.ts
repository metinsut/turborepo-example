import { AppThunk } from 'RootTypes';
import { apiCaller } from 'store/common';
import axios from 'utils/axiosUtils';

export const getImage =
  (imagePath: string): AppThunk<Promise<string>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<string>(`category/${imagePath}`, { responseType: 'arraybuffer' });
    const data = await dispatch(apiCaller(requestBuilder));
    const blob = new Blob([data]);
    const image = URL.createObjectURL(blob);

    return image;
  };
