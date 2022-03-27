import { Brand } from 'store/slices/brands/types';
import { ValidatorRules } from './types';
import { createValidator, rangeValidator } from './base';

const rules: ValidatorRules<Brand> = {
  name: rangeValidator('name', {
    fieldName: 'asset_configurations.brands.name_field',
    maxLength: 50,
    minLength: 1
  })
};

const brandValidator = createValidator(rules);

export default brandValidator;
