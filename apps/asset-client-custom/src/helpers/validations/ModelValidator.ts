import { Model } from 'store/slices/models';
import { ValidatorRules } from './types';
import { createValidator, rangeValidator } from './base';

const rules: ValidatorRules<Model> = {
  name: rangeValidator('name', {
    fieldName: 'asset_configurations.models.name_field',
    maxLength: 50,
    minLength: 1
  })
};

const modelValidator = createValidator(rules);

export default modelValidator;
