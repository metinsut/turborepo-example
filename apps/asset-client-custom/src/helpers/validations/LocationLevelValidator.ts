import { LocationLevel } from 'store/slices/location/locationLevels/types';
import { ValidatorRules } from './types';
import { createValidator, rangeValidator } from './base';

const rules: ValidatorRules<LocationLevel> = {
  name: rangeValidator('name', {
    fieldName: 'locationLevels.name_field',
    maxLength: 64,
    minLength: 3
  })
};

const locationLevelValidator = createValidator(rules);

export default locationLevelValidator;
