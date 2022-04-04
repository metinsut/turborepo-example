import { ContractBasicInformation } from 'store/slices/contracts/types';
import { PlanBasicInformation } from 'store/slices/plans/types';
import { ValidatorRules } from './types';
import {
  arrayShouldHaveAtLeastOneElementRule,
  createValidator,
  dateValidator,
  rangeValidator
} from './base';
import i18n from 'i18next';

const getRules = (
  contractInformation: ContractBasicInformation
): ValidatorRules<PlanBasicInformation> => ({
  branchIds: arrayShouldHaveAtLeastOneElementRule('branchIds'),
  days: (entity: PlanBasicInformation) => {
    const { period, days } = entity;

    if (period === 'weekly' && (!days || days.length === 0)) {
      return i18n.t('plans.edit.errors.select_days');
    }

    return undefined;
  },
  endDate: (entity) =>
    dateValidator<PlanBasicInformation>('endDate', {
      fieldName: 'plans.edit.first_plan_end_date_desc',
      fieldNameProps: { type: i18n.t(`plans.types.${entity.type}`) },
      minDate: entity.startDate
    })(entity),
  frequency: (entity: PlanBasicInformation) => {
    const { period, frequency } = entity;

    if ((period === 'daily' || period === 'weekly') && frequency === 0) {
      return i18n.t('plans.edit.errors.select_frequency');
    }

    return undefined;
  },
  notes: rangeValidator('notes', {
    allowEmpty: true,
    fieldName: 'plans.notes_field',
    maxLength: 512,
    minLength: 3
  }),
  period: (entity: PlanBasicInformation) => {
    const { period } = entity;
    if (!period || period === 'none') {
      return i18n.t('plans.edit.errors.select_period');
    }
    return undefined;
  },
  startDate: (entity) =>
    dateValidator<PlanBasicInformation>('startDate', {
      fieldName: 'plans.edit.first_plan_start_date_desc',
      fieldNameProps: { type: i18n.t(`plans.types.${entity.type}`) },
      maxDate: contractInformation?.endDate,
      minDate: contractInformation?.startDate
    })(entity),
  title: rangeValidator('title', { fieldName: 'plans.title_field', maxLength: 128, minLength: 3 })
});

const makePlanInformationValidator = (contractInformation: ContractBasicInformation) =>
  createValidator(getRules(contractInformation));

export default makePlanInformationValidator;
