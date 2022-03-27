import { useMemo } from 'react';

const useCheckAllObjectValuesStatus = (object = {}, status: boolean) => {
  const isAllStatusTrue = useMemo(
    () => Object.values(object).every((i) => i === status),
    [object, status]
  );
  return isAllStatusTrue;
};

export { useCheckAllObjectValuesStatus };
