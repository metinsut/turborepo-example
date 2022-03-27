import { LocationFilter } from 'store/slices/location/locationFilter/types';
import { ValidatorRules } from './types';
import { createValidator, rangeValidator } from './base';

const rules: ValidatorRules<LocationFilter> = {
  name: rangeValidator('name', {
    allowEmpty: true,
    fieldName: 'locations.locationFilter.name_field',
    maxLength: 64,
    minLength: 3
  })
};

const locationFilterValidator = createValidator(rules);

export default locationFilterValidator;
