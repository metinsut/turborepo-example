import { CategoryStateShape } from './types';

export const maxMainCategoryNumber = 9;
export const maxCategoryDepth = 6;
export const parentCategoryIdOfRoot: string = null;

export const initialState: CategoryStateShape = {
  brandDialog: {
    initialized: false,
    open: false,
    selectedCategoryId: undefined
  },
  checkedEntities: {},
  disabledEntities: {},
  displayedCategoryIds: {},
  draggedOverCategoryId: undefined,
  draggingCategoryId: undefined,
  expandedCategoriesInitialized: false,
  expandedCategoryIds: [parentCategoryIdOfRoot],
  isInSessionRemovedById: {},
  isInSessionsById: {},
  lastRemovedInSessionId: undefined,
  selectedCategoryId: undefined
};
