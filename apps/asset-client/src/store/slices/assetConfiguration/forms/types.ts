import { Category } from 'store/slices/categories/types';
import { Person } from 'store/slices/persons';

export type Form = {
  id: string;
  mainCategoryId: string;
  mainCategoryName: string;
  updatedDate?: string;
  updatedByUser?: Person;
};

export type FormState = {
  forms: Form[];
  currentForm: FormWithFields;
};

export type FormField = {
  id?: string;
  title?: string;
  dataType?: DataTypes;
  section?: SectionTypes;
  isRequired?: boolean;
  isUnique?: boolean;
};

export type DataTypes = 'freeText' | 'numerical' | 'dateTime' | 'phone' | 'email';
export type IdentificationDataTypes = 'freeText' | 'numerical';

export type SectionTypes = 'identification' | 'deviceInfo' | 'purchaseInfo';

export type FormWithFields = {
  id?: string;
  mainCategory: Category;
  fields: FormField[];
};
