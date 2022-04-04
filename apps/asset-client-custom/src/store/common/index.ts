import { AppThunk, RootState } from 'RootTypes';
import { AxiosResponse } from 'axios';
import { ERROR401 } from 'routes/constant-route';
import { createSelectorCreator, defaultMemoize } from 'reselect';
import { dequal } from 'dequal';
import { history } from 'utils/history';
import { showSnackbarMessage } from 'store/slices/application';
import { silentRefresh } from 'store/slices/session';
import axios from 'utils/axiosUtils';

type ErrorStatusCodes = 400 | 401 | 404 | 500;

type CallProps = {
  autoFetchAfterCreateOrUpdate?: boolean;
  autoHandleExceptions?: ErrorStatusCodes[];
};

type PromiseBuilder<T> = () => Promise<AxiosResponse<T>>;

export const apiCaller =
  <T>(promiseBuilder: PromiseBuilder<T>, props: CallProps = {}): AppThunk<Promise<T>> =>
  async (dispatch) => {
    const { autoFetchAfterCreateOrUpdate = true, autoHandleExceptions = [] } = props;
    try {
      // Make call
      return await makeRequest(promiseBuilder, autoFetchAfterCreateOrUpdate);
    } catch (error: any) {
      let errorToThrow = error;
      try {
        // Retry request
        return await dispatch(retryRequest(error, promiseBuilder, props));
      } catch (errorRetry: any) {
        // If anything goes wrong, throw it
        errorToThrow = errorRetry;
        if (errorRetry?.response.status === 401) {
          // User will be redirected to the 401 screen. Don't show the snackbar
          autoHandleExceptions.push(401);
        }
      }

      dispatch(handleError(errorToThrow, autoHandleExceptions));

      throw errorToThrow;
    }
  };

const retryRequest =
  <T>(
    errorRetry: any,
    promiseBuilder: PromiseBuilder<T>,
    props?: CallProps
  ): AppThunk<Promise<T>> =>
  async (dispatch) => {
    const { autoFetchAfterCreateOrUpdate = true } = props ?? {};

    let errorToThrow = errorRetry;

    // If it is not 401, don't retry
    if (errorRetry?.response?.status !== 401) {
      throw errorToThrow;
    }

    // Refresh token - main category - branches
    await dispatch(silentRefresh(false));
    try {
      // Retry after refresh
      return await makeRequest(promiseBuilder, autoFetchAfterCreateOrUpdate);
    } catch (error: any) {
      if (error?.response?.status === 401) {
        // Double 401, redirect to 401 page
        history.push(ERROR401);
      } else {
        // 4** - 5** after 401, throw it
        errorToThrow = error;
      }
    }

    throw errorToThrow;
  };

const handleError =
  (error: any, autoHandleExceptions: ErrorStatusCodes[]): AppThunk =>
  async (dispatch) => {
    if (error?.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */

      // If status code is marked as exception
      if (autoHandleExceptions.includes(error.response.status)) {
        return;
      }

      let message;
      const { title, detail } = error.response.data;
      try {
        const details = JSON.parse(detail);
        message = Object.values(details)[0] as string;
      } catch (innerError) {
        message = title ?? error.response.statusText;
      }

      dispatch(showSnackbarMessage(message ?? title, 'error'));
    } else {
      // Something happened in setting up the request and triggered an Error
      dispatch(showSnackbarMessage(error?.message ?? 'Unexpected Error', 'error'));
    }
  };

const makeRequest = async <T>(
  promiseBuilder: () => Promise<AxiosResponse<T>>,
  autoFetch: boolean
): Promise<T> => {
  let promiseBuilderInternal = promiseBuilder;

  const response = await promiseBuilderInternal();
  if (
    (response.status !== 201 && response.status !== 204) ||
    !response?.headers?.location ||
    !autoFetch
  ) {
    return response.data;
  }

  // Fetch data from location header
  promiseBuilderInternal = () => axios.get<T>(response.headers.location);

  const responseFromLocation = await promiseBuilderInternal();
  return responseFromLocation.data;
};

export function booleanCompare(x: boolean, y: boolean) {
  // eslint-disable-next-line no-nested-ternary
  return x === y ? 0 : x ? -1 : 1;
}

export function dateCompare(x: Date, y: Date) {
  // eslint-disable-next-line no-nested-ternary
  return x === y ? 0 : x > y ? -1 : 1;
}

export function numberCompare(x: number, y: number) {
  // eslint-disable-next-line no-nested-ternary
  return x === y ? 0 : x > y ? 1 : -1;
}

export const composeRootState = <T extends keyof RootState>(draft: RootState[T], prop: T): any => {
  const composedState: Partial<RootState> = {
    [prop]: draft
  };
  return composedState;
};

export const createDequalSelector = createSelectorCreator(defaultMemoize, dequal);

export type PagedRequestOptions = {
  page: number;
  size: number;
};

export type PagedResult<T> = {
  currentPage: number;
  items: T[];
  size: number;
  total: number;
};

export type File = {
  id?: string;
  name?: string;
  extension?: string;
};

export type Day =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export const daysOfWeek: Day[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

export type CheckboxState = boolean | 'indeterminate';

export const temporaryCategoryId = '-1';
export const temporaryBrandId = '-1';
export const temporaryModelId = '-1';
