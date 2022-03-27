import { AppThunk } from 'RootTypes';
import { useMountedState } from 'react-use';
import { useTypedDispatch } from './useTypedDispatch';
import React, { useCallback } from 'react';

type ReturnType<T> = (promise: AppThunk<Promise<T>>) => Promise<T>;

type Props = {
  initialState?: boolean;
  delay?: number;
};

export default function useLoading<T>(props?: Props): [boolean, ReturnType<T>] {
  const { initialState = false, delay = 0 } = props ?? {};
  const [loading, setLoading] = React.useState(initialState);
  const getIsMounted = useMountedState();
  const dispatch = useTypedDispatch();

  const dispatchWithLoading = useCallback(
    async (promise: AppThunk<Promise<T>>): Promise<T> => {
      setLoading(true);
      let data: T;
      try {
        data = await dispatch(promise);
      } finally {
        setTimeout(() => {
          if (getIsMounted()) {
            setLoading(false);
          }
        }, delay);
      }

      return data;
    },
    [delay, dispatch, getIsMounted]
  );

  return [loading, dispatchWithLoading];
}
