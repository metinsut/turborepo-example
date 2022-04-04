import { dequal } from 'dequal';

// TODO TOO COMMON AND WRONG PLACE, WE SHOULD GET RID OF (asset detail done)
export type DisplayType = 'add' | 'edit';

export type SectionMode = 'readonly' | 'edit';

export const isObjectNullOrEmpty = (obj: any): boolean => !obj || Object.keys(obj).length === 0;

export const isArrayNullOrEmpty = (arr: any[]): boolean => !arr || arr.length === 0;

export const compareSortedArray = <T>(firstArray: T[], secondArray: T[], sortProp?: keyof T) => {
  const newFirstArray = [...firstArray];
  const newSecondArray = [...secondArray];

  const sortedFirstArray = sortProp
    ? newFirstArray.sort((a, b) => sortByProperty(a, b, sortProp))
    : newFirstArray.sort();

  const sortedSecondArray = sortProp
    ? newSecondArray.sort((a, b) => sortByProperty(a, b, sortProp))
    : newSecondArray.sort();

  const isEqual = dequal(sortedFirstArray, sortedSecondArray);

  return isEqual;
};

function sortByProperty<T>(a: T, b: T, prop: keyof T) {
  if (a[prop] < b[prop]) {
    return -1;
  }
  if (a[prop] > b[prop]) {
    return 1;
  }
  return 0;
}

export const isObjectHasAnyDefinedProperty = (obj: any) =>
  !isObjectNullOrEmpty(obj) &&
  Object.values(obj)
    .map((i) => i as string)
    .some((i) => i !== undefined);
