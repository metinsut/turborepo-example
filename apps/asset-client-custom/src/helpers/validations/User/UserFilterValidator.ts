import { UserFilter } from 'store/slices/users/filter/types';
import { ValidatorRules } from '../types';
import { createValidator, rangeValidator } from '../base';

const rules: ValidatorRules<UserFilter> = {
  firstName: rangeValidator('firstName', {
    allowEmpty: true,
    fieldName: 'users.filter.first_name',
    maxLength: 128,
    minLength: 2
  }),
  lastName: rangeValidator('lastName', {
    allowEmpty: true,
    fieldName: 'users.filter.last_name',
    maxLength: 128,
    minLength: 2
  })
};

const userFilterValidator = createValidator(rules);

export default userFilterValidator;
