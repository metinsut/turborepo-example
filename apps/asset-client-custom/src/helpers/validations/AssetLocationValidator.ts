import { Location } from 'store/slices/asset/locations/types';
import { ValidatorRules } from './types';
import { createValidator } from './base';

const rules: ValidatorRules<Location> = {};

const assetLocationValidator = createValidator(rules);

export default assetLocationValidator;
