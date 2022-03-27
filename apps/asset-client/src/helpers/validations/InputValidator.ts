import { ValidatorRules } from './types';
import { createValidator } from './base';
import i18n from 'utils/i18n';

export type TextFieldInput = {
  value?: string;
};

const inputValidator = (validationKey?: string) => {
  const rules: ValidatorRules<TextFieldInput> = {
    value: (entity: TextFieldInput) => {
      if (!validationKey) {
        return undefined;
      }

      const invalid =
        entity.value.toLocaleLowerCase('tr-TR') !== validationKey.toLocaleLowerCase('tr-TR');
      if (invalid) {
        return i18n.t('errors.input_invalid_error', { inputName: validationKey });
      }

      return undefined;
    }
  };

  return createValidator(rules);
};

export default inputValidator;
