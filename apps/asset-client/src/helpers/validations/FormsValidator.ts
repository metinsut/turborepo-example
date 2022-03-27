import { FormField } from 'store/slices/assetConfiguration/forms/types';
import { ValidatorRules } from 'helpers/validations/types';
import { createValidator, rangeValidator } from 'helpers/validations/base';

const rules: ValidatorRules<FormField> = {
  title: rangeValidator('title', {
    fieldName: 'categories.forms.form_builder.add_edit_modal.title_field',
    maxLength: 50,
    minLength: 3
  })
};

const formsValidator = createValidator(rules);

export default formsValidator;
