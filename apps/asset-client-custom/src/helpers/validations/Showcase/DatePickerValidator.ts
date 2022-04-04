import { ValidatorRules } from '../types';
import { createValidator, dateValidator } from '../base';
import { formatISO } from 'date-fns';

export interface DatePickersState {
  date1: string;
  date2: string;
  date3: string;
}

const rules: ValidatorRules<DatePickersState> = {
  date1: dateValidator('date1', {
    fieldName: 'brands.name_field',
    minDate: formatISO(new Date(2018, 1, 1))
  }),
  date2: dateValidator('date2', {
    allowEmpty: true,
    fieldName: 'brands.name_field',
    minDate: formatISO(new Date(2018, 1, 1))
  }),
  date3: dateValidator('date3', {
    allowEmpty: true,
    fieldName: 'brands.name_field',
    minDate: formatISO(new Date(2015, 1, 1))
  })
};

const datePickersValidator = createValidator(rules);

export default datePickersValidator;
