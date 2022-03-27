import { BreakdownType } from 'store/slices/taskConfiguration/breakdown/breakdownTypes';
import { ValidatorRules } from '../types';
import { createValidator, rangeValidator } from '../base';

const rules: ValidatorRules<BreakdownType> = {
  name: rangeValidator('name', {
    fieldName: 'task_configuration.breakdown.type.title',
    maxLength: 50,
    minLength: 3
  })
};

const breakdownTypeValidator = createValidator(rules);

export default breakdownTypeValidator;
