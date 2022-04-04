import { DataTypes, FormField, FormState, IdentificationDataTypes } from './types';

export const initialFormState: FormState = {
  currentForm: {
    fields: [],
    mainCategory: {
      id: null,
      name: null
    }
  },
  forms: []
};

export const initialField: FormField = {
  dataType: undefined,
  isRequired: true,
  isUnique: true,
  section: undefined,
  title: ''
};

export const dataTypes: DataTypes[] = ['freeText', 'numerical', 'dateTime', 'phone', 'email'];
export const identificationDataTypes: IdentificationDataTypes[] = ['freeText', 'numerical'];

export const maxIdentificationFieldNumber = 2;
export const maxInformationFieldNumber = 5;
