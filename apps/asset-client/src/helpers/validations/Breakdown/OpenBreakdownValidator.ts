import { OpenBreakdown } from 'store/slices/breakdown/open/types';
import { ValidatorRules } from '../types';
import { createValidator, rangeValidator } from '../base';

const rules = (isUserAuthorized: boolean): ValidatorRules<OpenBreakdown> => ({
  definition: rangeValidator('definition', {
    fieldName: 'tasks.breakdowns.open_breakdown.definition_field_name',
    maxLength: 280,
    minLength: 3
  }),
  priority: (openBreakdown) => {
    let error;
    if (!openBreakdown.priority && isUserAuthorized) {
      error = 'Priority is required';
    }
    return error;
  },
  usability: (openBreakdown) => {
    let error;
    if (!openBreakdown.usability) {
      error = 'Usability is required';
    }
    return error;
  }
});

const makeOpenBreakdownValidator = (isUserAuthorized: boolean) =>
  createValidator(rules(isUserAuthorized));

export default makeOpenBreakdownValidator;
