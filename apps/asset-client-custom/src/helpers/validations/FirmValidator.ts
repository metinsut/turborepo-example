import { Firm } from 'store/slices/contracts/types';
import { ValidatorRules } from './types';
import { createValidator, emailValidator, phoneNumberValidator, rangeValidator } from './base';

const rules: ValidatorRules<Firm> = {
  contactPerson: rangeValidator('contactPerson', {
    allowEmpty: true,
    fieldName: 'contracts.edit.contact_person_field',
    maxLength: 128,
    minLength: 3
  }),
  email: emailValidator('email', { allowEmpty: true, fieldName: 'contracts.edit.email_field' }),
  firmName: rangeValidator('firmName', {
    allowEmpty: true,
    fieldName: 'contracts.edit.firm_field',
    maxLength: 128,
    minLength: 3
  }),
  phone: phoneNumberValidator('phone', {
    allowEmpty: true,
    fieldName: 'contracts.edit.phone_field'
  })
};

const firmValidator = createValidator(rules);

export default firmValidator;
