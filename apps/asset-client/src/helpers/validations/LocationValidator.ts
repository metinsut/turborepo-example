import { Location } from 'store/slices/location/locations/types';
import { ValidatorRules } from './types';
import { createValidator, emptyCheckValidator } from './base';

const rules: ValidatorRules<Location> = {
  name: emptyCheckValidator('name', { fieldName: 'locations.location_add.title_field' })
};

const locationValidator = createValidator(rules);

export default locationValidator;
