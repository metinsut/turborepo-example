import { SearchItem } from 'views/Locations/LocationLevel/Header/Search';
import { ValidatorRules } from './types';
import { createValidator } from './base';

const rules: ValidatorRules<SearchItem> = {};

const searchValidator = createValidator(rules);

export default searchValidator;
