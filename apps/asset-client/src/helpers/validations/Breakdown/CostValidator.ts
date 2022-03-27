import { BreakdownCost } from 'store/slices/breakdown/common/types';
import { ValidatorRules } from '../types';
import { createValidator, rangeValidator } from '../base';
import { maxDigitValidator } from '../base/MaxDigitValidator';
import i18n from 'utils/i18n';

const rules: ValidatorRules<BreakdownCost> = {
  amount: maxDigitValidator('amount', {
    allowEmpty: true,
    fieldName: 'tasks.detail.cost.amount'
  }),
  costTypeId: (breakdownCost) => {
    let error;

    if (!breakdownCost.costTypeId) {
      error = i18n.t('errors.field_required', { field: i18n.t('tasks.detail.cost.cost_type') });
    }
    return error;
  },
  explanation: rangeValidator('explanation', {
    fieldName: 'tasks.detail.cost.explanation',
    maxLength: 50,
    minLength: 3
  })
};

const costValidator = createValidator(rules);

export default costValidator;
