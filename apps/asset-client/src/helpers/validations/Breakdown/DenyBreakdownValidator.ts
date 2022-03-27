import { DenyBreakdown } from 'store/slices/breakdown/common/types';
import { ValidatorRules } from '../types';
import { createValidator, rangeValidator } from '../base';

const rules: ValidatorRules<DenyBreakdown> = {
  explanation: rangeValidator('explanation', {
    fieldName: 'tasks.breakdowns.deny_modal.explanation_field',
    maxLength: 280,
    minLength: 3
  })
};

const denyBreakdownValidator = createValidator(rules);

export default denyBreakdownValidator;
