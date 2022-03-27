import { Substatus } from 'store/slices/taskConfiguration/breakdown/breakdownStatuses';
import { ValidatorRules } from '../types';
import { createValidator, rangeValidator } from '../base';

const rules: ValidatorRules<Substatus> = {
  name: rangeValidator('name', {
    fieldName: 'task_configuration.breakdown.substatuses.title',
    maxLength: 50,
    minLength: 3
  })
};

const breakdownSubstatusValidator = createValidator(rules);

export default breakdownSubstatusValidator;
