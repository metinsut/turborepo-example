import { emptyCheckValidator } from './EmptyCheckValidator';
import { trimmyValidator } from './TrimmyValidator';
import i18n from 'i18next';

type Parameters = {
  fieldName?: string;
  minLength?: number;
  maxLength?: number;
  allowEmpty?: boolean;
  allowWhitespaces?: boolean;
};

export function rangeValidator<TEntity>(key: keyof TEntity, params: Parameters) {
  const { allowEmpty = false, allowWhitespaces = true, fieldName, minLength, maxLength } = params;

  return (entity: TEntity): string => {
    let errorMessage;
    const field = fieldName ? i18n.t(fieldName) : i18n.t('common.generic_field_name');

    if (allowEmpty) {
      if (!allowWhitespaces) {
        errorMessage = trimmyValidator(key)(entity);
      }
    } else {
      errorMessage = emptyCheckValidator(key, { allowWhitespaces, fieldName })(entity);
    }

    if (!errorMessage) {
      const propertyValue = entity[key] as unknown as string;
      if (propertyValue) {
        if (minLength && propertyValue.length < minLength) {
          errorMessage = i18n.t('errors.range_error_min', { field, minLength });
        } else if (maxLength && propertyValue.length > maxLength) {
          errorMessage = i18n.t('errors.range_error_max', { field, maxLength });
        }
      }
    }

    return errorMessage;
  };
}
