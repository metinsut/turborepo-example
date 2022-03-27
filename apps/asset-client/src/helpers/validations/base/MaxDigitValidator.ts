import { emptyCheckValidator } from './EmptyCheckValidator';
import { propertyShouldBeGreaterThanZeroRule } from './PropertyShouldBeGreaterThanZeroRule';
import { trimmyValidator } from './TrimmyValidator';
import i18n from 'utils/i18n';

type Parameters = {
  allowEmpty?: boolean;
  fieldName?: string;
  maxDigitBeforeDecimalPoint?: number;
  maxDigitAfterDecimalPoint?: number;
};

export function maxDigitValidator<TEntity>(key: keyof TEntity, params: Parameters) {
  const {
    allowEmpty = false,
    fieldName,
    maxDigitBeforeDecimalPoint = 8,
    maxDigitAfterDecimalPoint = 2
  } = params;

  return (entity: TEntity): string => {
    const field = fieldName ? i18n.t(fieldName) : i18n.t('common.generic_field_name');
    let errorMessage = fieldName;
    if (!errorMessage) {
      errorMessage = i18n.t('errors.field_required', { field });
    }

    const propertyValue = entity[key];

    const valueNumber = propertyValue as unknown as number;

    errorMessage = trimmyValidator(key)(entity);
    if (errorMessage) {
      return errorMessage;
    }

    if (!allowEmpty) {
      errorMessage = emptyCheckValidator(key, { allowWhitespaces: false, fieldName })(entity);
      if (errorMessage) {
        return errorMessage;
      }
    } else if (!valueNumber) {
      return undefined;
    }

    errorMessage = propertyShouldBeGreaterThanZeroRule(key, { fieldName })(entity);

    if (errorMessage) {
      return errorMessage;
    }

    const valueString = propertyValue.toString();
    const splitted = valueString.split('.');

    if (splitted[0].length > maxDigitBeforeDecimalPoint) {
      return i18n.t('errors.max_eight_char_before_comma');
    }
    if (splitted.length > 1 && splitted[1].length > maxDigitAfterDecimalPoint) {
      return i18n.t('errors.max_two_char_after_dot');
    }

    return undefined;
  };
}
