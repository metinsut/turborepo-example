export type RelationType = 'any' | 'blank' | 'between' | 'equal' | 'greaterThan' | 'lessThan';

export type DateFilterType = {
  type: RelationType;
  from?: string;
  to?: string;
};

export const dateFilterValues: RelationType[] = [
  'any',
  'between',
  'equal',
  'greaterThan',
  'lessThan'
];

export const dateFilterValuesWithBlank: RelationType[] = [
  'any',
  'blank',
  'between',
  'equal',
  'greaterThan',
  'lessThan'
];
