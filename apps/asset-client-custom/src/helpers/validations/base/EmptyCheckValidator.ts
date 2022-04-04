import { trimmyValidator } from './TrimmyValidator';
import i18n from 'i18next';

type Parameters = {
  fieldName?: string;
  allowWhitespaces?: boolean;
};

export function emptyCheckValidator<TEntity>(key: keyof TEntity, parameters: Parameters) {
  const { fieldName, allowWhitespaces = true } = parameters;

  return (entity: TEntity): string => {
    const field = fieldName ? i18n.t(fieldName) : i18n.t('common.generic_field_name');
    let errorMessage;

    if (!allowWhitespaces) {
      errorMessage = trimmyValidator(key)(entity);
    }

    if (!errorMessage) {
      const propertyValue = entity[key]?.toString();
      if (!propertyValue || !propertyValue.trim()) {
        errorMessage = i18n.t('errors.field_required', { field });
      }
    }

    return errorMessage;
  };
}
