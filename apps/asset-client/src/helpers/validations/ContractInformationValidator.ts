import { ContractBasicInformation } from 'store/slices/contracts/types';
import { ValidatorRules } from './types';
import { createValidator, dateValidator, rangeValidator } from './base';

const rules: ValidatorRules<ContractBasicInformation> = {
  endDate: (entity) =>
    dateValidator<ContractBasicInformation>('endDate', {
      fieldName: 'contracts.edit.date_end_field',
      minDate: entity.startDate
    })(entity),
  notes: rangeValidator('notes', {
    allowEmpty: true,
    fieldName: 'contracts.edit.notes_field',
    maxLength: 512,
    minLength: 3
  }),
  startDate: (entity) =>
    dateValidator<ContractBasicInformation>('startDate', {
      fieldName: 'contracts.edit.date_start_field',
      maxDate: entity.endDate
    })(entity),
  title: rangeValidator('title', {
    fieldName: 'contracts.edit.title_field',
    maxLength: 128,
    minLength: 3
  })
};

const contractInformationValidator = createValidator(rules);

export default contractInformationValidator;
