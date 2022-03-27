import { formatISO, isAfter, isBefore, isValid } from 'date-fns';
import i18n from 'utils/i18n';

type Parameters = {
  fieldName?: string;
  minDate?: string;
  maxDate?: string;
  allowEmpty?: boolean;
  fieldNameProps?: any;
};

export const defaultMinDate = formatISO(new Date(1900, 1, 1));
export const defaultMaxDate = formatISO(new Date(2099, 12, 31));
export function dateValidator<TEntity>(key: keyof TEntity, params: Parameters) {
  const {
    allowEmpty = false,
    fieldName,
    minDate = defaultMinDate,
    maxDate = defaultMaxDate,
    fieldNameProps = {}
  } = params;

  return (entity: TEntity): string => {
    const field = fieldName
      ? i18n.t(fieldName, fieldNameProps)
      : i18n.t('common.generic_field_name');
    const propertyValue = entity[key] as unknown as string;

    if (propertyValue === null) {
      if (!allowEmpty) {
        return `${field} is required`;
      }

      return undefined;
    }

    const date = new Date(propertyValue);
    if (propertyValue === undefined || !isValid(date)) {
      return i18n.t('errors.date.not_valid');
    }

    const minDateParsed = new Date(minDate);
    if (isBefore(date, minDateParsed)) {
      return i18n.t('errors.date.min_date');
    }

    const maxDateParsed = new Date(maxDate);
    if (isAfter(date, maxDateParsed)) {
      return i18n.t('errors.date.max_date');
    }

    return undefined;
  };
}
