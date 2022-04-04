import { CostDetail } from 'store/slices/contracts/types';
import { ValidatorRules } from './types';
import { createValidator } from './base';
import { maxDigitValidator } from './base/MaxDigitValidator';

const rules: ValidatorRules<CostDetail> = {
  amount: maxDigitValidator('amount', {
    fieldName: 'contracts.edit.cost_field'
  })
};

const contractCostItemValidator = createValidator(rules);

export default contractCostItemValidator;
