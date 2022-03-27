import { DateFilterType } from 'components/DateFilter/types';
import { ValidatorRules } from './types';
import { createValidator, dateValidator } from './base';

const rules: ValidatorRules<DateFilterType> = {
  from: (entity) => {
    switch (entity.type) {
      case 'any':
      case 'blank':
        return undefined;
      case 'equal':
      case 'lessThan':
      case 'greaterThan':
        return dateValidator<DateFilterType>('from', {
          fieldName: 'common.filters.date'
        })(entity);
      case 'between':
        return dateValidator<DateFilterType>('from', {
          fieldName: 'common.filters.from',
          maxDate: entity.to
        })(entity);
      default:
        return undefined;
    }
  },
  to: (entity) => {
    switch (entity.type) {
      case 'between':
        return dateValidator<DateFilterType>('to', {
          fieldName: 'common.filters.to',
          minDate: entity.from
        })(entity);
      default:
        return undefined;
    }
  }
};

const dateFilterValidator = createValidator(rules);

export default dateFilterValidator;
