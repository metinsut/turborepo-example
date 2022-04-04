import { WorkType } from 'store/slices/common/types';

export interface Department {
  id?: string;
  name?: string;
  notes?: string;
  autoAdded?: boolean;
  mainCategories?: DepartmentCategory[];
}

export interface DepartmentCategory {
  mainCategoryId?: string;
  workTypes?: WorkType[];
}

export type DepartmentStateShape = {
  draftDepartment: Department;
  initialDraftDepartment: Department;
};
