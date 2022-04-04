import { Department, DepartmentCategory } from './types';
import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { WorkType } from 'store/slices/common/types';
import { initialState } from './data';

export const departmentsAdapter = createEntityAdapter<Department>();

const departmentsSlice = createSlice({
  initialState: departmentsAdapter.getInitialState(initialState),
  name: 'departments',
  reducers: {
    checkDepartmentCategory: (draft, action: PayloadAction<string>) => {
      const categoryId = action.payload;
      const index = draft.draftDepartment.mainCategories.findIndex(
        (i) => i.mainCategoryId === categoryId
      );

      if (index === -1) {
        const departmentMainCategory: DepartmentCategory = {
          mainCategoryId: categoryId,
          workTypes: []
        };
        draft.draftDepartment.mainCategories.push(departmentMainCategory);
      } else {
        draft.draftDepartment.mainCategories.splice(index, 1);
      }
    },
    checkDepartmentWorkType: (
      draft,
      action: PayloadAction<{
        categoryId: string;
        workType: WorkType;
      }>
    ) => {
      const { categoryId, workType } = action.payload;
      const categoryIndex = draft.draftDepartment.mainCategories.findIndex(
        (i) => i.mainCategoryId === categoryId
      );

      if (categoryIndex !== -1) {
        const departmentCategory = draft.draftDepartment.mainCategories[categoryIndex];
        const workTypeIndex = departmentCategory.workTypes.findIndex((i) => i === workType);

        if (workTypeIndex !== -1) {
          departmentCategory.workTypes.splice(workTypeIndex, 1);
        } else {
          departmentCategory.workTypes.push(workType);
        }
      }
    },
    clearDepartmentForm: (draft) => {
      draft.draftDepartment = { ...initialState.draftDepartment };
    },
    clearInitialDepartmentForm: (draft) => {
      draft.draftDepartment = { ...initialState.draftDepartment };
      draft.initialDraftDepartment = { ...initialState.initialDraftDepartment };
    },
    removeDepartment: departmentsAdapter.removeOne,
    revertDepartmentCategories: (draft) => {
      const initialCategories = [...draft.initialDraftDepartment.mainCategories];
      draft.draftDepartment = {
        ...draft.draftDepartment,
        mainCategories: initialCategories
      };
    },
    setDepartmentBasicInfo: (
      draft,
      action: PayloadAction<{
        name: string;
        notes: string;
      }>
    ) => {
      const { name, notes } = action.payload;
      draft.draftDepartment = {
        ...draft.draftDepartment,
        name,
        notes
      };

      draft.initialDraftDepartment = {
        ...draft.initialDraftDepartment,
        name,
        notes
      };
    },
    setDepartmentForm: (draft, action: PayloadAction<Department>) => {
      draft.draftDepartment = { ...action.payload };
    },
    setInitialDepartmentCategories: (draft) => {
      const draftCategories = [...draft.draftDepartment.mainCategories];
      draft.initialDraftDepartment = {
        ...draft.initialDraftDepartment,
        mainCategories: draftCategories
      };
    },
    setInitialDepartmentForm: (draft, action: PayloadAction<Department>) => {
      draft.draftDepartment = { ...action.payload };
      draft.initialDraftDepartment = { ...action.payload };
    },
    upsertDepartment: departmentsAdapter.upsertOne,
    upsertDepartments: departmentsAdapter.upsertMany
  }
});

export default departmentsSlice.reducer;

export const {
  checkDepartmentCategory,
  checkDepartmentWorkType,
  clearDepartmentForm,
  clearInitialDepartmentForm,
  removeDepartment,
  revertDepartmentCategories,
  setDepartmentForm,
  setDepartmentBasicInfo,
  setInitialDepartmentForm,
  setInitialDepartmentCategories,
  upsertDepartment,
  upsertDepartments
} = departmentsSlice.actions;
