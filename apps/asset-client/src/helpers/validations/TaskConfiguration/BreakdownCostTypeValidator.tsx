import { BreakdownCostType } from 'store/slices/taskConfiguration/breakdown/breakdownCosts';
import { ValidatorRules } from '../types';
import { createValidator, rangeValidator } from '../base';

const rules: ValidatorRules<BreakdownCostType> = {
  name: rangeValidator('name', {
    fieldName: 'task_configuration.breakdown.cost.title',
    maxLength: 50,
    minLength: 3
  })
};

const breakdownCostTypeValidator = createValidator(rules);

export default breakdownCostTypeValidator;
