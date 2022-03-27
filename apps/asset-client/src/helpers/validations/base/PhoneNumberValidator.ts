import { emptyCheckValidator } from './EmptyCheckValidator';
import { trimmyValidator } from './TrimmyValidator';
import i18n from 'i18next';

type Parameters = {
  allowEmpty?: boolean;
  allowWhitespaces?: boolean;
  fieldName?: string;
};

export function phoneNumberValidator<TEntity>(key: keyof TEntity, params: Parameters) {
  const { allowEmpty = false, allowWhitespaces = true, fieldName } = params;

  return (entity: TEntity): string => {
    let errorMessage;

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
        const match = propertyValue.match(/\d/g);
        if (!match || match.length < 10 || match.length > 12) {
          errorMessage = i18n.t('errors.phone_field_error');
        }
      }
    }

    return errorMessage;
  };
}
