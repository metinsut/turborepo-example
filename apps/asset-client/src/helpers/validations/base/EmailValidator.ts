import { emptyCheckValidator } from './EmptyCheckValidator';
import { trimmyValidator } from './TrimmyValidator';
import i18n from 'i18next';

type Parameters = {
  allowEmpty?: boolean;
  allowWhitespaces?: boolean;
  fieldName?: string;
};

export const validateEmail = (email: string) => {
  const re =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export function emailValidator<TEntity>(key: keyof TEntity, params: Parameters) {
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

      if (propertyValue && !validateEmail(propertyValue)) {
        errorMessage = i18n.t('errors.email_field_error');
      }
    }

    return errorMessage;
  };
}
