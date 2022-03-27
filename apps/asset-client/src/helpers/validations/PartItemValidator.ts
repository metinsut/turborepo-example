import { Part } from 'views/Contracts/PartsPolicy/PartsItem';
import { ValidatorRules } from './types';
import { createValidator, emptyCheckValidator } from './base';

const rules: ValidatorRules<Part> = {
  name: emptyCheckValidator('name', { fieldName: 'contracts.edit.parts.part_field_for_validation' })
};

const partItemValidator = createValidator(rules);

export default partItemValidator;
