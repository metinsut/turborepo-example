import { SavedFilter } from 'store/slices/asset/filter/types';
import { ValidatorRules } from './types';
import { createValidator, rangeValidator } from './base';

const rules: ValidatorRules<SavedFilter> = {
  title: rangeValidator('title', {
    fieldName: 'assets.assetFilter.title_of_the_filter',
    maxLength: 64,
    minLength: 4
  })
};

const assetFilterSaveTitleValidator = createValidator(rules);

export default assetFilterSaveTitleValidator;
