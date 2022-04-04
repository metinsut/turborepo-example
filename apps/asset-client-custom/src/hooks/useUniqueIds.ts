import { v4 as uuid } from 'uuid';
import React from 'react';

export const useUniqueIds = (size: number) => {
  const uniqueIds = React.useMemo(() => {
    const ids: string[] = [];
    for (let i = 0; i < size; i++) {
      ids.push(uuid());
    }

    return ids;
  }, [size]);
  return uniqueIds;
};
