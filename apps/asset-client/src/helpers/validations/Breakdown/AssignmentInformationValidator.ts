import { AssignmentInformation } from 'store/slices/breakdown/common/types';
import { ValidatorRules } from '../types';
import { createValidator, rangeValidator } from '../base';

const rules: ValidatorRules<AssignmentInformation> = {
  assignerNote: rangeValidator('assignerNote', {
    allowEmpty: true,
    fieldName: 'tasks.breakdowns.confirm_modal.assigner_note_field',
    maxLength: 280,
    minLength: 2
  })
};

const assignmentInformationValidator = createValidator(rules);

export default assignmentInformationValidator;
