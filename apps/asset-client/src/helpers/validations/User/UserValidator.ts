import { User } from 'store/slices/users/details/types';
import { ValidatorRules } from '../types';
import { createValidator, emailValidator, phoneNumberValidator, rangeValidator } from '../base';

const rules: ValidatorRules<User> = {
  email: emailValidator('email', { fieldName: 'users.modal.add_user.email_field' }),
  firstName: rangeValidator('firstName', {
    fieldName: 'users.modal.add_user.first_name_field',
    maxLength: 128,
    minLength: 2
  }),
  jobTitle: rangeValidator('jobTitle', {
    allowEmpty: true,
    fieldName: 'users.modal.add_user.job_title_field',
    maxLength: 128,
    minLength: 3
  }),
  lastName: rangeValidator('lastName', {
    fieldName: 'users.modal.add_user.last_name_field',
    maxLength: 128,
    minLength: 2
  }),
  phoneNumber: phoneNumberValidator('phoneNumber', {
    allowEmpty: true,
    fieldName: 'users.modal.add_user.phone_number_field'
  })
};

const userValidator = createValidator(rules);

export default userValidator;
