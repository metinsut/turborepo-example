import { Category } from 'store/slices/categories/types';
import { ValidatorRules } from './types';
import { createValidator, rangeValidator } from './base';

const rules: ValidatorRules<Category> = {
  code: rangeValidator('code', {
    allowEmpty: true,
    fieldName: 'categories.code_field',
    maxLength: 7,
    minLength: 0
  }),
  name: rangeValidator('name', { fieldName: 'categories.name_field', maxLength: 50, minLength: 1 })
};

const categoryValidator = createValidator(rules);

export default categoryValidator;