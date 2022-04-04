import { dequal } from 'dequal';
import { useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

const useFindObjectChangesCount = <T,>(initialObject: T, changedObject: T, expectKeys?: any) => {
  const object = useFindObjectsChangedFields(initialObject, changedObject, expectKeys);
  const count = Object.values(object).filter((item) => !!item).length;
  return count;
};

const useFindObjectsChangedFields = <T,>(
  initialObject: T,
  changedObject: T,
  expectKeys: any = []
) => {
  const [object, setObject] = useState<Partial<Record<keyof T, boolean>>>({});
  useDeepCompareEffect(() => {
    const newObject: Partial<Record<keyof T, boolean>> = {};
    const changedObjectKeys = Object.keys(changedObject);

    changedObjectKeys.forEach((objectKey) => {
      const key = objectKey as keyof T;
      if (!dequal(changedObject[key], initialObject[key])) {
        if (!expectKeys.includes(key)) {
          newObject[key] = true;
        }
      } else if (!expectKeys.includes(key)) {
        newObject[key] = false;
      }
    });
    setObject(newObject);
  }, [changedObject, initialObject]);

  return object;
};

export { useFindObjectChangesCount, useFindObjectsChangedFields };
