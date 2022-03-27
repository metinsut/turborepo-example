import { Department } from 'store/slices/users/departments/types';
import { ValidatorRules } from '../types';
import { createValidator, rangeValidator } from '../base';
import i18n from 'utils/i18n';

const rules: ValidatorRules<Department> = {
  mainCategories: (entity: Department) => {
    const { mainCategories } = entity;
    if (!mainCategories || mainCategories.length === 0) {
      return i18n.t('users.departments.edit.errors.select_main_categories');
    }

    return undefined;
  },
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

const departmentValidator = createValidator(rules);

export default departmentValidator;
