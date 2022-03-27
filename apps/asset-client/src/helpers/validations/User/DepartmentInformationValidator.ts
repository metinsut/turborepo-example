import { Department } from 'store/slices/users/departments/types';
import { ValidatorRules } from '../types';
import { createValidator, rangeValidator } from '../base';

const rules: ValidatorRules<Department> = {
  name: rangeValidator('name', {
    fieldName: 'users.departments.edit.basicInfo.title_field',
    maxLength: 128,
    minLength: 3
  }),
  notes: rangeValidator('notes', {
    allowEmpty: true,
    fieldName: 'users.departments.edit.basicInfo.notes_field',
    maxLength: 512,
    minLength: 3
  })
};

const departmentInformationValidator = createValidator(rules);

export default departmentInformationValidator;
