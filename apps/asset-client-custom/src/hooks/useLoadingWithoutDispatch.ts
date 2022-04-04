import { useMountedState } from 'react-use';
import React, { useCallback } from 'react';

function isPromise(promise: any) {
  return !!promise && typeof promise.then === 'function';
}

type ReturnType<T> = (promise: T | Promise<T>) => Promise<T>;

export default function useLoadingWithoutDispatch<T>(): [boolean, ReturnType<T>] {
  const [loading, setLoading] = React.useState(false);
  const getIsMounted = useMountedState();

  const promiseWrapper = useCallback(
    async (promise: T | Promise<T>): Promise<T> => {
      if (isPromise(promise)) {
        setLoading(true);
        let data: T;
        try {
          data = await promise;
        } finally {
          if (getIsMounted()) {
            setLoading(false);
          }
        }

        return data;
      }

      return promise;
    },
    [getIsMounted]
  );
  return [loading, promiseWrapper];
}
